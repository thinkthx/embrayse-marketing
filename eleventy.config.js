const fs = require("node:fs");
const path = require("node:path");
const rssPlugin = require("@11ty/eleventy-plugin-rss");

const CONTENT_DIR = "content";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  // Per-post passthrough: copy content/{slug}/*.{jpg,png,webp,svg,gif} -> insights/{slug}/.
  // Source subfolders starting with "_", plus "tags", are layouts/pagination helpers, skip them.
  const IMAGE_EXT = "{jpg,jpeg,png,webp,svg,gif}";
  for (const entry of fs.readdirSync(CONTENT_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name === "tags") continue;
    eleventyConfig.addPassthroughCopy({
      [path.posix.join(CONTENT_DIR, entry.name, `*.${IMAGE_EXT}`)]: `insights/${entry.name}`,
    });
  }

  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("content/*/index.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("readableDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString();
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const text = String(content || "").replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  });

  return {
    dir: {
      input: "content",
      output: ".",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
