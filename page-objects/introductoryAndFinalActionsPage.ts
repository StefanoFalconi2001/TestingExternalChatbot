import { expect, type Locator, type Page } from '@playwright/test';

export class IntroductoryAndFinalActionsPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly newRequestMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newRequestMessage = page.locator('.webchat__bubble__content p').filter({hasText: `Is there anything else you’d like to know?`});
  }

  async verifyNewRequest() {
    await expect(this.newRequestMessage).toBeVisible();
  }
}