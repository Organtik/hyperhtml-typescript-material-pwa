# hyperhtml-typescript-material-pwa
HyperHTML, web component, typescript, material, pwa series

*Note: Webpack is not required for much of what we're doing here but it is far easier to pull webpack out than to ignore it till the end.  Thus its included as a foundational step in this walkthru.*

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
"dev-windows": "webpack-dev-server --config ./webpack/dev-windows.js --pfx=./dev-only-certs/localhost.pfx --pfx-passphrase=LocalhostPass",
```

## Transpliers (Typescript & SASS) + Webpack
Transpiling is another tool in our quiver.  In this walkthru we have Typescript and SASS that allow us to provide structure when we want and enforce a few high level conventions that enable more tools down the line.  Necessary?  Absolutely not. Useful for distributed, faster understanding and less error prone delivery? Absolutely, but they arent without their own pain.

### Typescript

# Typescript - Libraries
- typescript + tsconfig.json - fundamental
- tslint + tsconfig.json - linting to assist the development experience
- awesome-typescript-loader - enable typescript for webpack

#### Typescript & Webpack
Resolve the extension in ```webpack common.js```
```
module.exports = {
  ...
  resolve: {
    extensions: ['.js', '.ts', '.html']
  },
```

Add the loader
```
module.exports = {
  module: {
    rules: [
      {
        test: /.ts$/,
        use: ['awesome-typescript-loader']
      }
    ]
  }
```

#### Declare Typings
Define file types that you expect to import that Typescript doesnt necessarily recognize such as ```scss```
```/src/typings.d.ts```
```
declare module "*.scss" {
    const content: any;
    export default content;
}
```

#### Config
Configure typescript to produce ES2016 compatible javascript with Node styles modules and module resolution.
```tsconfig.json```
```
{
    "compilerOptions": {
        "target": "ES2016",
        "module": "ES2015",
        "moduleResolution": "Node",
        "allowSyntheticDefaultImports": true
    }
}
```

#### Linting
<Coming>


### SASS
There are plenty of tutorials out there for generic SCSS handling however we're going to be focused on web components with shadow dom.  This creates a very different pathway requiring transpiling to a string of css and then importation.

#### Transpile SCSS and Import As String
Above we've created the typing but with this setup we can now perform the following:
```
import * as style from './index.scss'
```
This enables it to be embedded within a web component as a variable.  More on this soon.

#### Config
<Coming soon: inclusion/exclusion>

```
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.scss$/,
        use: [
          'exports-loader?module.exports.toString()',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: ['./node_modules']
            }
          }
        ]
      ...
```

## Progressive Web App
Aspects of Prorgessive Web Apps are beneficial even if not implementing a full implementation.  For full implementations the most fully functional set of libraries is provided as part of [Workbox](https://developers.google.com/web/tools/workbox/)

### Manifest.json
Theme/background/icons, android temp splash screen

### Service Worker
Temporary empty static js placeholder

### Index.html updates
Viewport
Backup images
Service Worker

## Webcomponents and HyperHtml
Time to get to get more opinionated in both technology and mindset.  WebComponents have been around since 2011, enabling or extending HTML tags to encapsulate html, css and javascript in `reusable` modules/widgets.

Hyperhtml is a library that performs much of what what ReactJS was able to do but without a virtual dom and while also being DOM and ECMAScript compliant (ie no need for another language to learn and other toolsets).  This is possible due to template literals and the brilliance of its author [Andrea Giammarchi](https://twitter.com/WebReflection).  On a fun note, this library is updated faster when browsers change and break the functionality than both react and polymer, so no one can say its "not supported".

Now for the quick cons:
- Webcomponents despite all their promise have yet to be fully adopted by browers but we have polyfills.
- Fundamental aspects of every program ever is input, output and the logic inbetween.  Webcomponents have forgotten this (for valid reasons due to existing specifications/conforming/etc).  Closest you'll ever get to native handling of input and output are attributes and events.  No real standard or convention we can count on.  Thus, the rise of frameworks such as Polymer which made inputs and outputs first class citizens.  (P.S. Polymer is dead as stated by the authors themselves, lit-html/LitElement are the future).  Yet hyperhtml is more complete, more compatible, faster and if only the community would agree, we'd likely have a standard of communication to work with.
- Hyperhtml has a relatively small group of elite developers supporting it.  Real world examples, compatibility, etc is extremely sparse.  Expect questions to be answered by a top 1% developer and only understandable by the top 5%, just take a look at the issues/feedback/articles etc and you'll see what I mean ;)

So welcome to the focus of this walkthrough:
`Demonstrate hyperhtml via web components, import modern design metaphors such as material io with relatively native handling of communication and services.`

### Shadow Dom Shell
```<organtik-app>``` is the shell component and foundation.
