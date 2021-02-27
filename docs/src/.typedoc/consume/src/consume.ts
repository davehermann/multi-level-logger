import * as path from "path";

import ITypeDocItem from "./data-types/ITypeDocItem";

import { DOCS_ROOT, LoadFile, WriteTemplates } from "./fileIO";
import GenerateMaps from "./mapGenerator";
import DisplayItem from "./templateDisplay";

async function fillTemplate(templateName: string, loadedTemplates: Map<string, string>, typeMap: Map<string, Map<string, ITypeDocItem>>, itemMap: Map<number, ITypeDocItem>) {
    if (!loadedTemplates.has(templateName)) {
        const content = await LoadFile(path.join(DOCS_ROOT, `src`, `.templates`, templateName));
        loadedTemplates.set(templateName, content);
    }

    const replacements = loadedTemplates.get(templateName).match(/\$\$\$(\w+\.?)+(\/(\w+(\:\w+)*\,?)+)?\$\$\$/g);

    replacements.forEach(fullId => {
        const replacementId = fullId.substr(3, fullId.length - 6);

        loadedTemplates.set(templateName, loadedTemplates.get(templateName).replace(fullId, DisplayItem(replacementId, typeMap, itemMap)));
    });
}

async function generateMarkdown() {
    const reflection = await LoadFile(path.join(DOCS_ROOT, `src`, `.typedoc`, `reflection.json`), true);

    const { itemMap, typeMap } = GenerateMaps(reflection);

    const loadedTemplates = {},
        knownTemplates: Map<string, string> = new Map();

    await fillTemplate(`Configuration.md`, knownTemplates, typeMap, itemMap);
    await fillTemplate(`WritingLogs.md`, knownTemplates, typeMap, itemMap);

    await WriteTemplates(knownTemplates);
}

generateMarkdown()
    .catch(err => {
        console.error(err);
    });
