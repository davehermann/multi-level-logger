import ITypeDocItem from "./data-types/ITypeDocItem";
import ITypeDocType from "./data-types/ITypeDocType";

function headerLevel(optionList: Array<string>) {
    let header = 3;

    const headerOption = optionList.filter(option => (option.search(/^headerlevel\:/) == 0)).map(option => +option.substr(12));
    if (headerOption.length > 0)
        header = headerOption[0];

    return ``.padStart(header, `#`);
}

/**
 * Write Enumeration to template
 * @param enumerationToDisplay
 * @param itemMap
 * @param optionList
 * @param orderByValue
 */
function displayEnumeration(enumerationToDisplay: ITypeDocItem, itemMap: Map<number, ITypeDocItem>, optionList: Array<string>, orderByValue = true) {
    const name = enumerationToDisplay.name;

    if (!!enumerationToDisplay.target)
        enumerationToDisplay = itemMap.get(enumerationToDisplay.target);

    let display = `${headerLevel(optionList)} ${name}\n`
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

/**
 * Write Type to template
 * @param type
 */
function displayType(type: ITypeDocType) {
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
            } else
                return `[${type.name}](#${type.name.toLowerCase()})`;
            break;
    }
}

/**
 * Write Comment to template
 * @param item
 */
function displayComment(item: ITypeDocItem) {
    const text = item.comment?.text || item.comment?.shortText || ``;
    return text.replace(/\n/g, `<br />`);
}

/**
 * Write Parameters to template
 * @param item
 * @param optionList
 */
function displayParameters(item: ITypeDocItem, optionList: Array<string>) {
    let parameterNames: string = ``,
        parameterDetails: string = ``;

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

/**
 * Write Return Type to template
 * @param item
 */
function displayReturnType(item: ITypeDocItem) {
    if (!!item.signatures && (!!item.signatures[0].type)) {
        const itemType = item.signatures[0].type;

        if (itemType.name !== `void`)
            return (itemType.type == `reference` ? `[${itemType.name}](#${itemType.name.toLowerCase()})` : itemType.name);
    }

    return null;
}

/**
 * Write Function to template
 * @param functionToDisplay
 * @param itemMap
 * @param optionList
 */
function displayFunction(functionToDisplay: ITypeDocItem, itemMap: Map<number, ITypeDocItem>, optionList: Array<string>) {
    const name = functionToDisplay.name;

    if (!!functionToDisplay.target)
        functionToDisplay = itemMap.get(functionToDisplay.target);

    const { parameterNames, parameterDetails } = displayParameters(functionToDisplay, optionList);
    const returnType = displayReturnType(functionToDisplay);

    let display = `${headerLevel(optionList)} ${name}(${parameterNames})\n`;
    if (!!returnType)
        display += `**Returns:** *${returnType}*\n`;
    if (optionList.indexOf(`noparameters`) < 0)
        display += `\n`
            + parameterDetails;

    return display;
}

/**
 * Write Interface to template
 * @param item
 * @param itemMap
 * @param optionList
 */
function displayInterface(item: ITypeDocItem, itemMap: Map<number, ITypeDocItem>, optionList: Array<string>) {
    const name = item.name;

    let display = `${headerLevel(optionList)} ${name}\n`;

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

/**
 * Write an Item and its sub-items to template
 * @param replacementAssignment
 * @param typeMap
 * @param itemMap
 */
function displayItem(replacementAssignment: string, typeMap: Map<string, Map<string, ITypeDocItem>>, itemMap: Map<number, ITypeDocItem>): string {
    const [path, options] = replacementAssignment.split(`/`),
        pathParts = path.split(`.`),
        optionList = !!options ? options.split(`,`) : [];

    const item = typeMap.get(pathParts.shift()).get(pathParts.shift());

    // Determine the type of item
    let type = item.kindString;
    while (type == `Reference`) {
        const linkedItem = itemMap.get(item.target);
        type = linkedItem.kindString;
    }

    switch (type) {
        case `Enumeration`:
            return displayEnumeration(item, itemMap, optionList);
            break;

        case `Function`:
            return displayFunction(item, itemMap, optionList);
            break;

        case `Interface`:
            return displayInterface(item, itemMap, optionList);
            break;
    }
}

export default displayItem;
