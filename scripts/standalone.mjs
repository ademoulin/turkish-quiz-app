import { readFile, writeFile } from "node:fs/promises";
const html = await readFile("dist/index.html", "utf8");
const jsPath = html.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/)?.[1];
const cssPath = html.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/)?.[1];
if (!jsPath || !cssPath)
  throw Error("Expected one bundled script and stylesheet.");
const js = (await readFile("dist" + jsPath, "utf8")).replace(
  /<\/script/gi,
  "<\\/script",
);
const css = (await readFile("dist" + cssPath, "utf8")).replace(
  /<\/style/gi,
  "<\\/style",
);
const standalone = html
  .replace(
    /<script[^>]+src="[^"]+"[^>]*><\/script>/,
    () => `<script type="module">${js}</script>`,
  )
  .replace(/<link[^>]+href="[^"]+\.css"[^>]*>/, () => `<style>${css}</style>`);
await writeFile("dist/quiz-my-turkish.html", standalone);
console.log(
  "Standalone app written to dist/quiz-my-turkish.html. Vocabulary is still fetched live.",
);
