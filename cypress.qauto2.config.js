const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
    baseUrl: 'https://qauto2.forstudy.space',
    env: {
      userEmail: 'fixietest14+12@gmail.com',
      userPassword: 'Abcdefghijk1Lmn',
      basicAuthUsername: "guest",
      basicAuthPassword: "welcome2qauto"
    },
  },
});