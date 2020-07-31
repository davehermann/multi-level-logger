import { promises as fs } from "fs";
import * as path from "path";

interface ITypeDocComment {
    shortText?: string;
    text?: string;
}

interface ITypeDocItem {
    id: number;
    name: string;
    kindString: string;
    children?: Array<ITypeDocItem>;
    comment?: ITypeDocComment;
    defaultValue: any;
    signatures?: Array<ITypeDocItem>;
    parameters?: Array<ITypeDocItem>;
    target?: number;
    [x:string]: any;
}

async function loadFile(filePath, isJson = false) {
    const contents = await fs.readFile(filePath, { encoding: `utf8` });
    return isJson ? JSON.parse(contents) : contents;
}

function addToMap(item: ITypeDocItem, itemMap: Map<number, ITypeDocItem>) {
    itemMap.set(item.id, item);

    if (!!item.children)
        item.children.forEach(child => addToMap(child, itemMap));
}

function mapToType(item: ITypeDocItem, typeMap: Map<string, Map<string, ITypeDocItem>>) {
    if (!typeMap.has(item.kindString))
        typeMap.set(item.kindString, new Map());

    const kindMap = typeMap.get(item.kindString);
    kindMap.set(item.name, item);
}

function displayEnumeration(enumerationToDisplay: ITypeDocItem, itemMap: Map<number, ITypeDocItem>, orderByValue = true) {
    const name = enumerationToDisplay.name;

    if (!!enumerationToDisplay.target)
        enumerationToDisplay = itemMap.get(enumerationToDisplay.target);

    let display = `### ${name}\n`
        + `\n`
        + `| Member | Value |\n`
        + `| ------ | ----- |\n`;

    const members = enumerationToDisplay.children;
    if (orderByValue)
        members.sort((a, b) => {
            return a.defaultValue < b.defaultValue ? -1 : 1;
        });
    members.forEach(child => {
        display += `| ${child.name} | ${child.defaultValue} |\n`;
    });

    return display;
}

function displayType(item: ITypeDocItem) {
    switch (item.type.type) {
        case `intrinsic`:
            return item.type.name;
            break;

        case `union`:
            return item.type.types.map(t => { return t.name; }).join(` &#124; `);
            break;
    }
}

function displayFunction(functionToDisplay: ITypeDocItem, itemMap: Map<number, ITypeDocItem>) {
    const name = functionToDisplay.name;

    if (!!functionToDisplay.target)
        functionToDisplay = itemMap.get(functionToDisplay.target);

    const parameters = functionToDisplay.signatures[0].parameters;

    let display = `### ${name}(${parameters.map(p => p.name).join(`, `)})\n`
        + `\n`
        + `| Parameter | Required | Type | Notes |\n`
        + `| --------- | -------- | ---- | ----- |\n`;

    parameters.forEach(p => {
        let parameterType = [];

        display += `| ${p.name} | ${!!p.defaultValue ? `no` : `yes`} | ${displayType(p)} | ${p.comment.text.replace(/\n/g, `<br />`)} |\n`;
    });

    return display;
}

async function updateTemplate(templateName, loadedTemplates, replacementId, replacementText) {
    if (!loadedTemplates[templateName]) {
        const content = await loadFile(path.join(__dirname, `..`, `.templates`, templateName));
        loadedTemplates[templateName] = content;
    }

    loadedTemplates[templateName] = loadedTemplates[templateName].replace(`$$$${replacementId}$$$`, replacementText);
}

async function writeTemplates(loadedTemplates) {
    for (const prop in loadedTemplates)
        await fs.writeFile(path.join(__dirname, `..`, `generated`, prop), loadedTemplates[prop], { encoding: `utf8` });
}

async function generateMarkdown() {
    const reflection = await loadFile(path.join(__dirname, `reflection.json`), true);

    // Build a flat structure as an object with the key as the id
    const itemMap: Map<number, ITypeDocItem> = new Map(),
        typeMap: Map<string, Map<string, ITypeDocItem>> = new Map();

    addToMap(reflection, itemMap);

    for (const [key, value] of itemMap.entries()) {
        mapToType(value, typeMap);
    }

    const loadedTemplates = {};
    await updateTemplate(`Configuration.md`, loadedTemplates, `enumeration.levels`, displayEnumeration(typeMap.get("Reference").get("LogLevels"), itemMap));
    await updateTemplate(`Configuration.md`, loadedTemplates, `function.InitializeLogging`, displayFunction(typeMap.get(`Reference`).get(`InitializeLogging`), itemMap));

    await writeTemplates(loadedTemplates);
}

generateMarkdown()
    .catch(err => {
        console.error(err);
    });
