const fs = require("fs");
const cheerio = require("cheerio");

// Load your HTML file
const html = fs.readFileSync("home.html", "utf-8");

// Load into cheerio
const $ = cheerio.load(html);

// Select only <body> content
const body = $("body");

// Remove specified attributes
body.find("*").each((i, el) => {
  const attribsToRemove = ["href", "xlink:href", "xmlns", "xmlns:xlink", "xmlns:xhtml"];
  attribsToRemove.forEach(attr => {
    if ($(el).attr(attr)) {
      $(el).removeAttr(attr);
    }
  });

  // Remove external scripts
  if (
    (el.tagName === "script" && $(el).attr("src")?.startsWith("http")) ||
    (el.tagName === "link" && $(el).attr("href")?.startsWith("http"))
  ) {
    $(el).remove();
  }
});

// Save cleaned body HTML
const cleanedHtml = "<body>\n" + body.html() + "\n</body>";
fs.writeFileSync("cleaned-body.html", cleanedHtml);

console.log("✅ Cleaned body saved to cleaned-body.html");
