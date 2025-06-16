import { test, expect, type Page } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let desiredLanguage = "English"
test.describe('External chatbot automated tests', () => { 

  test.beforeEach(async ({ page }) => {
    await page.goto('https://msoftpublicsite.z13.web.core.windows.net/#/home');
    await page.locator('button #chat-icon').click()
    const spanishButton = await page.getByRole('button').getByText('Español')
    const englishButton = await page.getByRole('button').getByText('English')
    await page.waitForTimeout(7000)
    const introductoryMessage = await page.locator('.webchat__bubble__content div p').filter({hasText: "/"})
    expect(introductoryMessage).toContainText('Por favor selecciona un idioma.')
    expect(introductoryMessage).toContainText('Please select a language.')
    expect(englishButton).toBeVisible()
    expect(spanishButton).toBeVisible()
    if(desiredLanguage == "Español"){
      await spanishButton.click()
    }else if(desiredLanguage == "English"){
      await englishButton.click()
    }
    await page.waitForTimeout(7000)
  });

  test('Languages verification', async ({ page }) => {
    const chosenLanguageMessage = await page.locator('.webchat__stacked-layout__main .webchat__bubble__content').getByText(desiredLanguage)
    expect(chosenLanguageMessage).toBeVisible()
    const verifyingLanguageMessage = await page.locator('.webchat__bubble__content p').filter({hasText: "Hi"})
    expect(verifyingLanguageMessage).toContainText('assistant')
    expect(verifyingLanguageMessage).toContainText('about')
  });

  test('First actions verification', async ({page}) => {
    const pm = new PageManager(page);
    const firstActions = ['Our Services', 'Pricing', 'Contact & Location', 'Our Team', 'Who we are', 'Our History'];
    await pm.introductoryAndFinalActionsVerifyEN().verifySuggestedActionsListsEN(firstActions)
  });

  test('Our Services verification', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Our Services';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();
    await page.waitForTimeout(5000);
    const ourServices = ['Software Development', 'Cloud', 'Outsourcing', 'Artificial Intelligence & Data Analysis', 'DevOps/MLops', 'Low-Code/No-Code'];
    await pm.introductoryAndFinalActionsVerifyEN().verifySuggestedActionsListsEN(ourServices)
  });

  test('Pricing interaction and contacts verification', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Pricing';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();
    await page.waitForTimeout(5000);
    const pricingMessage = await page.locator('.webchat__bubble__content p').filter({hasText:"information"})
    expect(pricingMessage).toContainText('(+593) 99 512 1992')
    expect(pricingMessage).toContainText('info@mushroomsoft-it.com')
    pm.introductoryAndFinalActionsVerifyEN().verifyNewRequestMessageEN()
    const firstActions = ['Our Services', 'Pricing', 'Contact & Location', 'Our Team', 'Who we are', 'Our History'];
    await pm.introductoryAndFinalActionsVerifyEN().verifySuggestedActionsListsEN(firstActions)
  });

  test('Contact & Location interaction and validating information', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Contact & Location';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();
    await page.waitForTimeout(5000);
    const pricingMessage = await page.locator('.webchat__bubble__content p').filter({hasText:"Location:"})
    const pricingMessages = [
      'Av. Río Amazonas y Roca',
      'Edificio Río Amazonas',
      '3rd Floor, Office 319',
      'Quito, Ecuador',
      '(+593) 2 2551 030',
      '+593 99 512 1992',
      'info@mushroomsoft-it.com'
    ]
    pricingMessages.forEach(text => {
      expect(pricingMessage).toContainText(text)
    })
    pm.introductoryAndFinalActionsVerifyEN().verifyNewRequestMessageEN()
    const firstActions = ['Our Services', 'Pricing', 'Contact & Location', 'Our Team', 'Who we are', 'Our History'];
    await pm.introductoryAndFinalActionsVerifyEN().verifySuggestedActionsListsEN(firstActions)
  });

  test('Our Team actions verification', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Our Team';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();
    await page.waitForTimeout(5000);
    const teamMembers = ['CTO', 'General Manager', 'Office Manager', 'USA Manager', 'Human Resources', 'Invoices', 'General Information'];
    await pm.introductoryAndFinalActionsVerifyEN().verifySuggestedActionsListsEN(teamMembers)
  });

   test('Who we are interaction', async ({page}) => {
      const pm = new PageManager(page);
      const suggestedAction = 'Who we are';
      const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
      await suggestedActionButton.click();

      await page.waitForTimeout(5000);
      const whoWeAreMessageP1 = await page.locator('.webchat__bubble__content p').filter({hasText:"Ecuador"})
      expect(whoWeAreMessageP1).toContainText('engineers')

      const whoWeAreMessageP2 = await page.locator('.webchat__bubble__content p').filter({hasText:"software development"})
      expect(whoWeAreMessageP2).toContainText('horizontal structure')

      const whoWeAreMessageP3 = await page.locator('.webchat__bubble__content p').filter({hasText:"technology"})
      expect(whoWeAreMessageP3).toContainText('solutions')

      pm.introductoryAndFinalActionsVerifyEN().verifyNewRequestMessageEN()
      const firstActions = ['Our Services', 'Pricing', 'Contact & Location', 'Our Team', 'Who we are', 'Our History'];
      await pm.introductoryAndFinalActionsVerifyEN().verifySuggestedActionsListsEN(firstActions)
    });

     test('Our History', async ({page}) => {
      const pm = new PageManager(page);
      const suggestedAction = 'Our history';
      const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
      await suggestedActionButton.click();

      await page.waitForTimeout(5000);
      const whoWeAreMessageP1 = await page.locator('.webchat__bubble__content p').filter({hasText:"Ecuador"})
      expect(whoWeAreMessageP1).toContainText('vision')

      const whoWeAreMessageP2 = await page.locator('.webchat__bubble__content p').filter({hasText:"pandemic"})
      expect(whoWeAreMessageP2).toContainText('challenges')

      const whoWeAreMessageP3 = await page.locator('.webchat__bubble__content p').filter({hasText:"horizontal"})
      expect(whoWeAreMessageP3).toContainText('environment')
      
      pm.introductoryAndFinalActionsVerifyEN().verifyNewRequestMessageEN()
      const firstActions = ['Our Services', 'Pricing', 'Contact & Location', 'Our Team', 'Who we are', 'Our History'];
      await pm.introductoryAndFinalActionsVerifyEN().verifySuggestedActionsListsEN(firstActions)
    });
})