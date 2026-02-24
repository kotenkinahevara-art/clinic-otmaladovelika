import { expect, test } from '@playwright/test'

test.describe('Mobile menu', () => {
  test('keeps active link in sync with current route', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only scenario')

    await page.goto('/')

    await page.locator('.burger').click()
    await page.locator('#mobile-menu a[href="/otzyvy"]').click()
    await expect(page).toHaveURL(/\/otzyvy$/)

    await page.locator('.burger').click()
    await page.locator('#mobile-menu a[href="/kontakty"]').click()
    await expect(page).toHaveURL(/\/kontakty$/)

    await page.locator('.burger').click()
    await expect(page.locator('#mobile-menu a[href="/kontakty"]')).toHaveAttribute('aria-current', 'page')
    await expect(page.locator('#mobile-menu a[href="/otzyvy"]')).not.toHaveAttribute('aria-current', 'page')
  })
})
