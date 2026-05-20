import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (browser) return browser;

  browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  return browser;
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
