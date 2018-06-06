# Important

The styles defined here are needed by the components however it's up to the containing project to make them available to the components via webpack.

`zconnect-web-template` demos how this is done in webpack. Essentially the whole `/theme` folder is copy pasta'd into the consuming project and an alias is set up so that `@import ~theme/` resolves to the correct location. This allows changing the global variables to theme the components.

This means components can only reliably use the variables described in globals.scss.

The specific component variables can be changed by over riding them in the parent project so that the !defaults are only used if that var has not been set in the parent.
