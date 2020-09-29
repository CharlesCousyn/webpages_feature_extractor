import {lexical, structural} from "./feature";
import {JSDOM} from "jsdom"
import filesSystem from "fs";
import jsonexport from "jsonexport"

import GENERAL_CONFIG from "./configFiles/generalConfig.json"

//////////////////
//Tool functions//
//////////////////
function writeJSONFile(data, replacer, path)
{
    filesSystem.writeFileSync(path, JSON.stringify(data, replacer, 4), "utf8");
}

async function writeCSVFile(data, replacer, path)
{
    const csv = await jsonexport(data, {rowDelimiter: ","});
    filesSystem.writeFileSync(path, csv, "utf8");
}

// Path like: ./html/answer_the_phone_0.html
async function pathToHTMLDocument(path)
{
    try
    {
        let jsdomInstance = await JSDOM.fromFile(path);
        return jsdomInstance.window.document;
    }
    catch (e)
    {
        console.error(e);
    }
}

function extractFeatures(document)
{
    return {
        meta_tags: lexical.meta_tags(document),
        meta_keywords: lexical.meta_keywords(document),
        max_keyword_length: lexical.max_keyword_length(document),
        min_keyword_length: lexical.min_keyword_length(document),
        descriptor_words: lexical.descriptor_words(document),
        words_alt_images: lexical.words_alt_images(document),
        avgNoOfWordsInLink: structural.avgNoOfWordsInLink(document),
        total_links: structural.total_links(document),
        image_links: structural.image_links(document),
        total_images: structural.total_images(document),
        alt_images: structural.alt_images(document),
        div: structural.div(document),
        paragraphs: structural.paragraphs(document),
        tables: structural.tables(document),
        total_headings: structural.total_headings(document),
        link_headings: structural.link_headings(document)
    }
}

(async () =>
{
    let allWebPagePaths = filesSystem.readdirSync(GENERAL_CONFIG.pathToWebPagesFolder, { encoding: 'utf8', withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .flatMap(dirent =>
        {
            let basePath = `${GENERAL_CONFIG.pathToWebPagesFolder}${dirent.name}/`;
            return filesSystem.readdirSync(basePath, { encoding: 'utf8', withFileTypes: true })
                .filter(dirent1 => dirent1.isFile())
                .map(dirent1 => `${basePath}${dirent1.name}`)
        });

    let promises = allWebPagePaths
        .map(async path =>
        {
            //Get the name of the file used
            let fileName = path.split("/").pop();

            //Load the document
            let doc = await pathToHTMLDocument(path);

            //Extract features of the document
            let feats = extractFeatures(doc);

            //Create the line of data
            return {fileName, ...feats, class: null};
        });

    let data = await Promise.all(promises);

    await writeCSVFile(data, null, GENERAL_CONFIG.pathToDatasetFile);
})();