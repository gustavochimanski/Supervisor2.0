import { Download } from "lucide-react";
import * as XLSX from "sheetjs-style"; // <-- Isso estava faltando
import React from "react";

interface ExportButtonProProps {
  rows: any[] ;
  children?: React.ReactNode;
}

export const ExportButtonPro: React.FC<ExportButtonProProps> = ({ rows, children }) => {
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "export.xlsx");
  };

  return (
    <div className="w-full h-full">
      <button
        type="button"
        onClick={exportExcel}
        className="flex items-center gap-2 w-full h-full text-sm cursor-pointer"
      >
        <Download className="shrink-0" />
        <span className="w-full text-left">{children ?? "Exportar Excel"}</span>
      </button>
    </div>
  );
};
