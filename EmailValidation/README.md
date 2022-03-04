### Introduction

Sole purpose of this project is to demonstrate how we can make use of mailslurp plugin with cypress to perform email operation.

### Pre-requisites

1. Node JS v12 or higher
2. User has account created in [Mailslurp](https://playground.mailslurp.com)

### Setup

You can follow below steps to have local setup

1. Run `git clone` command to clone github repository.
2. Navigate to root repository and run `yarn install` command.
3. Update .env.test `MAILSLURP_API_KEY` value with valid Mailslurp API token.
4. Run `yarn cy:open` command to open cypress Dashboard and click on file you want to execute.
5. If you wish to run directly(without opening cypress Dashboard) use command `yarn cy:run`.
