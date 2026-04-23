import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

test("newtest", async ({ page }) => {
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const email = "anshika15@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("IamKing@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    // Zara Coat 3
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if ((await products.nth(i).locator("b").textContent()) === productName) {
            // add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    // await page.pause();
    await page.locator("//button[@routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    // await page.waitForTimeout(3000);
    const boll = await page
        .locator("//h3[normalize-space()='ZARA COAT 3']")
        .isVisible();
    expect(boll).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
        expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const oderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(oderId);
        // expect(oderId).toBeTruthy();
        await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click();
        await page.waitForSelector('tbody tr'); //wait for table
        const rows = await page.locator("tbody tr"); 
        for (let i = 0; i < await rows.count(); i++)
        {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            
            if(oderId.includes(rowOrderId))
            {
                await rows.nth(i).locator("(//button[contains(text(),'View')])").first().click();
                // await rows.nth(i).locator("(button").first().click();
                break;
            }
         const orderStatus = await page.locator("col-text -main").textContent();
         expect(oderId.includes(orderStatus)).toBeTruthy();

        }
        // await page.pause();

    
});

