# SXH

## 📂 Agenda

> Executive Summary

> How to start the app locally?

> Environment variables

> Deployment

> Accessing CIRCLE_CI

> Accessing HEROKU

> Frontend App

> Sanity

## 📄 Executive Summary

---

**General**

- The web app is built using **Next JS (SSR)**
- The CMS is built using Sanity **(Headless CMS)**
- For the UI we use **Chakra UI**
- For the data fetching we use the official Sanity Javascript Library
- Every time the user access the page, the frontend requests from Sanity based on the slug and the locale + the content
  of the page. The HTML, CSS, Javascript is then rendered on the server and gets returned to the client.

**Questionnaire**

- All questionnaires are managed in Sanity
- Questions, sector specific questions are attached to a questionnaire
- A question has a type of answer (slider, box selector, text input, etc.)
- A question has a Salesforce ID, via this field we send the answers to the Salesforce API
- Sector specific questions have additionally an array of Industry IDs, regarding of the selected Industry we show these
  questions

**Main pages**

- Every page has SEO fields, title, and dynamic content modules coming from Sanity. Based on these content modules the
  page renders differently
- The content modules have different fields and functionality. Every content module has its own file/folder in the
  frontend containing all the UI

**Detail pages (sector, service, transaction, employee, news, CDI offices)**

- Every detail page has different fields for all the dynamic content. We don't have dynamic content modules there.
- The detail pages have relations between each other. Based on this we can show all the news for a sector for example,
  ...

## 🛫 How to start the app locally?

---

