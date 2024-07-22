const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
	this.username = page.getByLabel('Username or Email Address');
	this.password =  page.getByLabel('Password', { exact: true });
	this.submitbutton = page.getByRole('button', { name: 'Log In' });
  }

  async submitAdminLogin(userName,password) {
	await this.username.fill(userName);
	await this.password.fill(password);
	await this.submitbutton.click();
  }

  async goto() {
    await this.page.goto('/wp-login.php');
  }

};
