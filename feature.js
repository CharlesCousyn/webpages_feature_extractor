//////////////////
//Tool functions//
//////////////////
function isNull(x)
{
    return x === null || x === undefined;
}

/////////////////////
//Feature functions//
/////////////////////
//Total number of meta tags in the page
function meta_tags(document)
{
    return document.querySelectorAll("meta").length;
}

//Total number of meta keywords in the page
function meta_keywords(document)
{
    return Array.from(document.querySelectorAll("meta[name=keywords]"))
        .map(node =>
        {
            let keywords = node.textContent;
            return (isNull(keywords) ? [] : keywords.split(","));
        })
        .reduce( (acc, curr) =>
        {
            acc += curr.length;
            return acc;
        }, 0);
}

//Minimum Length of keywords
function min_keyword_length(document)
{
    return Array.from(document.querySelectorAll("meta[name=keywords]"))
        .map(node =>
        {
            let keywords = node.textContent;
            return (isNull(keywords) ? [] : keywords.split(","));
        })
        .reduce( (acc, curr) =>
        {
            if(curr.length < acc)
            {
                acc = curr.length;
            }
            return acc;
        }, 0);
}

//Maximum Length of keywords
function max_keyword_length(document)
{
    return Array.from(document.querySelectorAll("meta[name=keywords]"))
        .map(node =>
        {
            let keywords = node.textContent;
            return (isNull(keywords) ? [] : keywords.split(","));
        })
        .reduce( (acc, curr) =>
        {
            if(curr.length > acc)
            {
                acc= curr.length;
            }
            return acc;
        }, 0);
}

//Total number of descriptor words on a page
function descriptor_words(document)
{
    return Array.from(document.querySelectorAll("meta[name=description]"))
        .map(node =>
        {
            let descriptor_words = node.textContent;
            return (isNull(descriptor_words) ? [] : descriptor_words.split(" "));
        })
        .reduce( (acc, curr) =>
        {
            acc += curr.length;
            return acc;
        }, 0);
}

//Total number of words used to describe alternate images on a page
function words_alt_images(document)
{
    return Array.from(document.querySelectorAll("img"))
        .map(img =>
        {
            let alt = img.getAttribute("alt");
            return (isNull(alt) ? [] : alt.split(" "));
        })
        .reduce( (acc, curr) =>
        {
            acc += curr.length;
            return acc;
        }, 0);
}

//Average Number of words in links
function avgNoOfWordsInLink(document)
{
    let numberLink = total_links(document);
    return Array.from(document.querySelectorAll("a"))
        .map(link =>
        {
            let link_string = link.textContent;
            return (isNull(link_string) ? [] : link_string.split(" "));
        })
        .reduce( (acc, curr) =>
        {
            acc += curr.length / numberLink;
            return acc;
        }, 0.0);
}

//Total Number of words in links
function total_links(document)
{
    return document.querySelectorAll("a").length;
}

//Total number of image links on a page
function image_links(document)
{
    return document.querySelectorAll("a img").length;
}

//Total number of image on a page
function total_images(document)
{
    return document.querySelectorAll("img").length;
}

//Total number of alternate on a page
function alt_images(document)
{
    return document.querySelectorAll("img[alt]").length;
}

//Number of divisions on a page
function div(document)
{
    return document.querySelectorAll("div").length;
}

//Total number of paragraphs on a page
function paragraphs(document)
{
    return document.querySelectorAll("p").length;
}

//Number of tables used on the page
function tables(document)
{
    return document.querySelectorAll("table").length;
}

//Total number of headings on a page
function total_headings(document)
{
    return document.querySelectorAll("h1, h2, h3, h4, h5, h6").length;
}

//Total number of links that are also heading on a page
function link_headings(document)
{
    return document.querySelectorAll("a h1, a h2, a h3, a h4,a h5, a h6").length;
}

export let lexical = {
    meta_tags,
    meta_keywords,
    min_keyword_length,
    max_keyword_length,
    descriptor_words,
    words_alt_images
};

export let structural = {
    avgNoOfWordsInLink,
    total_links,
    image_links,
    total_images,
    alt_images,
    div,
    paragraphs,
    tables,
    total_headings,
    link_headings
};
