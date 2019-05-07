# Front End North

[![Greenkeeper badge](https://badges.greenkeeper.io/frontendnorth/fen.svg)](https://greenkeeper.io/)

The Front End North website.

## Developer Environment

Set up using [ParcelJS](https://parceljs.org/).

### Prerequisites

* A GitHub account with push access to this repository.
* NPM installed locally.

### Set up

1. Clone the respository on your computer by running `git clone git@github.com:frontendnorth/fen.git`.
2. In the project root, run `npm install`.
3. Run `npm run dev` to watch for changes and start a local environment.
4. View your environment on on `http://localhost:1234/`

### Deploying to production

The GH pages site uses the docs folder.

Run `npm run build` and commit the docs folder before merging your branch to master.

### Deploying to staging (https://fen-staging.firebaseapp.com/)

You will need Firebase tools installed: `npm install -g firebase-tools`

and then to login to Firebase `firebase login`

To deploy the *current branch* do `npm run deploy-staging`