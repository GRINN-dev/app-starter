import { Task } from "graphile-worker";
import puppeteer from "puppeteer";
import { S3 } from "@aws-sdk/client-s3";

export interface GeneratePdfFilesPayload {
  pdfData: {
    template: any;
    linked_ressource_id: string;
    document_type: string;
  };
}

const s3 = new S3({
  endpoint: "https://cellar-c2.services.clever-cloud.com",
  region: "US",
  credentials: {
    accessKeyId: process.env.BUCKET_KEY!,
    secretAccessKey: process.env.BUCKET_SECRET!,
  },
});

const generatePdf = async (htmlContent: any): Promise<Buffer> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });
  await page.emulateMediaType("print");
  const buffer = await page.pdf({ format: "a4", printBackground: true });

  await browser.close();
  return buffer;
};

export const generatePdfFiles: Task = async (payload, { withPgClient }) => {
  const { pdfData } = payload as GeneratePdfFilesPayload;

  const key =
    pdfData.document_type + Math.random().toString(36).substring(2, 9);
  const finalUrl = `https://cellar-c2.services.clever-cloud.com/${process.env.BUCKET_NAME}/${key}.pdf`;
  const pdfBuffer = await generatePdf(pdfData.template);

  const s3Params = {
    Bucket: process.env.BUCKET_NAME!,
    Key: `${key}.pdf`,
    Body: pdfBuffer,
    ContentType: "application/pdf",
    ACL: "public-read",
  };

  await s3.putObject(s3Params, (err: any, data: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(finalUrl);
    }
  });

  const {
    rows: [pdfFile],
  } = await withPgClient(pgClient =>
    pgClient.query(
      `insert into publ.generated_pdf_files (linked_ressource_id, file_url, document_type) values ($1, $2, $3)
      returning *`,
      [pdfData.linked_ressource_id, finalUrl, pdfData.document_type]
    )
  );
};
