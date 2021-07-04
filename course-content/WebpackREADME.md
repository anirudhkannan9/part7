# Webpack

Summary of content from: https://fullstackopen.com/en/part7/webpack

Create-react-app is as a 'black box' that makes React apps work. Let's look at a key tool in aiding this process: webpack.

## Bundling

We write our code in modules to make it easy to read, write, and maintain. (Old) browsers don't know how to interact with modular code, so we must bundle it into one file. 

Bundling serves several purposes:
- Allow the browser to read and execute our code
- Improve performance by cutting down on overhead that might arise from needing to import/use several files concurrently
- Give the browser a 'starting point' (typically *index.js*) from which to execute our code. _index.js_'s imports are imported (recursively)

Bundling is done with webpack (a module bundler). 

The result of bundling (e.g. via `npm run build`) is to create a directory with the following contents: 
<img width="970" alt="Screenshot 2021-07-02 at 3 32 34 PM" src="https://user-images.githubusercontent.com/47587789/124334034-ba06c200-db4a-11eb-8188-4715d08f816e.png">

_index.html_ - the 'main file' of the directory - loads and uses (as scripts) 2 bundled JS files (_static/js/1.578f4ea1.chunk.js_ and _static/js/main.8209a8f2.chunk.js_), and a CSS file (_static/css/main.f9a47af2.chunk.css_) that contains all of the application's CSS. 

Running `npm run build` creates a JS file (bundling our application's code) at a location we've specified. In our case, the command produces a _main.js_ file under the _build_ directory, as specified in our _webpack.config.js_ file in our project's root. 

## Configuration file

Our _webpack.config.js_ file has the following contents:
<img width="892" alt="Screenshot 2021-07-02 at 8 37 44 PM" src="https://user-images.githubusercontent.com/47587789/124341990-5ba30900-db75-11eb-99d2-6440677d4b82.png">

The file is written in JS and the config object is exported according to the Node module syntax. 

The _entry_ property specifies the file that serves as the entry point for bundling. Everything that this entry file imports will be acknowledged and bundled by webpack upon running `npm run build`. Given the contents of our _index.js_ file: 
<img width="369" alt="Screenshot 2021-07-02 at 8 41 28 PM" src="https://user-images.githubusercontent.com/47587789/124342060-e1bf4f80-db75-11eb-8bd8-a5b98ea3e44c.png">

We can expect _index.js_ and _App.js_ to be bundled accordingly: <img width="405" alt="Screenshot 2021-07-02 at 8 42 29 PM" src="https://user-images.githubusercontent.com/47587789/124342079-05829580-db76-11eb-87b0-e561919def0d.png">

If we comment out lines 1 and 5, we would expect only _index.js_ to be bundled; App.js wouldn't be included in the bundled _main.js_ file that `npm run build` creates: <img width="347" alt="Screenshot 2021-07-02 at 8 43 36 PM" src="https://user-images.githubusercontent.com/47587789/124342096-2ea32600-db76-11eb-901a-57207ce3e008.png">
<img width="398" alt="Screenshot 2021-07-02 at 8 43 48 PM" src="https://user-images.githubusercontent.com/47587789/124342098-34990700-db76-11eb-9cee-f1bd83242915.png">

The _output_ property specifies where the resulting bundled file will be created. The target directory must be an absolute path, which we use _path.resolve_ to create. *__dirname* is a global variable storing the path to the current directory.


## Bundling React

We import React and add the required definitions in order to make the app a React app. Upon bundling it, we're met with the following error: 

![21](https://user-images.githubusercontent.com/47587789/124398961-5789ff00-dccd-11eb-9285-3df9d1061989.png)

## Loaders

This error arises because we define React components (such as the App component) using JSX, not JS:

<img width="217" alt="Screenshot 2021-07-04 at 1 41 49 PM" src="https://user-images.githubusercontent.com/47587789/124398997-96b85000-dccd-11eb-8e2c-60208d2aee50.png">

Webpack can only deal with JS, so we need to add loaders to instruct Webpack to process the files containing JSX (transform JSX into JS) before they can be bundled:

<img width="405" alt="Screenshot 2021-07-04 at 1 42 53 PM" src="https://user-images.githubusercontent.com/47587789/124399024-bc455980-dccd-11eb-8b3f-5b2ff08d63f1.png">

The above loader configuration specifies that the babel-loader will process all files ending in _.js_. The _options_ property can be used to specify behaviour; in this case we use the set of plugins used to support React/JSX. 

Upon bundling, we observe that the App component is bundled as such:

<img width="732" alt="Screenshot 2021-07-04 at 1 45 28 PM" src="https://user-images.githubusercontent.com/47587789/124399083-19410f80-dcce-11eb-8b1d-a83b8f79a885.png">

We can see that the loader has transformed the JSX defining the App component into JS. Our application now uses the JS _createElement_ method to define the component that was previously defined in JSX. 

## Transpilers

We used babel to transpile our code from JSX to JS. Transpilation is the process of compiling code by transforming it from one language to another. We used presets (a set of plugins) to do so, as is typical. 

Most browsers can only handle up till JS' ES5 standard. So let's take a set of presets into use that will transpile our 'modern' code into code compatible with the JS ES5 standard. We run `npm install @babel/preset-env --save-dev` to install the @babel/preset-env plugin that will help with this. We then take it into use: 

<img width="478" alt="Screenshot 2021-07-04 at 2 16 56 PM" src="https://user-images.githubusercontent.com/47587789/124399765-7e96ff80-dcd2-11eb-86cd-cee4546eb661.png">

Our app component is now defined with older syntax (`var` instead of `const`, `function` instead of the arrow function syntax) that is compatible with the ES5 standard: 

<img width="845" alt="Screenshot 2021-07-04 at 2 18 29 PM" src="https://user-images.githubusercontent.com/47587789/124399788-b605ac00-dcd2-11eb-9297-21f5a7809eda.png">


## CSS

## Webpack-dev-server

## Source maps

## Minifying the code

## Development and production configuration 

## Polyfill

## Eject

## Exercises

