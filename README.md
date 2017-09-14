# zconnect-web
Components and sample project for zconnect projects.

This project contains the following;

-   a set of components for building zconnect apps (see `widgets/`,
    `components/` and `containers/`);
-   a demo application built using the above in `src/` providing base scss theme in `src/style/theme` which can be used to change the component styles


## Demo project quick start
### Dependencies

    git submodule update --init --recursive
    npm install

### <a name="faking-auth"></a>Faking auth
Open up `src/modules/zconnect-js/auth/reducer.js` and set a `userId` and
`email`. Then:

    npm start


## Dependent projects quick start
### Dependencies
You'll probably need to install this as a git submodule since it has its own
submodules. For example, put

    "zc-web": "src/modules/zconnect-web"

in your `package.json` and install the submodule to `src/modules/zconnect-web`.

### Auth
Probably you'll also need to follow the instructions from the [faking
auth](faking-auth) section above.

### Styles
#### Replacing the theme
A basic theme (used in the demo) is provided in `src/styles/theme`, and can be
imported using e.g. `@import '~theme/constants.scss'`. The location of these
imports is determined by a `resolve` alias in `webpack.config.js`. Dependent
apps can write their own theme to replace the current one by simply writing
their own alias.

#### Fine-grained changes
Other styles can be overridden by using the explicit class names provided on
many components. Where possible the [BEM](https://en.bem.info/methodology/)
naming convention has been used for explicit CSS classes in addition to the
SASS imports.
