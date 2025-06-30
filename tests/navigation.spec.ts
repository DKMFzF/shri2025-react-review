import { test, expect } from '@playwright/test';

test.describe('Навигация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('должны корректно происходит навигация по сайту', async ({ page }) => {
    const analystLink = page.getByRole('button', { name: 'CSV Аналитик' });
    await expect(analystLink).toHaveClass(/header__nav-link-wrapper_active/);
    
    const generatorLink = page.getByRole('button', { name: 'CSV Генератор' });
    await generatorLink.click();
    await expect(page).toHaveURL('/generator');
    await expect(generatorLink).toHaveClass(/header__nav-link-wrapper_active/);
    await expect(analystLink).not.toHaveClass(/header__nav-link-wrapper_active/);

    const historyLink = page.getByRole('button', { name: 'История' });
    await historyLink.click();
    await expect(page).toHaveURL('/history');
    await expect(historyLink).toHaveClass(/header__nav-link-wrapper_active/);
    await expect(generatorLink).not.toHaveClass(/header__nav-link-wrapper_active/);
  });
});
