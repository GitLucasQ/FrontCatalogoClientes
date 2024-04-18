/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";

export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    export const exportDataToExcel = (
      rows: any,
      columnsName: any,
      sheetName: string,
      fileName: string
    ) => {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(rows);
    
      XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
    
      XLSX.utils.sheet_add_aoa(workSheet, [columnsName]);
    
      XLSX.writeFile(workBook, fileName, { compression: true });
    };