import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const COMPANY_NAME = "ARRC Rewards";
const COMPANY_WEBSITE = "https://arrcrewards.com";
const LOGO_PATH = "/images/logo.png";

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
  doc.text(COMPANY_WEBSITE, pageWidth - 14, pageHeight - 10, { align: "right" });

  doc.save("spending-report.pdf");
};

export const exportSpendingExcel = async (
  categoryMap: Record<string, number>
) => {
  const data: any[][] = [];

  data.push([COMPANY_NAME]);
  data.push(["Spending Report"]);
  data.push([]);
  data.push(["Category", "Amount"]);

  Object.entries(categoryMap).forEach(([category, amount]) => {
    data.push([category, amount]);
  });

  data.push([]);
  data.push([`Website: ${COMPANY_WEBSITE}`]);

  const worksheet = XLSX.utils.aoa_to_sheet(data);

  worksheet["!cols"] = [{ wch: 30 }, { wch: 18 }];

  applyExcelStyles(worksheet, data.length);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Spending Report");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, "spending-report.xlsx");
};

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

const applyExcelStyles = (worksheet: XLSX.WorkSheet, totalRows: number) => {

  worksheet["A1"].s = {
    font: { bold: true, sz: 16 },
  };
  worksheet["A2"].s = {
    font: { bold: true, sz: 12 },
  };

  worksheet["A4"].s = worksheet["B4"].s = {
    font: { bold: true },
  };

  worksheet[`A${totalRows}`].s = {
    font: { italic: true },
  };
};



// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const exportSpendingPDF = (
//   categoryMap: Record<string, number>
// ) => {
//   const doc = new jsPDF();

//   doc.text("Spending Report", 14, 15);

//   const tableData = Object.entries(categoryMap).map(
//     ([category, amount]) => [category, `$${amount.toFixed(2)}`]
//   );

//   autoTable(doc, {
//     startY: 25,
//     head: [["Category", "Amount"]],
//     body: tableData,
//   });

//   doc.save("spending-report.pdf");
// };

// export const exportSpendingExcel = (
//   categoryMap: Record<string, number>
// ) => {
//   const sheetData = Object.entries(categoryMap).map(
//     ([category, amount]) => ({
//       Category: category,
//       Amount: amount,
//     })
//   );

//   const worksheet = XLSX.utils.json_to_sheet(sheetData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Spending");

//   const excelBuffer = XLSX.write(workbook, {
//     bookType: "xlsx",
//     type: "array",
//   });

//   const blob = new Blob([excelBuffer], {
//     type: "application/octet-stream",
//   });

//   saveAs(blob, "spending-report.xlsx");
// };
