"use client";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const COMPANY_NAME = "ARRC Rewards";
const COMPANY_WEBSITE = "https://arrcrewards.com";



export const exportSpendingPDF = async (
  categoryMap: Record<string, number>
) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(COMPANY_NAME, 14, 18);

  doc.setFontSize(12);
  doc.text("Spending Report", 14, 26);

  const tableData = Object.entries(categoryMap).map(
    ([category, amount]) => [category, `$${amount.toFixed(2)}`]
  );

  autoTable(doc, {
    startY: 36,
    head: [["Category", "Amount"]],
    body: tableData,
  });

  doc.save("spending-report.pdf");
};

export const exportSpendingExcel = async (
  categoryMap: Record<string, number>
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Spending Report");

  worksheet.columns = [
    { header: "Category", key: "category", width: 30 },
    { header: "Amount", key: "amount", width: 18 },
  ];

  worksheet.getRow(1).font = { bold: true };

  Object.entries(categoryMap).forEach(([category, amount]) => {
    worksheet.addRow({
      category,
      amount,
    });
  });

  worksheet.addRow([]);
  worksheet.addRow([`Website: ${COMPANY_WEBSITE}`]).font = { italic: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "spending-report.xlsx");
};
