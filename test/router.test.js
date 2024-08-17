import { expect, test } from "bun:test";
import puppeteer from "puppeteer";

test("router", async () => {
    const browser = await puppeteer.launch(); // { headless: false, slowMo: 150 }
    const page = await browser.newPage();

    // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.goto("http://localhost:8080", {
        waitUntil: "networkidle0",
    });

    await page.setViewport({ width: 1080, height: 1024 });

    const mpwdInputLocator = page.locator("#master-password");

    await mpwdInputLocator.fill("asd");

    const mpwdInputHandle = await mpwdInputLocator.waitHandle();

    await mpwdInputHandle.press("Enter");

    await page.locator("#account").fill("asd");

    /**
     * Using page.$eval() as workaround for locator().click(), bug still exists.
     * https://github.com/puppeteer/puppeteer/issues/3347
     * 
     * Use the following code, when bug gets fixed:
     * await page.locator("#show-pwd").click();
     */
    await page.$eval("#show-pwd", (/** @type {HTMLInputElement} */ elem) => elem.click());

    const tooltip = await page.locator("#pwd-tooltip").waitHandle();

    while (await tooltip?.evaluate(el => el.textContent) === "") {
        await page.$eval("#show-pwd", (/** @type {HTMLInputElement} */ elem) => elem.click());
        await new Promise(r => setTimeout(r, 200));
    };

    const pwdTooltip = await tooltip?.evaluate(el => el.textContent);

    expect(pwdTooltip).toBe("YK}B-u{m,0Rt3f1fh6%NLeI;j7CCmT{#");

    await browser.close();
});