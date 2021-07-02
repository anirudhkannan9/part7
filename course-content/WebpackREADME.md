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





## Configuration file

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

