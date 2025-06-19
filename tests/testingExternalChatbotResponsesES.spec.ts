import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let desiredLanguage = "Español"
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

  test('First actions verification', async ({page}) => {
    const pm = new PageManager(page);
    const firstActions = ['Nuestros Servicios', 'Cotizaciones', 'Contacto y Ubicación', 'Nuestro Equipo', 'Quiénes somos', 'Nuestra Historia'];
    await pm.introductoryAndFinalActionsVerifyES().verifySuggestedActionsListsES(firstActions)
  });

  test('Our Services verification', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Nuestros Servicios';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();
    await page.waitForTimeout(5000);
    const ourServices = ['Desarrollo de Software', 'Outsourcing de Recursos Tecnológicos', 'Nube', 'Inteligencia Artificial y Análisis de Datos', 'DevOps/MLops', 'Desarrollo Low-Code/No-Code'];
    await pm.introductoryAndFinalActionsVerifyES().verifySuggestedActionsListsES(ourServices)
  });

  test('Pricing interaction and contacts verification', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Cotizaciones';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();
    await page.waitForTimeout(5000);
    const pricingMessage = await page.locator('.webchat__bubble__content p').filter({hasText:"información"})
    expect(pricingMessage).toContainText('(+593) 99 512 1992')
    expect(pricingMessage).toContainText('info@mushroomsoft-it.com')
    pm.introductoryAndFinalActionsVerifyES().verifyNewRequestMessageES()
    const firstActions = ['Nuestros Servicios', 'Cotizaciones', 'Contacto y Ubicación', 'Nuestro Equipo', 'Quiénes somos', 'Nuestra Historia'];
    await pm.introductoryAndFinalActionsVerifyES().verifySuggestedActionsListsES(firstActions)
  });

  test('Contact & Location interaction and validating information', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Contacto y Ubicación';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();
    await page.waitForTimeout(5000);
    const pricingMessage = await page.locator('.webchat__bubble__content p').filter({hasText:"Ubicación:"})
    const pricingMessages = [
      'Av. Río Amazonas y Roca',
      'Edificio Río Amazonas',
      '3er. Piso, Oficina 319',
      'Quito, Ecuador',
      '(+593) 2 2551 030',
      '+593 99 512 1992',
      'info@mushroomsoft-it.com'
    ]
    pricingMessages.forEach(text => {
      expect(pricingMessage).toContainText(text)
    })
    pm.introductoryAndFinalActionsVerifyES().verifyNewRequestMessageES()
    const firstActions = ['Nuestros Servicios', 'Cotizaciones', 'Contacto y Ubicación', 'Nuestro Equipo', 'Quiénes somos', 'Nuestra Historia'];
    await pm.introductoryAndFinalActionsVerifyES().verifySuggestedActionsListsES(firstActions)
  });

  test('Our Team actions verification', async ({page}) => {
    const pm = new PageManager(page);
    const suggestedAction = 'Nuestro Equipo';
    const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
    await suggestedActionButton.click();
    await page.waitForTimeout(5000);
    const teamMembers = ['CTO', 'Gerente General', 'Gerente de Oficina', 'Gerente USA', 'Marketing', 'RRHH', 'Contabilidad', 'Información General'];
    await pm.introductoryAndFinalActionsVerifyES().verifySuggestedActionsListsES(teamMembers)
  });

   test('Who we are interaction', async ({page}) => {
      const pm = new PageManager(page);
      const suggestedAction = 'Quiénes somos';
      const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
      await suggestedActionButton.click();

      await page.waitForTimeout(5000);
      const whoWeAreMessageP1 = await page.locator('.webchat__bubble__content p').filter({hasText:"Ecuador"})
      expect(whoWeAreMessageP1).toContainText('ingenieros')

      const whoWeAreMessageP2 = await page.locator('.webchat__bubble__content p').filter({hasText:"desarrollo de software"})
      expect(whoWeAreMessageP2).toContainText('estructura horizontal')

      const whoWeAreMessageP3 = await page.locator('.webchat__bubble__content p').filter({hasText:"tecnología"})
      expect(whoWeAreMessageP3).toContainText('soluciones')

      pm.introductoryAndFinalActionsVerifyES().verifyNewRequestMessageES()
      const firstActions = ['Nuestros Servicios', 'Cotizaciones', 'Contacto y Ubicación', 'Nuestro Equipo', 'Quiénes somos', 'Nuestra Historia'];
      await pm.introductoryAndFinalActionsVerifyES().verifySuggestedActionsListsES(firstActions)
    });

     test('Our History', async ({page}) => {
      const pm = new PageManager(page);
      const suggestedAction = 'Nuestra Historia';
      const suggestedActionButton = page.locator('.react-film__filmstrip .webchat__suggested-actions__item-box').getByText(suggestedAction);
      await suggestedActionButton.click();

      await page.waitForTimeout(5000);
      const whoWeAreMessageP1 = await page.locator('.webchat__bubble__content p').filter({hasText:"Ecuador"})
      expect(whoWeAreMessageP1).toContainText('visión')

      const whoWeAreMessageP2 = await page.locator('.webchat__bubble__content p').filter({hasText:"pandemia"})
      expect(whoWeAreMessageP2).toContainText('desafíos')

      const whoWeAreMessageP3 = await page.locator('.webchat__bubble__content p').filter({hasText:"horizontal"})
      expect(whoWeAreMessageP3).toContainText('entorno')
      pm.introductoryAndFinalActionsVerifyES().verifyNewRequestMessageES()
      const firstActions = ['Nuestros Servicios', 'Cotizaciones', 'Contacto y Ubicación', 'Nuestro Equipo', 'Quiénes somos', 'Nuestra Historia'];
      await pm.introductoryAndFinalActionsVerifyES().verifySuggestedActionsListsES(firstActions)
    });
})
