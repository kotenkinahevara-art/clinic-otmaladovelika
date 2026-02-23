import { expect, test } from '@playwright/test'

test.describe('Mobile menu', () => {
  test('updates active section by scroll, not only by last click', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only scenario')

    await page.goto('/')

    const openMenuButton = page.getByRole('button', { name: 'Открыть меню' })
    await openMenuButton.click()

    const reviewsLink = page.locator('#mobile-menu a[href="#reviews"]')
    await reviewsLink.click()
    await expect(page).toHaveURL(/#reviews$/)

    await page.locator('#contacts').scrollIntoViewIfNeeded()

    await page.getByRole('button', { name: 'Открыть меню' }).click()
    const contactsLink = page.locator('#mobile-menu a[href="#contacts"]')
    await expect(contactsLink).toHaveAttribute('aria-current', 'page')
  })
})
