// 读取 package.json
import pkg from "../package.json";
import fsPromise from "fs/promises";
// 读取 mainfest.json
import manifest from "../manifest.json";

async function main() {
  const info = {
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
  };

  const newManifest = {
    ...manifest,
    ...info,
  };

  fsPromise.writeFile(
    "./manifest.json",
    JSON.stringify(newManifest, null, 2) + "\n"
  );
}
main();
