import { expect, test } from '@playwright/test'
import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers/dist'
import { ElectronApplication, Page, _electron as electron } from 'playwright'

let electronApp: ElectronApplication

let page: Page

const SCREENSHOT_PATH = 'out/report/screenshot'
const TEXT1 = `Hello Mars! ${new Date()}`;
const TEXT2 = `Hello Universe! ${new Date()}`;

// before all hook
test.beforeAll(async () => {
	// use helpers to auto find latest build
	// const latestBuild = findLatestBuild()
	// or just static path to folder
	const latestBuild = '/Users/jevasco/src/sandbox/circleci-nodeapp/out/slack-app-darwin-x64'
	console.log(`latestBuild = ${latestBuild}`)
	// use helpers to parse the directory and find paths and other info
	const appInfo = parseElectronApp(latestBuild)
	// console.log(`appInfo = ${JSON.stringify(appInfo)}`)
	// launch app
	electronApp = await electron.launch({
	  executablePath: appInfo.executable,
	  args: [appInfo.main]
	})
	// do some checks to make sure app launched 
	electronApp.on('window', async (page) => {
	  const url = page.url()?.split('/').pop()
	  console.log(`Window opened: ${url}`)  
	  // capture errors
	  page.on('pageerror', (error) => {
		console.error(error)
	  })
	  // capture console messages
	  page.on('console', (msg) => {
		console.log(msg.text())
	  })
	})
  
  })

// after all hook
test.afterAll(async () => {
	// close app
	await electronApp.close()
  })

test('As a test: Test I can launch and hook on Slack app', async () => {
	const window = await electronApp.firstWindow();
	const url = window.url()?.split('/').pop()
	console.log(`Window opened: ${url}`); // old-joe workspace: THWUCHYD6
	// await window.waitForTimeout(10000);
	// await window.goto('https://app.slack.com/client/T016TPDB2HM');
	// await window.click('[data-qa="ssb-signin-btn"]');
	await window.click('[data-qa="channel_sidebar_name_page_psaved"]');
	await window.screenshot({ path: `${SCREENSHOT_PATH}/slack1-screenshot.png` });
	await window.waitForTimeout(2000);
})

test.skip('As a user: Test I can do something else', async () => {
// Click on Canvases in sidebar
// const canvasTitle = `Canvas title Demo 12345`;
// await window1.click('[data-qa="virtual-list-item"]:has([data-qa="channel_sidebar_name_page_pbrowse-quip-files"])');
// // Click on New Canvas button
// // await window1.click('text=New Canvas');

// //   // Wait for load
// //   await window1.waitForTimeout(5000);

// //   // Get all open pages(=windows)
// //   const pages = electronApp.context().pages();

// //   // Get the second page
// //   // const window2 = pages[1];

// //   // Enter test into the Canvas
// //   await window1.type('.document-content', canvasTitle);
// //   // static wait for now
// //   await window1.waitForTimeout(5000);

// //   // Verify canvas is created
// //   // static wait for now
// //   await window1.waitForTimeout(15000);
// //   await window1.reload();

// //   // Click on Canvases in sidebar
// //   await window1.click('[data-qa="virtual-list-item"]:has([data-qa="channel_sidebar_name_page_pbrowse-quip-files"])');

//   // Verify Cavnas title is there
//   await window1.waitForSelector(`text=${canvasTitle}`);

//   // Wait to see it's typed
//   await window1.waitForTimeout(5000);

//   // Delete canvas
//   // Hover over the canvas
//   await window1.hover(`text=${canvasTitle}`);

//   // Click on more actions - three dots
//   await window1.click('[data-qa="more_file_actions"]');

//   // Click on delete file
//   await window1.click('[data-qa="delete_file"]');

//   // Confirm delete file
//   await window1.click('[data-qa="dialog_go"]');

// BELOW ARE ORIGINAL STUFF
// page = await electronApp.firstWindow()
// await page.waitForSelector('h1')
// const text = await page.$eval('h1', (el) => el.textContent)
// expect(text).toBe('Hello World!')
// const title = await page.title()
// expect(title).toBe('Window 1')
})
