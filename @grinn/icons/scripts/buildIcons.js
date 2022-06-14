const { transform } = require("@svgr/core");
const fs = require("fs").promises;
const camelcase = require("camelcase");
async function getIcons() {
  let files = await fs.readdir(`./svgs`);
  return Promise.all(
    files.map(async file => ({
      svg: await fs.readFile(`./svgs/${file}`, "utf8"),
      componentName: `${camelcase(file.replace(/\.svg$/, ""), {
        pascalCase: true,
      })}Icon`,
    }))
  );
}

const buildIcons = async () => {
  const svgs = await getIcons();
  await Promise.all(
    svgs.map(async (svg, index) => {
      console.log(`${index + 1}/${svgs.length}`);
      const { componentName, svg: svgString } = svg;

      const reactIcon = await transform(
        svgString,
        {
          //ref: true,
          icon: true,
          typescript: true,
          prettier: true,
        },
        {
          componentName: componentName,
          filePath: `./icons/${componentName}.tsx`,
        }
      );
      // write to file
      await fs.writeFile(
        `./icons/${componentName}.tsx`,
        reactIcon + "\n" + `export { ${componentName} } `
      );
    })
  );
  // write an index
  await fs.writeFile(
    "./icons/index.tsx",
    svgs.map(svg => `export * from "./${svg.componentName}";`).join("\n")
  );

  return;
};

buildIcons();
