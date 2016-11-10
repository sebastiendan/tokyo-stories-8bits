var webpack = require('webpack');
var merge = require('webpack-merge');
var validate = require('webpack-validator');
var parts = require('./webpack.parts');
const pkg = require('./package.json');

const common = {
  context: __dirname + '/src',
  entry: {
    app: './start.ts',
  },
  output: {
    filename: '[name].js',
    publicPath: 'dist/',
    path: 'dist'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    //        new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      mangle: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "autoprefixer-loader?{browsers:['last 2 version']}", "sass"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(wav|mp3)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=sounds/[hash].[ext]'
        ]
      },
      {
        test: require.resolve("jquery"),
        loader: "expose?$!expose?jQuery"
      }
    ]
  }
}

  // Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
    case 'build':
    case 'watch':
        config = merge(
            common,
            parts.clean('dist'),
            parts.extractBundle({
                name: 'vendor',
                entries: Object.keys(pkg.dependencies)
            })
        );
        break;
}

module.exports = validate(config);
