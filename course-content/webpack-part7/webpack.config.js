const path = require('path')
const webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/build/index.html',
  filename: 'index.html',
  inject: 'body'
})

// const config = {
//   entry: ['@babel/polyfill/noConflict', './src/index.js'],
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'main.js',
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, 'build'),
//     compress: true,
//     port: 3000,
//   },
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-react', '@babel/preset-env'],
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ]
//   },
//   plugins: [ HTMLWebpackPluginConfig ]
// }

const config = ( env, argv ) => {
  console.log('argv', argv.mode)

  const backend_url = argv.mode === 'production'
    //? 'https://blooming-atoll-75500.herokuapp.com/api/notes' commented out b/c this page doesn't load/work
    ? 'http://localhost:3001/notes'
    : 'http://localhost:3001/notes'

  return {
    entry: ['@babel/polyfill/noConflict', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
    plugins: [ 
      HTMLWebpackPluginConfig,
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

module.exports = config