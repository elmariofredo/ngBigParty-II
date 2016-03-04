const webpack = require( 'webpack' );

const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const ENV = ( process.env.NODE_ENV || 'development' );

const webpackConfigEntryPoints = {
  app: './src/bootstrap.ts'
};

const webpackConfigLoaders = [

  // Scripts
  {
    test: /\.ts$/,
    exclude: [ /node_modules/ ],
    loader: 'ts-loader'
  },

  // Styles
  {
    test: /\.(scss)$/,
    loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
  },

  // Fonts
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },

  //Images
  {
    test: /\.(png|jpg)$/,
    loader: [ 'url-loader' ],
    query: { limit: 8192 }
  },

  //HTML
  {
    test: /\.html$/,
    loader: 'raw-loader'
  }

];

const webpackConfigPlugins = [

  new HtmlWebpackPlugin({
    title: 'Tombaugh Regio',
    template: 'src/index.ejs',
    env: ENV,
    host: '0.0.0.0',
    port: process.env.npm_package_config_port,
    googleAnalytics: {
      trackingId: 'UA-XXXX-XX'
    }
  }),

  new CopyWebpackPlugin([
    {
      from: 'src/assets',
      to: './'
    }
  ])

  // // Load lodash into global
  // new webpack.ProvidePlugin( {
  //   lodash: 'lodash'
  // } )

];


module.exports = {
  devtool: 'source-map',
  entry: webpackConfigEntryPoints,
  output: {
    path: '/',
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: [ '', '.webpack.js', '.web.js', '.ts', '.js' ]
  },
  watch: true,
  module: {
    loaders: webpackConfigLoaders
  },
  plugins: webpackConfigPlugins
};
