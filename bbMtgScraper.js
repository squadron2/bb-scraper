import puppeteer from 'puppeteer'
import fs from "fs"
import ProgressBar from 'progress'

// let searchValue = 'magic the gathering'
let searchValue = {bestbuy: 'magic the gathering'}
let searchDelay = 3000 + searchValue.bestbuy.length * 100

let sales = fs.existsSync(`sales.json`) ? JSON.parse(fs.readFileSync('sales.json', 'utf8')) : []

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
})

// Creates a delay in milliseconds
function delay(amount) {
    return new Promise(function(resolve) {
        setTimeout(resolve, amount)
    })
}

const main = async () => {
    const page = await browser.newPage()
    await page.goto('https://bestbuy.com/')
    await page.setViewport({width: 2560, height: 1440})

    // Element must be visible for typing
    await page.waitForSelector('.search-input', {visible: true, timeout: 5000})

    // Type into search box
    await page.evaluate((value) => {
        const input = document.querySelector('#gh-search-input');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }, searchValue.bestbuy);

    // Delay to allow search to complete
    await delay(searchDelay)

    // Click search button
    await page.click('.header-search-button')
}

main()