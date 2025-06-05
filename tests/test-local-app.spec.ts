import { test, expect } from '@playwright/test';
import { format } from 'date-fns';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ItemListPage } from '../pages/ItemListPage';
import { FormPage } from '../pages/FormPage';

import { loadYAMLEnv } from '../src/utils/loadYAMLEnv';
import { readExcelFile } from '../src/utils/excelReader';

const env = loadYAMLEnv();

/* Paramaterize test */
const invalidCredentials = [
  { username: 'testuser', password: 'invalid_password' },
  { username: 'invalid_username', password: 'password123' },
];

/*
test.describe is used to categorize a set of test
On the test results it will show as "Login Tests > Should show error for invalid login"

For items without describe it will just show as "Should show error for invalid login"
*/

test.describe('Login Tests', () => {
  for (const creds of invalidCredentials) {
    test(`should show error for invalid login with ${creds.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(creds.username, creds.password);
      await loginPage.isInvalidLoginMessageVisible();
    });
  }
});

test('add, edit, delete item flow', async ({ page }) => {

  // const is a keyword used to declare a variable whose value cannot be reassigned after it’s set.

  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const itemList = new ItemListPage(page);

  const itemName = 'test item';
  const updatedItemName = 'updated test item';

  // Navigate to login page
  await loginPage.goto();

  // Login
  await loginPage.login(env.username, env.password);

  // Verify dashboard loaded
  await dashboard.expectPageLoaded();

  // Navigate to item list page
  await dashboard.goToItemListPage();

  // Verify item list page loaded
  await itemList.expectPageLoaded();

  // Add new item
  await itemList.addItem(itemName);

  // Edit the item
  await itemList.editItem(itemName, updatedItemName);

  // Delete the updated item
  await itemList.deleteItem(updatedItemName);

  // Assert the item list is empty
  const items = await itemList.getItems();
  expect(items.length).toBe(0);

  // Go back to dashboard
  await itemList.goBackToDashboard();

  // Logout
  await dashboard.logout();
});



test.describe('Form Submission - Excel Data Driven', () => {
  let formTests: any[] = [];

  test.beforeAll(async () => {
    formTests = await readExcelFile('test-data/testdata.xlsx', 'form_test');
  });

  test('run form submission tests from Excel', async ({ page }) => {
    for (const [index, form_test] of formTests.entries()) {
      const loginPage = new LoginPage(page);
      const dashboard = new DashboardPage(page);
      const formPage = new FormPage(page);

      const date = new Date(form_test.date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const displayDate = format(date, 'yyyy-MM-dd');

      const expectedMessage = `Form submitted successfully! Text: ${form_test.text_input}, Option: ${form_test.selected_dropdown}, Date: ${displayDate}, Choice: ${form_test.select_radio}, Agreed: true`;

      await loginPage.goto();
      await loginPage.login(env.username, env.password);
      await dashboard.expectPageLoaded();
      await dashboard.goToFormPage();
      await formPage.expectPageLoaded();

      await formPage.fillTextInput(form_test.text_input);
      await formPage.selectDropdown(form_test.selected_dropdown);
      await formPage.fillDate(formattedDate);
      await formPage.selectRadioOption(form_test.select_radio);
      await formPage.checkAgree();
      await formPage.submit();

      const actualMessage = await formPage.getFormMessage();
      expect(actualMessage).toBe(expectedMessage);
    }
  });
});
