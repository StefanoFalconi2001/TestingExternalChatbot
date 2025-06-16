import { expect, type Locator, type Page } from '@playwright/test';
import { HelperBase } from "./helperBase";

export class IntroductoryAndFinalActionsPageEN extends HelperBase{
  readonly newRequestMessage: Locator;
  readonly actionForSuggestedActionButtons: Locator;
  readonly suggestedActionsRightArrow: Locator;

  constructor(page: Page) {
    super(page)
    this.newRequestMessage = page.locator('.webchat__bubble__content p').filter({hasText: `Is there anything else you’d like to know?`});
    this.actionForSuggestedActionButtons = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box');
    this.suggestedActionsRightArrow = page.locator('[class="react-film__flipper react-film__main__overlay react-film__flipper--right"]');
  }

  async verifyNewRequestMessageEN(){
        expect(this.newRequestMessage).toBeVisible();
    }

  async verifySuggestedActionsListsEN(suggestedActionButtons: string[]) {
    for (let suggestedAction of suggestedActionButtons) {
      console.log(`Searching: ${suggestedAction}`);
      const action = this.actionForSuggestedActionButtons.filter({hasText: suggestedAction});

      if (await action.isVisible()) {
        console.log(`Found (direct): ${suggestedAction}`);
        await expect(action).toBeVisible();
        continue;
      }

      console.log(`"${suggestedAction}" not visible at first. Clicking the arrow once.`);
      await this.suggestedActionsRightArrow.click();
      await this.waitForNumberOfSeconds(1)

      if (await action.isVisible()) {
        console.log(`Found after clicking: ${suggestedAction}`);
        await expect(action).toBeVisible();
      } else {
        throw new Error(`"${suggestedAction}" not found after clicking the arrow once.`);
      }
    }
  }


}