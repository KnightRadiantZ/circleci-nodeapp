import { PlaywrightTestConfig } from '@playwright/test'
import { defineConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './specs/playwright',
  maxFailures: 2,
  reporter: [
    ['junit', { outputFile: 'out/report/xml/results.xml' }], 
    ['html', { outputFolder: 'out/report/html', open: 'never' }]
  ],
}

export default config
