import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportSpendingPDF = (
  categoryMap: Record<string, number>
) => {
  const doc = new jsPDF();

  doc.text("Spending Report", 14, 15);

  const tableData = Object.entries(categoryMap).map(
    ([category, amount]) => [category, `$${amount.toFixed(2)}`]
  );

  autoTable(doc, {
    startY: 25,
    head: [["Category", "Amount"]],
    body: tableData,
  });

  doc.save("spending-report.pdf");
};

export const exportSpendingExcel = (
  categoryMap: Record<string, number>
) => {
  const sheetData = Object.entries(categoryMap).map(
    ([category, amount]) => ({
      Category: category,
      Amount: amount,
    })
  );

  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Spending");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, "spending-report.xlsx");
};
