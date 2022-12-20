# TabbyX

TabbyX is a simple demo for an appointment booking system using React on Vite, GraphQL and Typescript.

Backend GitHub repo: [https://github.com/JetpackKitty/tabbyx-api](https://github.com/JetpackKitty/tabbyx-api) (instructions and description for backend are in the repo readme)

## Live Preview

The website can be previewed here: [https://tabbyx.mechacat.app](https://tabbyx.mechacat.app)

The GraphQL backend can be previewed here:
[https://tabbyx-api.mechacat.app/graphql](https://tabbyx-api.mechacat.app/graphql)

You can also use [Apollo Studio Explorer](https://studio.apollographql.com/sandbox/explorer) to view and query the schema.

## Usage

### Setup

- Clone the repo
- `yarn` to install dependencies
- update `.env` file according to `.env-sample` reference

### Development

- `yarn dev` to run in development mode
- `yarn codegen` or `yarn codegen:watch` to update GraphQL Typescript types after modifying the frontend GQL
- `yarn test` or `yarn test:watch` to run tests
- `yarn generate-schema` to update the GraphQL schema on any backend schema changes

### Build

- `yarn preview` to run vite in preview
- `yarn build` to build

## Details

### Project Description

This submission is intended to demonstrate an application using React on Vite for frontend, and GraphQL and Typescript for backend. Project structure is intended to incorporate elements of Clean Architecture to improve code quality, maintainability and allow for future modifications or improvements as would happen in real-world scenarios.

### Scope

- This project covers frontend and backend to simulate operation of a full SPA web app. It is not intended to be a fully robust product-ready application, only to incorporate enough to demonstrate the intent for some of the code design.
- Users should be able to book an appointment based on available slots, check their appointments, cancel, and add to their Google calendars.
- The code is covered by tests at the various levels to demonstrate some of the testing approaches but is not intended to have full coverage.
- Authentication or user management is not implemented.
- Frontend should support desktop and mobile views

### Frontend Assumptions

- No user registration or authentication is implemented, users will provide an email address and that is used to identify them or to retrieve their bookings.
- Appointments can only be made according to constraints listed. The constraints are hardcoded for simplicity, but in real-world will ideally support changes by internal users.
- UI was based off of templates from [https://chakra-templates.dev/](https://chakra-templates.dev/) and modified only for functionality, not to provide a unified design theme.

### Notes

- Frontend tests are provided as an example for unit testing the logic (not UI) to demonstrate the concept but are not intended to provide coverage at the level of a production app.
