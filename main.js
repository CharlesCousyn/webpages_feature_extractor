import {lexical, structural} from "./feature";
import {JSDOM} from "jsdom"

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
    let features = {
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

    return features;
}

(async () =>
{
    let doc = await pathToHTMLDocument("./html/answer_the_phone_72.html");
    let feats = extractFeatures(doc);
    console.log(feats);
})();