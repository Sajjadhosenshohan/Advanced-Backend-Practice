import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mdPath = path.join(__dirname, "REDIS_MASTERCLASS_BANGLA_DOC.md");
const htmlPath = path.join(__dirname, "REDIS_MASTERCLASS_BANGLA_DOC.html");
const pdfPath = path.join(__dirname, "REDIS_MASTERCLASS_BANGLA_DOC.pdf");
const docPath = path.join(__dirname, "REDIS_MASTERCLASS_BANGLA_DOC.doc");

const mdContent = fs.readFileSync(mdPath, "utf-8");

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

const htmlBody = marked.parse(mdContent);

// Masterclass PDF & Document Stylesheet
const styledHtml = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redis Complete Masterclass — বাংলা ডকুমেন্টেশন</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Inter', sans-serif;
        font-size: 9pt;
        color: #64748b;
      }
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Hind Siliguri', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13.5pt;
      line-height: 1.7;
      color: #1e293b;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    /* Cover / Header Section */
    .document-header {
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
      color: #ffffff;
      padding: 35px 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      page-break-after: avoid;
    }

    .document-header h1 {
      color: #ffffff !important;
      font-size: 26pt;
      margin: 0 0 10px 0;
      font-weight: 700;
      border: none !important;
      page-break-before: avoid !important;
    }

    .document-header p {
      color: #cbd5e1;
      font-size: 13pt;
      margin: 0;
      line-height: 1.6;
    }

    .badge-container {
      margin-top: 15px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 10.5pt;
      font-weight: 600;
      color: #ffffff;
    }

    /* Headings */
    h1, h2, h3, h4, h5, h6 {
      color: #0f172a;
      font-weight: 700;
      line-height: 1.35;
      page-break-after: avoid;
    }

    /* Module level heading */
    h1 {
      font-size: 20pt;
      color: #1e1b4b;
      border-bottom: 2.5px solid #4f46e5;
      padding-bottom: 8px;
      margin-top: 36px;
      margin-bottom: 18px;
      page-break-before: always;
    }

    /* Don't break page before first heading */
    h1:first-of-type,
    .no-break-before {
      page-break-before: avoid !important;
    }

    h2 {
      font-size: 16pt;
      color: #312e81;
      margin-top: 24px;
      margin-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
    }

    h3 {
      font-size: 14pt;
      color: #4338ca;
      margin-top: 18px;
      margin-bottom: 8px;
    }

    p {
      margin-top: 0;
      margin-bottom: 12px;
      text-align: justify;
    }

    /* Strong / Bold */
    strong {
      color: #0f172a;
      font-weight: 700;
    }

    /* Blockquote / Callouts */
    blockquote {
      background: #f8fafc;
      border-left: 5px solid #4f46e5;
      margin: 16px 0;
      padding: 12px 18px;
      border-radius: 0 8px 8px 0;
      color: #334155;
      font-size: 13pt;
    }

    blockquote p:last-child {
      margin-bottom: 0;
    }

    /* Code Blocks */
    pre {
      background-color: #0f172a;
      color: #f8fafc;
      padding: 14px 18px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 10.5pt;
      line-height: 1.55;
      margin: 14px 0;
      page-break-inside: avoid;
      border: 1px solid #1e293b;
    }

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 10.5pt;
      background-color: #f1f5f9;
      color: #b91c1c;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre code {
      background-color: transparent !important;
      color: #f1f5f9 !important;
      padding: 0;
      border: none;
      font-size: 10.5pt;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 18px 0;
      font-size: 12pt;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 9px 12px;
      text-align: left;
      vertical-align: middle;
    }

    th {
      background-color: #e0e7ff;
      color: #1e1b4b;
      font-weight: 700;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    /* Lists */
    ul, ol {
      margin-top: 0;
      margin-bottom: 14px;
      padding-left: 24px;
    }

    li {
      margin-bottom: 6px;
    }

    hr {
      border: none;
      border-top: 1.5px solid #e2e8f0;
      margin: 28px 0;
    }

    /* Clickable links */
    a {
      color: #4f46e5;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Print optimizers */
    @media print {
      body {
        font-size: 11pt;
        line-height: 1.6;
      }

      h1 {
        font-size: 17pt;
      }

      h2 {
        font-size: 14pt;
      }

      h3 {
        font-size: 12.5pt;
      }

      pre {
        font-size: 9.5pt;
      }
    }
  </style>
</head>
<body>
  <div class="document-header">
    <h1>🚀 Redis Complete Masterclass</h1>
    <p>সবগুলো রিয়েল-ওয়ার্ল্ড ইউজ কেস, ইন্টারনাল মেকানিজম এবং আর্কিটেকচারাল ব্যাখ্যা — সহজ বাংলায় সম্পূর্ণ গাইডবুক</p>
    <div class="badge-container">
      <span class="badge">13 Core Modules</span>
      <span class="badge">Production Ready</span>
      <span class="badge">TypeScript & ioredis</span>
      <span class="badge">Postman Ready</span>
      <span class="badge">Video & Interview Guide</span>
    </div>
  </div>

  ${htmlBody}
</body>
</html>`;

// 1. Write the Styled HTML file
fs.writeFileSync(htmlPath, styledHtml, "utf-8");
console.log("✅ [1/3] Created:", htmlPath);

// 2. Generate Word Document (.doc format with Word HTML XML header)
const wordDocContent = `MIME-Version: 1.0
Content-Type: multipart/related; boundary="----=_NextPart_000_WORD"

------=_NextPart_000_WORD
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: 8bit

<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Redis Masterclass Bangla Doc</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body { font-family: 'Hind Siliguri', Arial, sans-serif; font-size: 12pt; line-height: 1.6; color: #222; }
    h1 { font-size: 20pt; color: #1e1b4b; border-bottom: 2px solid #4f46e5; margin-top: 24pt; }
    h2 { font-size: 15pt; color: #312e81; margin-top: 16pt; }
    h3 { font-size: 13pt; color: #4338ca; }
    pre { background-color: #f1f5f9; padding: 10pt; font-family: 'Courier New', monospace; font-size: 10pt; border: 1px solid #cbd5e1; }
    code { font-family: 'Courier New', monospace; background-color: #f8fafc; color: #b91c1c; }
    table { width: 100%; border-collapse: collapse; margin: 12pt 0; }
    th, td { border: 1px solid #94a3b8; padding: 6pt 10pt; text-align: left; }
    th { background-color: #e0e7ff; color: #1e1b4b; }
    blockquote { border-left: 4px solid #4f46e5; padding-left: 10pt; color: #475569; margin: 12pt 0; background: #f8fafc; }
  </style>
</head>
<body>
  <h1>🚀 Redis Complete Masterclass (বাংলা ডকুমেন্টেশন)</h1>
  ${htmlBody}
</body>
</html>
------=_NextPart_000_WORD--`;

fs.writeFileSync(docPath, wordDocContent, "utf-8");
console.log("✅ [2/3] Created Word Document (.doc):", docPath);

// 3. Convert HTML to PDF using Microsoft Edge headless
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

try {
  console.log("⏳ [3/3] Generating PDF using Microsoft Edge headless printer...");
  const { execFileSync } = await import("child_process");
  
  const args = [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file:///${htmlPath.replace(/\\/g, "/")}`,
  ];

  execFileSync(edgePath, args, { stdio: "inherit" });

  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log(`🎉 PDF generated successfully! Size: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.warn("⚠️ PDF file was not created.");
  }
} catch (error) {
  console.error("❌ Error generating PDF via Edge:", error.message);
}
