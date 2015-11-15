// webpack.config.js

var path = require('path')

module.exports = {
  entry: './js/entrypoint.es6',
  output: {
    path: './build', // This is where images AND js will go
    publicPath: 'http://0.0.0.0:5000', // This is used to generate URLs to e.g. images
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  resolve: {
    root: path.resolve('./'), // allow js/... css/... plugins/... to resolve
    extensions: ['', '.js', '.es6']
  },
  module: {
    loaders: [
      { test: /\.es6$/, loader: 'babel-loader?presets[]=es2015' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  watchOptions: {
    poll: true
  }
}
