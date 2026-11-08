import { readFile, writeFile, mkdir } from "node:fs/promises";
import { FLAGSHIP_PROJECTS } from "../src/data/projects.js";
const source = await readFile("dist/index.html", "utf8");
const routes = [["work", "Work"], ["research", "Research"], ["about", "About"], ["contact", "Contact"], ...FLAGSHIP_PROJECTS.map(p=>[`work/${p.id}`, p.title])];
for (const [path, label] of routes) {
  const title = `${label} — Hemanth Nomula`;
  const url = `https://hemanthn.in/${path}/`;
  const html = source.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]+/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]+/, `$1${url}`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]+/g, `$1${title}`);
  await mkdir(`dist/${path}`, {recursive:true});
  await writeFile(`dist/${path}/index.html`,html);
}
await writeFile("dist/404.html",source);
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["",...routes.map(r=>r[0]+"/")].map(path=>`<url><loc>https://hemanthn.in/${path}</loc></url>`).join("")}</urlset>`);
console.log(`Generated ${routes.length} static page routes.`);
