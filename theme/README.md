# Important

The styles defined here, in particular the variables, are needed by the components however it's up to the containing project to make them available to the components via webpack.

`zconnect-web-template` demos how this is done in webpack. Essentially the whole `/theme` folder is copy pasta'd into the consuming project and an alias is set up so that `@import ~theme/` resolves to the correct location. This allows changing the global variables to theme the components.
