# Front End North

[![Greenkeeper badge](https://badges.greenkeeper.io/frontendnorth/fen.svg)](https://greenkeeper.io/)

The Front End North website.

## Developer Environment

Uses Unix commands, may not work on Windows machines (#TODO: fix).

### Prerequisites

* A GitHub account with push access to this repository.
* A Linux/MacOS computer.
* NPM installed locally.

### Set up

1. Clone the respository on your computer by running `git clone git@github.com:frontendnorth/fen.git`.
2. In the project root, run `npm install`.
3. Run `npm run dev` to watch for changes and start a local environment.
4. View your environment on on `http://localhost:1234/`

## Hosting

Staging and Production are hosted on Firebase:

* Production: 
  * Site: https://www.frontendnorth.com/ 
  * Firebase console: https://console.firebase.google.com/u/0/project/fen-production/hosting/main
* Staging: 
  * Site: https://fen-staging.web.app/
  * Firebase console: https://console.firebase.google.com/u/0/project/fen-staging/hosting/main

To deploy you will need:

* Firebase tools installed: `npm install -g firebase-tools`
* then to login to Firebase `firebase login`

Note that the deploy commands build and deploys from your *current branch*, not what's pushed to github, so make sure it's in the correct state before deploying.

### Deploying to production

To deploy the *current branch* do `npm run deploy-production`

### Deploying to staging (https://fen-staging.firebaseapp.com/)

To deploy the *current branch* do `npm run deploy-staging`
