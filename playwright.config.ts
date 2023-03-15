import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './specs/playwright',
  maxFailures: 2,
}

export default config
