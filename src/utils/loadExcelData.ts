import { readExcelFile } from './excelReader';

export async function getFormTestData() {
  return await readExcelFile('test-data/testdata.xlsx', 'form_test');
}