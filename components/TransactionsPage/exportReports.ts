import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportSpendingExcel = async (
  categoryMap: Record<string, number>
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Spending Report");

  // Title
  worksheet.addRow(["ARRC Rewards"]);
  worksheet.addRow(["Spending Report"]);
  worksheet.addRow([]);

  // Header
  worksheet.addRow(["Category", "Amount"]);
  worksheet.getRow(4).font = { bold: true };

  // Data
  Object.entries(categoryMap).forEach(([category, amount]) => {
    worksheet.addRow([category, amount]);
  });

  worksheet.addRow([]);
  worksheet.addRow(["Website:", "https://arrcrewards.com"]);

  // Column widths
  worksheet.columns = [
    { width: 30 },
    { width: 18 },
  ];

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "spending-report.xlsx");
};
