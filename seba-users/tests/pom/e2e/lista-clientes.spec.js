import { test, expect } from '@playwright/test';

test('As Guest user I can see the list of clients', async ({ page }) => {
  await page.goto('/lista-de-users/');
  await expect(page.getByRole('heading', { name: 'Nuestros clientes' })).toBeVisible();
});
