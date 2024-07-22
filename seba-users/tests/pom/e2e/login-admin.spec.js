import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { CREDENTIALS } from "../data/Constantes";


test("Admin user can login to wp-admin", async ({ page }) => {
	console.log(CREDENTIALS.WP_ADMIN_USER);
	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.submitAdminLogin(
		CREDENTIALS.WP_ADMIN_USER,
		CREDENTIALS.WP_ADMIN_PASSSWORD,
	);

	await expect(
		page.getByRole("heading", { name: "Welcome to WordPress!" }),
	).toBeVisible();
});
