import fs from "fs";
import hbs from "handlebars";
import path from "path";
import moment from "moment";

moment.locale("fr");

export function createHtmlTemplate<T>(data: T, templateName: string) {
  const html = fs.readFileSync(
    path.join(__dirname, `../../templates/${templateName}.hbs`),
    {
      encoding: "utf-8",
    }
  );
  const template = hbs.compile(html);
  const rendered = template({
    ...data,
    assetsUrl: process.env.ASSETS_URL || "http://localhost:8000",
    createdAt: moment().format("ll"),
  });
  return rendered;
}
