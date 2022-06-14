import puppeteer from "puppeteer";
import { createHtmlTemplate } from "../utils/createHtmlTemplate";
import fs from "fs";

const generatePdf = async (htmlContent: any): Promise<Buffer> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  const buffer = await page.pdf({ format: "a4", printBackground: true });

  await browser.close();
  return buffer;
};

interface CreateTestPdfPayload {
  first_name: string;
  last_name: string;
}

const template = createHtmlTemplate<CreateTestPdfPayload>(
  {
    first_name: "Louis",
    last_name: "Dupont",
  },
  "test-pdf"
);

generatePdf(template).then(buffer => {
  // write buffer to file at /./pdf/filename.pdf
  fs.writeFileSync("./test.pdf", buffer);
});
