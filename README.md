# zconnect-web
Library of React web components for zconnect front end

## Folder structure

- `/containers` - store connected components that depend on the api or auth logic contained in zconnect-js to fetch and store the data they need
- `/components` - 'dumb'/view components that just take props. (This does include the redux-form Field components that require a parent decorated with reduxForm to work)
- `/hocs` - Higher order components for decorating wrapped components with extra functionality

## Usage

The library has a few peerDependencies including [zconnect-js](https://github.com/zconnect-iot/zconnect-js), react, redux etc.

It also requires `~theme/variables.scss` to resolve a scss file in which the scss globals defined [here](theme/globals.scss) are available. This can be done with webpack alias. More details in Styling section.

Finally in order for `sass-vars-to-js` loader to work so that the components can import sass vars as js, the `NODE_PATH` env var must be set to the project root directory e.g. `NODE_PATH=$PWD webpack-dev-server`

For example usage see [zconnect-web-template](https://github.com/zconnect-iot/zconnect-web-template)

## Page context

In order to decouple the components from any particular routing library, a `navigate` function should be passed down to `Page` which passes it down to naviagation components (`Button` and `Link`) via context.

This means that for either component to work they must be mounted within a top level `Page`. Outside of `Page`, `SimpleButton` and `SimpleLink` are provided which do not depend on context.

## Development

`zc-core` must be available at `../zconnect-js`.

`npm i`

`npm run storybook` - storybook development is best suited to the non-store-connected components

`npm run test` - Using `redux-mock-store` with the basic store shape provided in `testSetup` it's possible to test the store connected components


## Styling

#### Default theme
The theme in `src/theme` provides the minimum required for the default zconnect theme. The consuming project would need to ensure `~/theme/variables` resolves to this folder.

#### Custom theme
The theme folder can be copied into the consuming project and made available at `~theme/variables.scss`. The SASS vars listed in colors.scss and globals.scss can then be changed but they must be defined or the components will throw undefined variable errors.

#### Fine-grained changes

- Component styles can be overridden by setting their local SCSS variables (which have been defined with `!default` flag)
- Using the class names provided on many components and setting a global rule. Where possible the [BEM](https://en.bem.info/methodology/) naming convention has been used for explicit CSS classes e.g. `ActivityStream__Activity` or `Button--disabled`
- Passing a `className` prop to most components which will be set last in the list for easy over riding of inherited styles
