/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
 require('dotenv').config({ path: './.env.test' });
// eslint-disable-next-line no-unused-vars
module.exports = (on: any, config: any) => {
  config.env.MAILSLURP_API_KEY = process.env.MAILSLURP_API_KEY;
  config.env.USER_PASSWORD = process.env.USER_PASSWORD;
  return config;
}
