// Cache-bust: append ?v=<content hash> to the CSS/JS links in every HTML page,
// so browsers fetch fresh assets after each deploy instead of a stale cached copy.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const pub = path.join(__dirname, "..", "public");
const hash = (f) => crypto.createHash("md5").update(fs.readFileSync(path.join(pub, f))).digest("hex").slice(0, 8);
const assets = ["/assets/css/styles.css", "/assets/js/main.js"].map((a) => [a, hash(a)]);
for (const f of fs.readdirSync(pub).filter((f) => f.endsWith(".html"))) {
  const p = path.join(pub, f);
  let s = fs.readFileSync(p, "utf8");
  for (const [a, h] of assets) s = s.split(new RegExp(a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + '(\\?v=[0-9a-f]+)?"', "g")).join(a + "?v=" + h + '"');
  fs.writeFileSync(p, s);
}
console.log("stamped", assets.map(([a, h]) => a + "?v=" + h).join(", "));
