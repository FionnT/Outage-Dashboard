# node-react-app

The front-end file structure and build configuration is based on the [create-react-app](https://github.com/facebook/create-react-app) boilerplate, see the [create-react-app README](https://github.com/facebook/create-react-app) for details on customization.

## Getting started

### Setting up your development environment

Make sure that you've installed Node.js 

### Developing your app

Update configurations in the following files: 

```
$ ./server/helpers/slack-bot/index.js
$ ./server/helpers/db-connect.js
$ ./server/helpers/send-alert-email.js
$ ./src/data/[all files and folders]

```

Start a local dev server by running the following command:

```

$ yarn start

```

This will open `localhost:3000` in your browser and begin serving your app with live-reloading enabled.

## Features

### Webpack config and build system

Has the batteries-included modern JS build system from [create-react-app](https://github.com/facebook/create-react-app) with a few extra defaults:

- A production build is placed in the `built/` directory to avoid name conflicts with other internal tools
- Chunk inlining is disabled to adhere to a stricter content security policy.
- Uses a local .eslintrc file for linting rules if one exists.

### create-react-app file structure

`public/` contains your root `index.html`.

`src/` is the primary front-end working directory and contains a few basic React components and stylesheets to get you started (the Express server is in `src/`).

### Default Express configuration

The server serves the files in `built/` statically by default, and disables client-side caching. If it doesn't recognize a path, it will serve up `index.html` so that client-side routing works.

The server listens on `localhost` only by default, with the expectation that you'll use Apache as a proxy. If you want to access the app directly on port 7101, remove the `"localhost"` argument from `app.listen()` in `server/index.js`.

### nodemon

The `start` command will run the server through [nodemon](https://nodemon.io/) so that it automatically restarts when you make changes during local development.

### Modifying the eslint rules

By default, this app uses [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app) for its linting rules. If you're getting warnings you don't want (or aren't getting warnings you do want), you can override that default configuration with the `.eslintrc` file in the project root:

```js
{
    "extends": "react-app",
    "rules": {
        // your customizations here
    }
}
```

### npm vs. yarn

The default commands use `yarn` instead of `npm` to run scripts, and the repo includes a starting `yarn.lock` file. You shouldn't see a difference from using `yarn` vs. `npm`, but beware that using `npm` instead of `yarn`, or mixing a `package-lock.json` and a `yarn.lock` file together could result in unpredictable versions of your dependencies.

[Read more about lockfiles](https://yarnpkg.com/blog/2016/11/24/lockfiles-for-all/)
