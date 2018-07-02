# hyperhtml-typescript-material-pwa
HyperHTML, web component, typescript, material, pwa series

## Initial Devlopment Dependencies Webpack
Starting with a relatively simple but complete webpack based development environment.

Webpack configurations broken into common and development for encapsulation and webpack dev server needs.  Production build TBC.

### Dependencies
- webpack, webpack-cli
- webpack-dev-server
- webpack-merge
- clean-webpack-plugin
- html-webpack-plugin

### NPM local hosting via webpack-dev-server
```
npm run develop
```
### Webpack Configuration
Configurations are split between common and development (hosting)

## IDEs
We've found it helpful to provide initial configurations for various IDEs to overcome some of the defaults and plugins you may or may not have.

### Visual Studio Code 
It goes without saying that many of these extensions may be installed via npm and run manually
Helpful Extensions
*Debugger for Chrome - Know it, love it
*Literally-html - Template string syntax highlighting for Typescript/Javascript.
*ESLint - linter support

#### Debugger for Chrome Configuration
Visual studio + Chrome Debugging's source map defaults do not include src.  Without the below or a change in structure you will encounter source map debugging offset issues.
```
"sourceMapPathOverrides": {
    "webpack:///./src/*": "${webRoot}/*"
},
```
