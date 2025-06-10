import { test, expect, type Page } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { IntroductoryAndFinalActionsPage } from '../page-objects/introductoryAndFinalActionsPage';

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

    if(desiredLanguage == "Spanish"){
      await spanishButton.click()
    }else if(desiredLanguage == "English"){
      await englishButton.click()
    }

    await page.waitForTimeout(7000)
  });

  test('Languages verification', async ({ page }) => {
    const chosenLanguageMessage = await page.locator('.webchat__stacked-layout__main .webchat__bubble__content').getByText(desiredLanguage)
    expect(chosenLanguageMessage).toBeVisible()

    const verifyingLanguageMessage = await page.locator('.webchat__bubble__content div p').filter({hasText: "MushroomSoft"})
    expect(verifyingLanguageMessage).toContainText('assistant')
    expect(verifyingLanguageMessage).toContainText('about')
  });

  test('First actions verification', async ({page}) => {
    const firstActions = ['Our Services', 'Pricing', 'Contact & Location', 'Our Team', 'Who we are', 'Our History'];

    for (const actionF of firstActions) {
      console.log(`Searching: ${actionF}`);
      const action = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').filter({hasText: actionF});

      if (await action.isVisible()) {
        console.log(`Found (direct): ${actionF}`);
        await expect(action).toBeVisible();
        continue;
      }

      console.log(`"${actionF}" not visible at first. Clicking the arrow once.`);
      await page.locator('[class="react-film__flipper react-film__main__overlay react-film__flipper--right"]').click();
      await page.waitForTimeout(1000);

      if (await action.isVisible()) {
        console.log(`Found after clicking: ${actionF}`);
        await expect(action).toBeVisible();
      } else {
        throw new Error(`"${actionF}" not found after clicking the arrow once.`);
      }
    }
  });

  test('Our Services verification', async ({page}) => {
    const suggestedAction = 'Our Services';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();

    await page.waitForTimeout(5000);

    const ourServices = ['Software Development', 'Cloud', 'Outsourcing', 'Artificial Intelligence & Data Analysis', 'DevOps/MLops', 'Low-Code/No-Code'];

    for (const service of ourServices) {
      console.log(`Searching: ${service}`);
      const ourService = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').filter({hasText: service});

      if (await ourService.isVisible()) {
        console.log(`Found (direct): ${service}`);
        await expect(ourService).toBeVisible();
        continue;
      }

      console.log(`"${service}" not visible at first. Clicking the arrow once.`);
      await page.locator('[class="react-film__flipper react-film__main__overlay react-film__flipper--right"]').click();
      await page.waitForTimeout(1000);

      if (await ourService.isVisible()) {
        console.log(`Found after clicking: ${service}`);
        await expect(ourService).toBeVisible();
      } else {
        throw new Error(`"${service}" not found after clicking the arrow once.`);
      }
    }
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

    pm.verifyNewRequest();
  });

  test('Contact & Location interaction and validating information', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Contact & Location';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();

    await page.waitForTimeout(5000);
    const pricingMessage = await page.locator('.webchat__bubble__content p').filter({hasText:"Location:"})

    expect(pricingMessage).toContainText('Av. Río Amazonas y Roca')
    expect(pricingMessage).toContainText('Edificio Río Amazonas')
    expect(pricingMessage).toContainText('3rd Floor, Office 319')
    expect(pricingMessage).toContainText('Quito, Ecuador')
    expect(pricingMessage).toContainText('(+593) 2 2551 030')
    expect(pricingMessage).toContainText('+593 99 512 1992')
    expect(pricingMessage).toContainText('info@mushroomsoft-it.com')

    pm.verifyNewRequest();
  });

  test('Our Team actions verification', async ({page}) => {
    const suggestedAction = 'Our Team';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();

    await page.waitForTimeout(5000);

    const teamMembers = ['CTO', 'General Manager', 'Office Manager', 'USA Manager', 'Human Resources', 'Invoices', 'General Information'];

    for (const member of teamMembers) {
      console.log(`Searching: ${member}`);
      const teamMember = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').filter({hasText: member});

      if (await teamMember.isVisible()) {
        console.log(`Found (direct): ${member}`);
        await expect(teamMember).toBeVisible();
        continue;
      }

      console.log(`"${member}" not visible at first. Clicking the arrow once.`);
      await page.locator('[class="react-film__flipper react-film__main__overlay react-film__flipper--right"]').click();
      await page.waitForTimeout(1000);

      if (await teamMember.isVisible()) {
        console.log(`Found after clicking: ${member}`);
        await expect(teamMember).toBeVisible();
      } else {
        throw new Error(`"${member}" not found after clicking the arrow once.`);
      }
    }
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

      pm.verifyNewRequest();
    });

     test('Our History', async ({page}) => {
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
      pm.verifyNewRequest();
    });


  
  })
