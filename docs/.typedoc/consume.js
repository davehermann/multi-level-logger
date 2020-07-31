"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
async function loadFile(filePath, isJson = false) {
    const contents = await fs_1.promises.readFile(filePath, { encoding: `utf8` });
    return isJson ? JSON.parse(contents) : contents;
}
function addToMap(item, itemMap) {
    itemMap.set(item.id, item);
    if (!!item.children)
        item.children.forEach(child => addToMap(child, itemMap));
}
function mapToType(item, typeMap) {
    if (!typeMap.has(item.kindString))
        typeMap.set(item.kindString, new Map());
    const kindMap = typeMap.get(item.kindString);
    kindMap.set(item.name, item);
}
function displayEnumeration(enumerationToDisplay, itemMap, orderByValue = true) {
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
function displayType(item) {
    switch (item.type.type) {
        case `intrinsic`:
            return item.type.name;
            break;
        case `union`:
            return item.type.types.map(t => { return t.name; }).join(` &#124; `);
            break;
    }
}
function displayFunction(functionToDisplay, itemMap) {
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
        await fs_1.promises.writeFile(path.join(__dirname, `..`, `generated`, prop), loadedTemplates[prop], { encoding: `utf8` });
}
async function generateMarkdown() {
    const reflection = await loadFile(path.join(__dirname, `reflection.json`), true);
    // Build a flat structure as an object with the key as the id
    const itemMap = new Map(), typeMap = new Map();
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
