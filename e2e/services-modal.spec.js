import { expect, test } from '@playwright/test'

test.describe('Services modal', () => {
  test('opens from card and scrolls to reception on CTA click', async ({ page }) => {
    await page.goto('/')
    const servicesSection = page.locator('#services')
    await servicesSection.scrollIntoViewIfNeeded()

    const firstCardToggle = servicesSection.locator('.card-expandable__toggle').first()
    await firstCardToggle.click()

    await servicesSection.getByRole('button', { name: 'Подробнее' }).first().click()

    const modal = page.locator('.service-modal')
    await expect(modal).toBeVisible()

    await modal.getByRole('button', { name: 'Записаться на приём' }).click()

    await expect(page).toHaveURL(/#reception$/)
    await expect(page.locator('#reception')).toBeVisible()
  })
})
