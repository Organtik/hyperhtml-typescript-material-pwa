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
- Debugger for Chrome - Know it, love it
- Literally-html - Template string syntax highlighting for Typescript/Javascript.
- ESLint - linter support

#### Debugger for Chrome Configuration
Visual studio + Chrome Debugging's source map defaults do not include src.  Without the below or a change in structure you will encounter source map debugging offset issues.
```
"sourceMapPathOverrides": {
    "webpack:///./src/*": "${webRoot}/*"
},
```

## OS handling and HTTPS
Advances in tooling and OSes have made development a much more unified experience than years past but it still has its quirks ranging from environment variables to certificates supported, etc etc.

Our example starts with enabling HTTPS (required for PWAs) with locally signed certificates.

### OS Specific configurations
Our current version does not require environment shell handling (yet), such as environment variables however if you do utilize them, [https://www.npmjs.com/package/cross-var] as a prebuild script is key.

Our example however does utilize PFX vs PEM certificates, so we've broken apart the webpack configurations for the dev server and have modified the package.json to utilize a command line specific to windows (due to current webpack dev server configuration issue).

### Certificates
To enable webpack dev server https, a certificate is required at a minumum. Webpack will generate its own if you dont specfy your own, localhost ones are also available in the ```dev-only-certs``` dir, but there is no substitute for creating your own that you can trust.

#### Enable Webpack dev server HTTPS
```
module.exports = merge(common, {
    mode: 'development',
    devServer: {
        https: true,
        ...
```

This will auto generate a pem for localhost.  Note that this certificate will not be added as a trusted by default, so while https now works you will receive security warnings and errors.

#### Generate your own
[Carlo van Wyk](https://twitter.com/thecarlowrote) wrote an excellent guide to create your own locally self signed certificates as well as embedding in your key stores.
[https://www.humankode.com/asp-net-core/develop-locally-with-https-self-signed-certificates-and-asp-net-core]

##### Trusted Store
Be sure to add the PEM or PFX or the like to your trusted stores to prevent Browser blocks and security warnings.

#### Configure to use your own
As of this writing webpack as known issues with pfx being specified in configurtions.
https://webpack.js.org/configuration/dev-server/

Passing via command line in ```package.json```
```    
"develop-windows": "webpack-dev-server --config ./webpack/dev-windows.js --pfx=./dev-only-certs/localhost.pfx --pfx-passphrase=LocalhostPass",
```