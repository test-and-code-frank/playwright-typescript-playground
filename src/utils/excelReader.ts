import ExcelJS from 'exceljs';

/**
 * Reads data from an Excel sheet and returns it as an array of objects.
 * @param filePath - Path to the .xlsx file
 * @param sheetName - Sheet name to read
 * @returns Promise resolving to array of row objects
 */
export async function readExcelFile(filePath: string, sheetName: string): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.getWorksheet(sheetName);
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
  }

  const headers: string[] = [];
  const data: any[] = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      // First row is header
      row.eachCell(cell => headers.push(String(cell.value)));
    } else {
      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        rowData[headers[colNumber - 1]] = cell.value;
      });
      data.push(rowData);
    }
  });

  return data;
}
