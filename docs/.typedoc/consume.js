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
function displayType(type) {
    switch (type.type) {
        case `intrinsic`:
            return type.name;
            break;
        case `union`:
            return type.types.map(t => {
                return displayType(t);
            }).join(` &#124; `);
            break;
        case `reference`:
            if (!!type.typeArguments) {
                return `${type.name}&lt;${type.typeArguments.map(t => {
                    return displayType(t);
                }).join(`, `)}&gt;`;
            }
            else
                return `[${type.name}](#${type.name.toLowerCase()})`;
            break;
    }
}
function displayComment(item) {
    var _a, _b;
    const text = ((_a = item.comment) === null || _a === void 0 ? void 0 : _a.text) || ((_b = item.comment) === null || _b === void 0 ? void 0 : _b.shortText) || ``;
    return text.replace(/\n/g, `<br />`);
}
function displayParameters(item, optionList) {
    let parameterNames = ``, parameterDetails = ``;
    if (item.signatures[0].parameters) {
        const hideParameters = optionList
            .filter(option => {
            return option.search(/^hideparams/) == 0;
        })
            .map(option => {
            return option.replace(/hideparams\:/, ``);
        });
        const parameters = item.signatures[0].parameters.filter(p => (hideParameters.indexOf(p.name) < 0));
        parameterNames = parameters.map(p => p.name).join(`, `);
        parameterDetails =
            `| Parameter | Required | Type | Notes |\n`
                + `| --------- | -------- | ---- | ----- |\n`;
        parameters.forEach(p => {
            parameterDetails += `| ${p.name} | ${!!p.defaultValue ? `no` : `yes`} | ${displayType(p.type)} | ${displayComment(p)} |\n`;
        });
    }
    return { parameterNames, parameterDetails };
}
function displayReturnType(item) {
    if (!!item.signatures && (!!item.signatures[0].type)) {
        const itemType = item.signatures[0].type;
        if (itemType.name !== `void`)
            return (itemType.type == `reference` ? `[${itemType.name}](#${itemType.name.toLowerCase()})` : itemType.name);
    }
    return null;
}
function displayFunction(functionToDisplay, itemMap, optionList) {
    const name = functionToDisplay.name;
    if (!!functionToDisplay.target)
        functionToDisplay = itemMap.get(functionToDisplay.target);
    const { parameterNames, parameterDetails } = displayParameters(functionToDisplay, optionList);
    const returnType = displayReturnType(functionToDisplay);
    let display = `### ${name}(${parameterNames})\n`;
    if (!!returnType)
        display += `**Returns:** *${returnType}*\n`;
    if (optionList.indexOf(`noparameters`) < 0)
        display += `\n`
            + parameterDetails;
    return display;
}
function displayInterface(item) {
    const name = item.name;
    let display = `### ${name}\n`;
    if (!!item.comment && !!item.comment.shortText)
        display += `**${item.comment.shortText}**\n`;
    display +=
        `| Parameter | Required | Type | Notes |\n`
            + `| --------- | :------: | :--: | ----- |\n`;
    item.children.forEach(member => {
        // Only display public members
        if ((member.flags.isExported === undefined) || member.flags.isExported)
            display += `| ${member.name} | ${member.flags.isOptional ? `no` : `yes`} | ${displayType(member.type)} | ${displayComment(member)} |\n`;
    });
    return display;
}
function displayItem(replacementAssignment, typeMap, itemMap) {
    const [path, options] = replacementAssignment.split(`/`), pathParts = path.split(`.`), optionList = !!options ? options.split(`,`) : [];
    const item = typeMap.get(pathParts.shift()).get(pathParts.shift());
    // Determine the type of item
    let type = item.kindString;
    while (type == `Reference`) {
        const linkedItem = itemMap.get(item.target);
        type = linkedItem.kindString;
    }
    switch (type) {
        case `Enumeration`:
            return displayEnumeration(item, itemMap);
            break;
        case `Function`:
            return displayFunction(item, itemMap, optionList);
            break;
        case `Interface`:
            return displayInterface(item);
            break;
    }
}
async function fillTemplate(templateName, loadedTemplates, typeMap, itemMap) {
    if (!loadedTemplates.has(templateName)) {
        const content = await loadFile(path.join(__dirname, `..`, `.templates`, templateName));
        loadedTemplates.set(templateName, content);
    }
    const replacements = loadedTemplates.get(templateName).match(/\$\$\$(\w+\.?)+(\/(\w+(\:\w+)*\,?)+)?\$\$\$/g);
    replacements.forEach(fullId => {
        const replacementId = fullId.substr(3, fullId.length - 6);
        loadedTemplates.set(templateName, loadedTemplates.get(templateName).replace(fullId, displayItem(replacementId, typeMap, itemMap)));
    });
}
async function writeTemplates(loadedTemplates) {
    for (const [fileName, template] of loadedTemplates.entries())
        await fs_1.promises.writeFile(path.join(__dirname, `..`, `generated`, fileName), template, { encoding: `utf8` });
}
async function generateMarkdown() {
    const reflection = await loadFile(path.join(__dirname, `reflection.json`), true);
    // Build a flat structure as an object with the key as the id
    const itemMap = new Map(), typeMap = new Map();
    addToMap(reflection, itemMap);
    for (const [key, value] of itemMap.entries()) {
        mapToType(value, typeMap);
    }
    const loadedTemplates = {}, knownTemplates = new Map();
    await fillTemplate(`Configuration.md`, knownTemplates, typeMap, itemMap);
    await fillTemplate(`WritingLogs.md`, knownTemplates, typeMap, itemMap);
    await writeTemplates(knownTemplates);
}
generateMarkdown()
    .catch(err => {
    console.error(err);
});
