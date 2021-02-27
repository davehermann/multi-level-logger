import { promises as fs } from "fs";
import * as path from "path";

const DOCS_ROOT = path.join(process.cwd(), `docs`);

async function loadFile(filePath, isJson = false) {
    const contents = await fs.readFile(filePath, { encoding: `utf8` });
    return isJson ? JSON.parse(contents) : contents;
}

async function writeTemplates(loadedTemplates: Map<string, string>) {
    for (const [fileName, template] of loadedTemplates.entries())
        await fs.writeFile(path.join(DOCS_ROOT, `src`, `generated`, fileName), template, { encoding: `utf8` });
}

export {
    DOCS_ROOT,
    loadFile as LoadFile,
    writeTemplates as WriteTemplates,
};
