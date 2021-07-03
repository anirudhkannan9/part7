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

The _output_ property specifies where the resulting bundled file will be created. The target directory must be an _absolute path_, which we use _path.resolve_ to create. *__dirname* is a global variable storing the path to the current directory.



## Bundling React

## Loaders

## Transpilers

## CSS

## Webpack-dev-server

## Source maps

## Minifying the code

## Development and production configuration 

## Polyfill

## Eject

## Exercises

