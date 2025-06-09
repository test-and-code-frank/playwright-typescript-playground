import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

/* Parameterize test */
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
  for (const credentials of invalidCredentials) {
    test(`should show error for invalid login with ${credentials.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(credentials.username, credentials.password);
      await loginPage.isInvalidLoginMessageVisible();
      await expect(page).toHaveScreenshot(`${credentials.username} invalid login message.png`);
    });
  }
});
