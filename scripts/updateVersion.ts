// import readline from "readline";
import fsPromise from "fs/promises";
// import { exec } from "child_process";
import inquirer from "inquirer";

async function main() {
  const data = await fsPromise.readFile("./package.json", "utf8");
  const pkg = JSON.parse(data);
  console.log(`当前的版本号为: ${pkg.version}`);

  const { answer } = await inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: "请选择要增加的版本号",
      choices: ["1", "0.1", "0.0.1"],
    },
  ]);

  let [major, minor, patch] = pkg.version.split(".");

  switch (answer) {
    case "1":
      major = parseInt(major) + 1;
      break;
    case "0.1":
      minor = parseInt(minor) + 1;
      break;
    case "0.0.1":
      patch = parseInt(patch) + 1;
      break;
    default:
      console.log("输入的版本号不正确");
      process.exit(1);
  }

  pkg.version = `${major}.${minor}.${patch}`;
  await fsPromise.writeFile(
    "./package.json",
    JSON.stringify(pkg, null, 2),
    "utf8"
  );
  console.log(`版本号已更新为: ${pkg.version}`);
}

main();
