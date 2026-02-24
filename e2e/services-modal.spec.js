import { expect, test } from '@playwright/test'

test.describe('Services modal', () => {
  test('opens from card and scrolls to reception on CTA click', async ({ page }) => {
    await page.goto('/')

    const servicesSection = page.locator('#services')
    await servicesSection.scrollIntoViewIfNeeded()

    const firstCard = servicesSection.locator('.card-expandable').first()
    await firstCard.locator('.card-expandable__toggle').click()
    await firstCard.locator('.btn').click()

    const modal = page.locator('.service-modal')
    await expect(modal).toBeVisible()

    await modal.locator('.btn').click()

    await expect(page).toHaveURL(/#reception$/)
    await expect(page.locator('#reception')).toBeVisible()
  })
})
