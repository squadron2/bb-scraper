import puppeteer from 'puppeteer'
import fs from "fs"
import ProgressBar from 'progress'

let sales = fs.existsSync(`sales.json`) ? JSON.parse(fs.readFileSync("sales.json", "utf8")) : []

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
})

const main = async () => {
    const page = await browser.newPage()
    await page.goto('https://bestbuy.com/')
    await page.setViewport({width: 1440, height: 2560})

    // Type into search box
    await page.type('.search-input', 'light laptops')

    // Click search button
    await page.click('.header-search-button')
}

main()