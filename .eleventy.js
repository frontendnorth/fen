const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {

    // Define collections
    eleventyConfig.addCollection('speakers', collection => {
        return collection.getFilteredByGlob('src/_speakers/*.md').sort((a, b) => {
                return a.data.featured - b.data.featured;
        });
    });

    eleventyConfig.addCollection('schedule', collection => {
        return collection.getFilteredByGlob('src/_schedule/**/*.md').sort((a, b) => {
                return a.data.time - b.data.time;
        });
    });

    // Navigation
    // Thanks, https://github.com/maxboeck/mxb/blob/master/src/includes/navigation.njk
    eleventyConfig.addCollection('nav', function(collection) {
        return collection.getFilteredByTag('nav').sort(function(a, b) {
            return a.data.navOrder - b.data.navOrder
        })
    })

    eleventyConfig.addCollection('navSecondary', function(collection) {
        return collection.getFilteredByTag('navSecondary').sort(function(a, b) {
            return a.data.navOrder - b.data.navOrder
        })
    })

    // Date formatting (human readable)
    // https://moment.github.io/luxon/docs/manual/formatting.html
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'gmt'}).toFormat("d LLLL, yyyy");
    });

    eleventyConfig.addFilter("readableTime", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'gmt'}).toFormat("h:mma");
    });

    eleventyConfig.addFilter("scheduleTime", dateObj => {
        return DateTime.fromISO(dateObj, {zone: 'gmt'}).toFormat("H:mm");
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'gmt'}).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter('scheduleDateString', (dateObj) => {
        return DateTime.fromISO(dateObj, {zone: 'gmt'}).toFormat('yyyy-LL-dd');
    });

    // For use with blog URL path
    eleventyConfig.addFilter("blogPermalink", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'gmt'}).toFormat("yyyy'/'LL");
    });

    // Markdown plugin
    let markdownIt = require("markdown-it");
    let markdownItAnchor = require("markdown-it-anchor");
    let options = {
        // Defaults to `false`, unlike default 11ty behaviour
        html: true
    };

    let markdownLib = markdownIt(options).use(markdownItAnchor);

    eleventyConfig.setLibrary("md", markdownLib);

    // Markdown filter for frontmatter (and other bits)
    // https://github.com/11ty/eleventy/issues/658
    eleventyConfig.addFilter('markdown', function(value) {
        let markdown = require('markdown-it')({
            html: true
        });
        return markdown.render(value);
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
    eleventyConfig.addPairedShortcode("image", function(caption, image, alt, alignment, link) {
        var markup = `<div class="o-image ${alignment ? `o-image--${alignment}` : `-`} c-inverted">`;
        if (link) {
            markup += `<a href="https://devolute-cdn.sirv.com/fen/${image}?w=1920">`
        };
        markup += `<img srcset="https://devolute-cdn.sirv.com/fen/${image}?w=1180 1180w,
                    https://devolute-cdn.sirv.com/fen/${image}?w=600 600w,
                    https://devolute-cdn.sirv.com/fen/${image}?w=475 475w"
                    sizes="(min-width:1300px) 1180px,
                        (min-width:680px) 600px,
                        100vw"
                    src="https://devolute-cdn.sirv.com/fen/${image}?w=600" alt="${alt}">`
        if (link) {
            markup += `</a>`
        };
        markup +=`${caption ? `<div class="o-image__caption c-reduced c-raised">
                <p>${caption}</p>
            </div>` : ``}
        </div>`;
        return markup.trim();
    });

    eleventyConfig.addPassthroughCopy("src/site.webmanifest");
    eleventyConfig.addPassthroughCopy("src/assets/img/cards/");
    eleventyConfig.addPassthroughCopy("src/assets/img/sponsors/bitmap/");

    eleventyConfig.setServerOptions({
        port: 1234,
        watch: [
            "docs/assets/css/*.css",
            "docs/assets/js/*.js"
        ]
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
