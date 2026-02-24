import { expect, test } from '@playwright/test'

test.describe('Appointment form', () => {
  test('phone mask works and telegram becomes required when no-call is checked', async ({ page }) => {
    await page.goto('/#reception')

    const nameInput = page.locator('#appointment-name')
    const phoneInput = page.locator('#appointment-phone')
    const petTypeInput = page.locator('#appointment-pet-type')
    const reasonInput = page.locator('#appointment-reason')
    const noCallCheckbox = page.locator('#appointment-no-call')
    const telegramInput = page.locator('#appointment-telegram')
    const policyCheckbox = page.locator('.appointment-form__check-input').nth(1)
    const submitButton = page.locator('.appointment-form button[type="submit"]')

    await nameInput.fill('Anna')
    await phoneInput.click()
    await phoneInput.type('9991234567')
    await expect(phoneInput).toHaveValue('+7 (999) 123-45-67')
    await petTypeInput.fill('Cat')
    await reasonInput.fill('Pet has been scratching its ear for several days.')

    await noCallCheckbox.check()
    await policyCheckbox.check()

    await submitButton.click()
    await expect(telegramInput).toBeFocused()

    await expect
      .poll(async () => telegramInput.evaluate((input) => input.validationMessage), {
        message: 'Telegram field should be invalid when no-call is checked',
      })
      .not.toBe('')

    await telegramInput.fill('@vet_clinic_help')
    await submitButton.click()

    await expect
      .poll(async () => telegramInput.evaluate((input) => input.validationMessage))
      .toBe('')
  })
})
