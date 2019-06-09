const { DateTime } = require("luxon");

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

    eleventyConfig.addPassthroughCopy("src/site.webmanifest");

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
