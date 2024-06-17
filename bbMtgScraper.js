import puppeteer from 'puppeteer'
import fs from "fs"
import ProgressBar from 'progress'

let sales = fs.existsSync(`sales.json`) ? JSON.parse(fs.readFileSync("sales.json", "utf8")) : []

const browser = await puppeteer.launch({headless: false})

const main = async () => {
    const page = await browser.newPage()
    await page.goto('https://bestbuy.com/')
    await page.setViewport({width: 1440, height: 2560});
}

main()