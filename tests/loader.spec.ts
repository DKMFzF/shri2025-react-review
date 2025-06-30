import { test, expect } from '@playwright/test';

test.describe('Проверка Лоадера', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('после загрузки файла и отправки формы должен отображаться загрузчик', async ({ page }) => {
    await page.goto('/');

    const testFilePath = 'test-file.csv';
    const fileContent = 'column1,column2\nvalue1,value2';
    
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: testFilePath,
      mimeType: 'text/csv',
      buffer: Buffer.from(fileContent)
    });
    await expect(page.getByText(testFilePath)).toBeVisible();
    await page.click('button:has-text("Отправить")');
    await expect(page.getByTestId('loader')).toBeVisible();
  });
});
