import puppeteer from 'puppeteer'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot })

const APP = 'http://localhost:9000/aviso-legal/'

let page
let browser
const width = 1280
const height = 980

beforeAll(async () => {
  window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  browser = await puppeteer.launch({
    /* headless: false, */
    /* slowMo: 80, */
    args: [`--window-size=${width},${height}`]
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.goto(APP)
})
afterAll(() => {
  browser.close()
})

async function ss (done) {
  const screenshot = await page.screenshot({ fullPage: true })
  expect(screenshot).toMatchImageSnapshot()
  done()
}

function caught (err) {
  console.log('Caught err:')
  console.log(err)
}

describe('Sección Aviso legal', () => {
  test('[Snapshot] Aviso legal', async done => {
    expect.assertions(1)
    await page.goto(APP)
    ss(done)
  }, 30000)
})