- Ensure you have yarn and node installed in your app
- `yarn install` to download the dependencies
- add the `env.local` file based on the `env.example` . The env.local is in the `1password` vault provided by MVST.
- `yarn dev` start the development mode (this should open in [localhost:3000](http://localhost:3000) , please make sure
  that the 3000 PORT is not in use
- `yarn build` plus `yarn start-local`

you reproduce exactly the production build

## ⚙️ Environment variables

---

Always makes sure every time you add a new environment variable to update

- Heroku for Staging
- Heroku for Production
- 1password

Also make sure that you understand which env var should be public or not in NEXT_JS. Next.js runs server side and client
side. So the NEXT_PUBLIC_SANITY_DATASET will be accessible for the outside world while NEXT_SANITY_DATASET will not.

## 🚀 Deployment

---

The app is being deployed in a way to use the master branch to trigger to staging, where to test without affecting the
production app and then deploying the same copy to production using CircleCI.

Always ensure that staging and production have the same setup to avoid environment errors when deploying new versions to
production.

The only difference between the two apps currently is that they point to different databases on Sanity (Staging vs.
Production).

<aside>
💡 Important: The same can be done for both apps: Frontend-App and Sanity

</aside>

---

![Untitled](SXH%20-%20Hand%20d6c8f/Untitled.png)

- After every push to the default branch: `master` . The CIRCLE_CI build will run and deploy the version to `staging`
- Using the `circleci` the user can accept there and then the production app will be updated.

## 🔓 Accessing CIRCLE_CI

---

Connect your account to CircleCI using `Github`. Than is done, if you have the right permissions on Github you will also
have on CircleCI and be able to

1. Check if the build to master was succeeded to see if new code is on staging
2. Trigger a new build to production
3. Update configurations
4. A bunch of other things circleci allows

<aside>
💡 Important: The same can be done for both apps: Frontend-App and Sanity

</aside>

## 🔓 Accessing HEROKU

---

1. If you have access to Heroku, you can see the 4 apps. Staging and Production for both web and sanity
2. If you have right permissions you can update configurations for heroku like env vars, DNS and also restart the
   machine and multiple other options from heroku

# FRONTEND APP

## 📂 Folder structure

---

```jsx
components; // reusable components
pages; // next will handle pages for the slugs
lib;
services; // fetching services
shared - domain; // will give one example, the rest repeats for all domains
employees;
application; // services and hooks for employees
domain; // domain definitions for employees
infrastructure; // requests to get data for employees. Usually calls sanity
presentation; //  components and pages for employees

translation; // translations
zu;
de;
fr;
en.env.local.env.local; // env that will be used local // env that will be used local
```

## 🗞 Scripts

---

This are the scripts, that you can also check in the app `package.json`. Please avoid deleting and changing them because
this scripts are also used in CircleCI to build test, and deploy the app.

```jsx
 "scripts"
:
{
    "dev"
:
    "next",
        "build"
:
    "next build",
        "start-local"
:
    "next start",
        "start"
:
    "NODE_ENV=production node server.js",
        "lint"
:
    "next lint",
        "test"
:
    "jest --watchAll=false",
        "prettier:fix"
:
    "prettier --write  \"{lib, component, pages}/**/*.ts\""
}
,
```

**dev**: start the next in development mode, that means every load in the page the page will be built.

**build:** build the production app

**start:** start the server for production

**start-local:** start the server when testing it locally

**lint:** Check the linter of the project

**prettier:** Another linter to verify that the files are well formatted

**test:** Run all unit tests

## 👩‍👦 Dependencies

---

As mentioned above, we are using as a base

- Next.js [http://nextjs.org](http://nextjs.org/)
- ChakraUi [https://chakra-ui.com](https://chakra-ui.com/)
- Sanity [https://www.sanity.io](https://www.sanity.io/)
- React [https://reactjs.org](https://reactjs.org/)

## 🔨 Other tools we used

---

- Zustand - State management -https://github.com/pmndrs/zustand
- i18n - Manage translations inside the app that are not on sanity
- Bugsnag - Error tracking
- Axios - Fetching library
- Jest and Prettier - Code quality

The rest are minor libs used for specifics components or as dependencies of the mentioned above.

Date collected: 12.Nov.14:43

```jsx
 "dependencies"
:
{
    "@bugsnag/js"
:
    "^7.11.0",
        "@bugsnag/plugin-react"
:
    "^7.11.0",
        "@chakra-ui/icons"
:
    "^1.0.17",
        "@chakra-ui/react"
:
    "^1.6.12",
        "@emotion/cache"
:
    "^11.5.0",
        "@emotion/react"
:
    "^11.5.0",
        "@emotion/server"
:
    "^11.4.0",
        "@emotion/styled"
:
    "^11.3.0",
        "@sanity/block-content-to-react"
:
    "^3.0.0",
        "@sanity/client"
:
    "^2.13.0",
        "@sanity/image-url"
:
    "^1.0.1",
        "axios"
:
    "^0.21.1",
        "date-fns"
:
    "^2.23.0",
        "email-validator"
:
    "^2.0.4",
        "eslint-plugin-prettier"
:
    "^3.4.0",
        "express"
:
    "^4.17.1",
        "framer-motion"
:
    "^5.2.1",
        "heroku-ssl-redirect"
:
    "^0.1.1",
        "i18n-js"
:
    "^3.8.0",
        "next"
:
    "^12.0.3",
        "next-sanity"
:
    "^0.4.0",
        "query-string"
:
    "^7.0.1",
        "react"
:
    "^17.0.2",
        "react-calendly"
:
    "^2.2.1",
        "react-dom"
:
    "^17.0.2",
        "react-elastic-carousel"
:
    "^0.11.5",
        "react-lottie"
:
    "^1.2.3",
        "react-spring-3d-carousel"
:
    "^1.2.1",
        "react-tiny-popover"
:
    "^7.0.1",
        "react-use-intercom"
:
    "^1.4.0",
        "sharp"
:
    "^0.29.1",
        "styled-components"
:
    "^5.3.3",
        "ts-node"
:
    "^10.3.0",
        "typescript"
:
    "^4.3.5",
        "uuidv4"
:
    "^6.2.11",
        "zustand"
:
    "^3.5.7"
}
,
"devDependencies"
:
{
    "@testing-library/dom"
:
    "^8.1.0",
        "@testing-library/jest-dom"
:
    "^5.14.1",
        "@testing-library/react"
:
    "^12.0.0",
        "@types/babel__generator"
:
    "^7.6.3",
        "@types/jest"
:
    "^26.0.24",
        "@types/node"
:
    "^16.3.3",
        "@types/react"
:
    "^17.0.14",
        "@typescript-eslint/eslint-plugin"
:
    "^4.28.3",
        "@typescript-eslint/parser"
:
    "^4.28.3",
        "babel-jest"
:
    "^27.0.6",
        "eslint"
:
    "^7.31.0",
        "eslint-config-next"
:
    "^11.0.1",
        "eslint-config-prettier"
:
    "^8.3.0",
        "eslint-plugin-import"
:
    "^2.23.4",
        "eslint-plugin-jsx-a11y"
:
    "^6.4.1",
        "jest"
:
    "^27.0.6",
        "jest-dom"
:
    "^4.0.0",
        "prettier"
:
    "^2.3.2"
}
,
```

# SANITY

## 🗂 Folder structure

---

Referring to the sanity default docs,

**SCRIPTS**

```jsx
"scripts"
:
{
    "start"
:
    "sanity start",
        "build"
:
    "sanity build"
}
,
```

**DEPENDENCIES**

Mostly are base sanity default dependencies

S**lugify**

to generate slugs for the pages

"scripts": {
"start": "sanity start",
"build": "sanity build"
},

```jsx
 "dependencies"
:
{
    "@sanity/base"
:
    "^2.18.0",
        "@sanity/cli"
:
    "^2.18.0",
        "@sanity/components"
:
    "^2.14.0",
        "@sanity/core"
:
    "^2.18.0",
        "@sanity/default-layout"
:
    "^2.18.0",
        "@sanity/default-login"
:
    "^2.18.0",
        "@sanity/desk-tool"
:
    "^2.18.0",
        "@sanity/production-preview"
:
    "^2.15.0",
        "@sanity/vision"
:
    "^2.17.2",
        "prop-types"
:
    "^15.7",
        "react"
:
    "^17.0",
        "react-dom"
:
    "^17.0",
        "sanity-plugin-conditional-field"
:
    "^1.0.0",
        "sanity-plugin-dark-theme-blue"
:
    "^1.0.1",
        "sanity-plugin-intl-input"
:
    "^5.2.1",
        "sanity-plugin-media"
:
    "^1.3.1",
        "sanity-plugin-seo-pane"
:
    "^1.2.2",
        "slugify"
:
    "^1.6.0"
}
```

## Adding new content modules

When we want to map a new content module, that was defined in sanity, we can follow these steps:
Important: Follow the naming consistency.

1. Map the data coming from sanity inside contentModule. Use the type of the content coming from sanity
   /domain/contentModule.ts

2. Create a class that extends from BaseModule and add all the desired fields and map it properly inside the query
   contentModules. Use this class for specific domain logic. lib/shared-domain/page/domain/contentModule.ts
   (Ensure to pass propertly all the props needed sync with sanity any prop handled unpropertly will trigger in a undefined value)

3. Update reference if there are images, with name that are not mapped yet in
   lib/shared-domain/page/infrastructure/page.facade.ts. We have to update. This is because of the references. The same
   issue can happen when we have ref.

4. Map class module to component her elib/shared-domain/page/presentation/contentModules/index.tsx
5. Create the component
