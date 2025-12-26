"use client";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const COMPANY_NAME = "ARRC Rewards";
const COMPANY_WEBSITE = "https://arrcrewards.com";
const LOGO_PATH = "/images/logo.png";

/* ===================== PDF ===================== */

export const exportSpendingPDF = async (
  categoryMap: Record<string, number>
) => {
  const doc = new jsPDF();
  const logoBase64 = await loadImageAsBase64(LOGO_PATH);

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 14, 10, 22, 22);
  }

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(COMPANY_NAME, 40, 18);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Spending Report", 40, 26);

  const tableData = Object.entries(categoryMap).map(
    ([category, amount]) => [category, `$${amount.toFixed(2)}`]
  );

  autoTable(doc, {
    startY: 40,
    head: [["Category", "Amount"]],
    body: tableData,
    headStyles: { fillColor: [15, 23, 42], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });

  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;

  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(`© ${new Date().getFullYear()} ${COMPANY_NAME}`, 14, pageHeight - 10);
  doc.text(COMPANY_WEBSITE, pageWidth - 14, pageHeight - 10, {
    align: "right",
  });

  doc.save("spending-report.pdf");
};

/* ===================== EXCEL ===================== */

export const exportSpendingExcel = async (
  categoryMap: Record<string, number>
) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Spending Report");

  // Header
  sheet.addRow([COMPANY_NAME]);
  sheet.addRow(["Spending Report"]);
  sheet.addRow([]);
  sheet.addRow(["Category", "Amount"]);

  sheet.getRow(1).font = { bold: true, size: 16 };
  sheet.getRow(2).font = { bold: true, size: 12 };
  sheet.getRow(4).font = { bold: true };

  // Data
  Object.entries(categoryMap).forEach(([category, amount]) => {
    sheet.addRow([category, amount]);
  });

  sheet.addRow([]);
  sheet.addRow(["Website", COMPANY_WEBSITE]);

  sheet.columns = [
    { width: 30 },
    { width: 18 },
  ];

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    "spending-report.xlsx"
  );
};

/* ===================== HELPERS ===================== */

const loadImageAsBase64 = (src: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => resolve(null);
  });
};
