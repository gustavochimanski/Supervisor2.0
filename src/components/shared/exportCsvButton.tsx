import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { GridApi } from "@mui/x-data-grid";
import * as XLSX from "sheetjs-style";
import { useState } from "react";

interface ExportButtonProProps {
  apiRef: React.MutableRefObject<GridApi>;
}

export const ExportButtonPro: React.FC<ExportButtonProProps> = ({ apiRef }) => {
  const [loading, setLoading] = useState(false);

  const exportExcel = () => {
    setLoading(true);
    const data = Array.from(apiRef.current.getRowModels().values());

    const worksheet = XLSX.utils.json_to_sheet(data);
    const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || '');

    // Cabeçalho azul + fonte branca
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = {
            fill: { patternType: "solid", fgColor: { rgb: "1D4ED8" } },
            font: { bold: true, color: { rgb: "FFFFFF" } },
            alignment: { horizontal: "center" },
        };
    }

    // Zebra azul claro nas linhas alternadas
    for (let R = 1; R <= headerRange.e.r; ++R) {
        const isOdd = R % 2 !== 0;
        for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ c: C, r: R });
            if (!worksheet[cellAddress]) continue;
            worksheet[cellAddress].s = isOdd
                ? { fill: { patternType: "solid", fgColor: { rgb: "EBF5FF" } } }
                : {};
        }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "export.xlsx");
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" disabled={loading} onClick={exportExcel}>
        <Download className="w-4 h-4 mr-2" /> Excel
      </Button>
    </div>
  );
};
