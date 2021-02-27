import ITypeDocItem from "./data-types/ITypeDocItem";

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

/**
 * Build a flat structure as an object with the key as the id
 * @param reflection - Typedoc-generated object
 */
function generateMaps(reflection: any): { itemMap: Map<number, ITypeDocItem>, typeMap: Map<string, Map<string, ITypeDocItem>> } {
    const itemMap: Map<number, ITypeDocItem> = new Map(),
        typeMap: Map<string, Map<string, ITypeDocItem>> = new Map();

    addToMap(reflection, itemMap);

    for (const [key, value] of itemMap.entries()) {
        mapToType(value, typeMap);
    }

    return { itemMap, typeMap };
}

export default generateMaps;
