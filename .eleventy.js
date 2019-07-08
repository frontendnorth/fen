const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {

    // Define collections
    eleventyConfig.addCollection('speakers', collection => {
        return collection.getFilteredByGlob('src/_speakers/*.md');
    });

    // Date formatting (human readable)
    // https://moment.github.io/luxon/docs/manual/formatting.html
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'gmt'}).toFormat("d LLLL, yyyy");
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'gmt'}).toFormat('yyyy-LL-dd');
    });

    // For use with blog URL path
    eleventyConfig.addFilter("blogPermalink", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'gmt'}).toFormat("yyyy'/'LL");
    });

    // Limit filter
    // Thanks: https://www.webstoemp.com/blog/from-jekyll-to-eleventy/
    eleventyConfig.addNunjucksFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });

    // Universal Shortcodes
    // https://www.11ty.io/docs/shortcodes/
    // e.g.: {% image "image", "alt text" %}
    // eleventyConfig.addShortcode("image", function(image, alt, caption, alignment) {
    //     return `<div class="o-image ${alignment ? `o-image--${alignment}` : `-`}">
    //             <img src="${image}" alt="${alt}">
    //             ${caption ? `<div class="o-image__caption">${caption}</div>` : `&nbsp;`}
    //         </div>`;
    // });
    // e.g.: {% image src="image", alt="alt text" %}
    // eleventyConfig.addNunjucksShortcode("image", function(image) {
    //     return `<div class="o-image">
    //             <img src="${image.src}" alt="${image.alt}">
    //             ${image.caption ? `<div class="user_twitter">@${image.caption}</div>` : ``}
    //         </div>`;
    // });
    // e.g.: {% image "image", "alt text", "right" %}A caption.{% endimage %}
    eleventyConfig.addPairedShortcode("image", function(caption, image, alt, alignment) {
        return `<div class="o-image ${alignment ? `o-image--${alignment}` : `-`}">
                <img src="https://devolute-cdn.sirv.com/fen/${image}" alt="${alt}">
                ${caption ? `<div class="o-image__caption"><p>${caption}</p></div>` : `&nbsp;`}
            </div>`;
    });

    eleventyConfig.addPassthroughCopy("src/site.webmanifest");
    eleventyConfig.addPassthroughCopy("src/assets/img/cards/");

    eleventyConfig.setBrowserSyncConfig({
        port: 1234
    });

    // https://www.npmjs.com/package/@11ty/eleventy-plugin-rss
    eleventyConfig.addPlugin(pluginRss);

    return {
        dir: {
            input: "src",
            output: "docs",
            includes: "_includes",
            // 11ty not currently allowing NJK to extend outsite this folder
            // All `extends` prefixed with `_layouts` path
            layouts: "_includes/_layouts"
        },
        dataTemplateEngine: "njk"
    };

};
