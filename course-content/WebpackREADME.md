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

We define some style rules in a new _src/index.css_ file: 

<img width="288" alt="Screenshot 2021-07-04 at 2 20 26 PM" src="https://user-images.githubusercontent.com/47587789/124399825-fb29de00-dcd2-11eb-9379-40703ab11e0b.png">

And bring the file into use in our _src/App.js_ file:

<img width="269" alt="Screenshot 2021-07-04 at 2 20 49 PM" src="https://user-images.githubusercontent.com/47587789/124399832-0977fa00-dcd3-11eb-959f-f3ecef7e860c.png">

This causes the transpilation process to break again:

<img width="1227" alt="Screenshot 2021-07-04 at 2 21 38 PM" src="https://user-images.githubusercontent.com/47587789/124399851-27ddf580-dcd3-11eb-8858-d302e79eb28a.png">


We know how to fix this -- we define new loaders to be used when handling such files. We first install the required loaders with `npm install style-loader css-loader --save-dev`. We then take the loaders into use in our _src/webpack.config.js_ file, as such: 

<img width="463" alt="Screenshot 2021-07-04 at 2 24 19 PM" src="https://user-images.githubusercontent.com/47587789/124399903-860ad880-dcd3-11eb-8c23-7ef8c31ead4d.png">

The css-loader loads _CSS_ files and the style-loader 'injects' a _style_ element that contains all of the application's styles. 

## Webpack-dev-server

So far we've ignored a problem that's screaming out to be solved -- our development workflow is incredibly clunky. Every time we make a change, we have to re-bundle the code and refresh the browser. 

We can solve this by adding a devServer configuration to our _webpack.config.js_ file; this configured a serve upon which our application runs that restarts every time we make a change. We first run `npm install --save-dev webpack-dev-server`. 

We add a script to our _package.json_ file that starts the dev-server.

<img width="333" alt="Screenshot 2021-07-04 at 5 34 51 PM" src="https://user-images.githubusercontent.com/47587789/124404069-25d56000-dcee-11eb-813f-5bf36e6a1f1e.png">

We then add a devServer configuration to our config file. The `npm start` command now starts the dev-server at port 3000 (our application is available at http://localhost:3000). 

## Source maps

We now have a barely functioning React app: 

https://user-images.githubusercontent.com/47587789/124408775-d007b480-dcfb-11eb-9bae-414f75442f2d.mov

Some of which is derived from our definition of the App component: 

<img width="379" alt="Screenshot 2021-07-04 at 7 13 05 PM" src="https://user-images.githubusercontent.com/47587789/124408796-dd24a380-dcfb-11eb-927f-fbfaece8e3c6.png">

But error messages are still inscrutable when tracked - they point to code that only barely resembles what we wrote: 

<img width="578" alt="Screenshot 2021-07-04 at 8 19 00 PM" src="https://user-images.githubusercontent.com/47587789/124413245-13b2ec00-dd05-11eb-96cf-363d0db07a96.png">

<img width="578" alt="Screenshot 2021-07-04 at 8 19 12 PM" src="https://user-images.githubusercontent.com/47587789/124413265-19a8cd00-dd05-11eb-8e85-fd7b1fbad3a0.png">

The error points to the bundled version of our code. If we want to point it to the source code, we need to ask webpack to generate a source map that maps the bundled code onto ours, such that e.g. error messages point to the code that we wrote: 

<img width="417" alt="Screenshot 2021-07-04 at 8 21 13 PM" src="https://user-images.githubusercontent.com/47587789/124413400-61c7ef80-dd05-11eb-9319-4e06836de6f3.png">

Now the error message points to code that we can recognize: 

<img width="428" alt="Screenshot 2021-07-04 at 8 21 30 PM" src="https://user-images.githubusercontent.com/47587789/124413415-6c828480-dd05-11eb-9d08-b9973a7ff946.png">

Allowing us to more easily fix the error.

## Minifying the code

Our current _main.js_ file isn't large in absolute terms, but having any bloat at all can hinder performance, especially for mobile users. Upon inspecting the file, we observe that much of it is superfluous e.g. comments. Instead of dealing with this manually, we can instruct webpack to bundle the code in production mode:

<img width="347" alt="Screenshot 2021-07-04 at 8 32 53 PM" src="https://user-images.githubusercontent.com/47587789/124414175-039c0c00-dd07-11eb-8d31-eff6e3ad6133.png">


At which point it will minify the code into a much smaller file (albeit a completely unreadable one) upon running `npm run build`:

<img width="1192" alt="Screenshot 2021-07-04 at 8 33 32 PM" src="https://user-images.githubusercontent.com/47587789/124414212-1a426300-dd07-11eb-8d83-f7eca6530832.png">

Note: the app broke AGAIN after making these changes. By 'broke' I mean the app and its components render, and I can click the button, but the counter doesn't increment. I was able to half-fix this by rewriting the index.html file so that it reads: 

<img width="492" alt="Screenshot 2021-07-04 at 8 43 43 PM" src="https://user-images.githubusercontent.com/47587789/124414925-870a2d00-dd08-11eb-855e-040e0062972c.png">

This means the app works if I open the _index.html_ file in Chrome, but the React app still doesn't work (merely renders). 


## Development and production configuration 

## Polyfill

## Eject

## Exercises

