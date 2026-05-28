import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "public", "qr-wydruk.html");
const outputPath = path.join(root, "public", "qr-wydruk.pdf");
const fileUrl = `file:///${htmlPath.replace(/\\/g, "/")}`;

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(fileUrl, { waitUntil: "networkidle0" });
await page.emulateMediaType("print");
await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  margin: {
    top: "18mm",
    right: "18mm",
    bottom: "18mm",
    left: "18mm",
  },
});

await browser.close();
console.log(`Wygenerowano: ${outputPath}`);
