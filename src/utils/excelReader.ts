import ExcelJS from 'exceljs';

export async function readExcelFile(workbookPath: string, sheetName: string): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);
  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" not found in workbook "${workbookPath}"`);
  }

  const rows: any[] = [];
  const headers = worksheet.getRow(1).values as string[];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const data: any = {};
    row.eachCell((cell, colNumber) => {
      const key = headers[colNumber];
      if (key) {
        data[key] = cell.value;
      }
    });
    rows.push(data);
  });

  return rows;
}
