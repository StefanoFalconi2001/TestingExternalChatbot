import { test, expect, type Page } from '@playwright/test';

let desiredLanguage = "Spanish"
test.describe('External chatbot automated tests', () => { 

  test.beforeEach(async ({ page }) => {
  await page.goto('https://msoftpublicsite.z13.web.core.windows.net/#/home');
  await page.locator('button #chat-icon').click()
  const spanishButton = await page.getByRole('button').getByText('Español')
  const englishButton = await page.getByRole('button').getByText('English')

  await page.waitForTimeout(5000)

  expect(englishButton).toBeVisible()
  expect(spanishButton).toBeVisible()

  if(desiredLanguage == "Spanish"){
    await spanishButton.click()
  }else if(desiredLanguage == "English"){
    await englishButton.click()
  }
  });

  test('Languages verification', async ({ page }) => {
    
  });

 
})
