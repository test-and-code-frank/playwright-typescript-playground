import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ItemListPage } from '../pages/ItemListPage';

import { loadYAMLEnv } from '../src/utils/loadYAMLEnv';

const env = loadYAMLEnv();

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
