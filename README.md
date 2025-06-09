# 🧪 Playwright TypeScript Playground

A personal playground for exploring and experimenting with Playwright using TypeScript. This project serves two main purposes:

- To play around with Playwright features and best practices.

- To showcase my understanding and practical knowledge of writing scalable and maintainable test automation using Playwright and TypeScript.


## 💡 Experiment Highlights


### ✍🧩 Page Object Model (POM)

  Using the Page Object Model pattern to encapsulate UI interactions and selectors for maintainability and readability.
  
  - [x] Each page/component has its own class in the `/pages/` directory
  
  - [x] Constructor receives the `Page` object
  
  - [x] Methods expose common actions and assertions

  
### ✍🧩 Retries & Trace on Retry

  Exploring how Playwright handles flaky tests through automatic retries and trace collection for debugging.

  - [x] Retry Configuration Enable retries in `playwright.config.ts`
  ```
  trace: 'on-first-retry'
  ```

  - [x] `View trace` on the html report for the failed test

  💡 Tip
  > Useful config when running test on CI. 
  > After the test run, upload the results artifacts and view the trace report


### ✍🧩 Data-Driven Testing
  Exploring different approaches to run the same test logic against multiple sets of input data.

  - [x] Using Arrays + test.describe()
  
  - [x] Using CSV files as data sources. Used fs and csv-parse to read and parse test data
  
  🚧 Using Excel files as data sources
  
  > Attempted with exceljs, Issue: its async API didn’t play well with Playwright’s test declaration flow
  > Only one test would execute instead of iterating through all rows.
  > xlsx also has vulnerabilities.


### ✍🧩 Assertions with Playwright
  Using Playwright Test Assertions to validate UI and behavior:

  - [x] `expect(actualMessage).toBe(expectedMessage);` – Validating strings 
  
  - [x] `expect(items.length).toBe(0)` – Validating item length
  
  - [ ] `expect(locator).` - Validating locator properties.


### ✍🧩 Screenshot on Failure
  Playwright automatically captures screenshots when a test fails (when configured). This helps with debugging visual or timing issues.
  
  - [x] Enabled via Playwright config: `screenshot: 'only-on-failure'`


### ✍🧩 Test Reporting
  Experimenting with different reporting tools and formats to track test results effectively.

  - [x] Built-in HTML Reporter (Playwright)


### ✍🧩 Configuration with YAML
  Experimenting with managing test data and dynamic config using .yaml files.
  
  - [x] Use Cases - Environment-specific settings (e.g., base URLs, credentials)


### ✍🧩 Visual Comparisons
  Experimenting with Playwright's screenshot comparison to catch unexpected UI changes.

  - [x] Using expect(locator).toHaveScreenshot() to compare current UI state against a baseline image.
  ```
  await expect(page).toHaveScreenshot(`${creds.username} invalid login message.png`);
  ```


## 🎯Project Goals

API Testing

Demonstrate best practices in automation testing with TypeScript.

Explore Playwright features like fixtures, context isolation, and tracing.

Use this as a portfolio project for future opportunities and growth.



## 📁 Project Structure
```
playwright-typescript-playground/
├── config/             # Configuration utilities
├── pages/              # Page Object Models (POMs)
├── src/utils           # Optional utility or mock app logic
├── test-data           # test files e.g csv or json
├── test-site/          # Static site for controlled testing
├── tests/              # Playwright test cases
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```


## 🚀 Getting Started
Prerequisites
Node.js (v16+)
npm or Yarn
```
git clone https://github.com/test-and-code-frank/playwright-typescript-playground.git
cd playwright-typescript-playground
npm install
npx playwright install
```


## 🧪 How to run the test

##### ✅ Run the entire test suite
```
npx playwright test
```

##### 🔍 Run a specific test file
```
npx playwright test tests/example.spec.ts
```
