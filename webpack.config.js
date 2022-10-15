const path = require('path');
const webpack = require('webpack');

const ESLintPlugin = require('eslint-config-prettier');

let performanceOptions =
{
};

let devServerOptions =
{
   //stats: {
      // Enables disables colors on the console
   //   colors: true,

      // Tells stats whether to display the --env information.
      //env: true,

      // Tells stats whether to display the errors.
      //errors: true,

      // Tells stats whether to add the details to the errors.
      //errorDetails: true,

      // Tells stats whether to show stack trace of errors.
      //errorStack: true,

      // Tells stats weather to add logging information
      // 'info': 'none' | 'error' | 'warn' | 'info' | 'log' | 'verbose'
      //logging: 'verbose',

      // Tells stats to add information about the webpack version used.
      //version: true
   //},
   // Tell the server where to serve content from (Static files only).
   // It is recommended to use an absolute path.
   // contentBase: path.join(__dirname, 'dist'),

   // The bundled files will be available in the browser under this path.
   // Make sure devServer.publicPath always starts and ends with a forward slash.
   // publicPath: '/dist/',

   // serves everything from our dist directory in the project root:
   static: {
      directory: path.join(__dirname, 'dist'),
      watch: true
   },

   // The filename that is considered the index file.
   //index: 'index.html',

   // The server type( default is http)
   server: 'http',

   // Enable gzip compression for everything served:
   compress: false,

   // Specify a port number to listen for requests on.
   port: 9000,

   // Specify a host to use. If you want your server to be
   // accessible externally, specify it like this:
   // Default is 'localhost'.
   host: 'localhost',

   // This option allows you to whitelist services that are
   // allowed to access the dev server.
   //allowedHosts: [
   //   '192.168.2.*',
   //   '192.168.2.',
   //],

   // Enables/Disables colors on the console
   // Available on cli only --color
   // color: true,

   // Tell dev-server to watch the files served by the devServer.contentBase option.
   // It is disabled by default. When enabled, file changes will trigger a full page reload.
   // Not in v4
   //watchContentBase: true,

   // Control options related to watching the files.
   // webpack-dev-server uses the file system to get notified of file changes.
   // Now on by default.
   //watchOptions: {
      // Set to 5 seconds
      //   poll: 5000
   //},

   // By default, the dev-server will reload/refresh the page when file changes are detected.
   // devServer.hot option must be disabled or devServer.watchContentBase option must be enabled
   // in order for liveReload to take effect.
   liveReload: true,

   // Enable webpack's Hot Module Replacement feature:
   // Note: requires a lot of other stuff too in index.html ...
   hot: false,

   onListening: function(devServer)
   {
      if ( !devServer )
        throw new Error( 'webpack-dev-server is not defined' );

      const port = devServer.server.address().port;
      console.log( 'Listening on port:', port );
   },

   devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath: 'dist',
      serverSideRender: true,
      writeToDisk: true,
    },

   // Tells dev-server to open the browser after server had been started.
   //open: { },

   // Specify a page to navigate to when opening the browser.
   // So that all the examples work.
   //
   // Note: We allow this to be changed via argv.openPage='<fn>'
   //       which is stupid because we can just use --openPage.
   //       However I confused it with devServer.index which
   //       cannot be set via cli. Why the two is beyond me?
   //openPage: 'index.html'
   open: [ "index.html" ]
};
let webpackOptions =
{
   // Since this is processed as a command line option (because of argv...)
   // the mode must be set so that it can be returned as part of the big
   // config entry.
   mode: "production",

   performance: performanceOptions,

   entry: './src/index.ts',
   output: {
      // Default in webpack V5
      //path: path.resolve(__dirname, 'dist'),
      filename: 'pixi_ui.js',
      // The library name means you would access it via pixi-ui.button.
      library: 'pixi_ui',

      // Add vitual path for generating the bundle files
      publicPath: 'dist',

      // Turn off pathInfo, increasing build time
      pathinfo: false,
   },


   devServer: devServerOptions,

   plugins: [
      // Too messy, deal with later
      // new ESLintPlugin({
      //    files: ['./app/partKart/**/*.ts',
      //            './app/src/*.ts'
      //           ]
      // }),

      // Add a plugins section to your webpack.config.js to let
      // know Webpack that the global PIXI variable make reference
      // to pixi.js module. For instance:
      new webpack.ProvidePlugin({
         PIXI: 'pixi.js'
      })
   ],

   //Default
   target: 'web',
   externals: {"pixi.js": "PIXI",
               "fs": "require('fs')" },
   resolve: {
      // Add '.ts' as resolvable extensions.
      extensions: [".ts", ".js"],
      alias: {
         $: "jquery/src/jquery",
      }
   },
   optimization: {
      minimize: false,
   },

   // Enable sourcemaps for debugging webpack's output.
   // // devtool: "source-map" // without any, there is no sourcemap
   //devtool: "eval"  // none
   devtool: "source-map", // one big blob
   //devtool: "eval-source-map"  // none

   module:
   {
      rules: [
         {
            test: /\.js$/,
            include: [path.resolve(__dirname, "src")],
            exclude: [
               // This would be a regular expression
               /node_modules/,
               // This would be a path
               // Omit stuff to be worked on
               '/test/somepath/'      // Omit all test/somepath
            ],
            use: {
               loader: 'babel-loader',
               // Note. Do not put other compile options here !!!
               // ts-loader or babel-loader may override them.
               // i.e ts-loader listFiles: true or
               //     ts-loader outdir: 'js'
            }
         },
         {
            test: /\.ts$/,
            include: [path.resolve(__dirname, "src"),
                      path.resolve(__dirname, "test/src")],
            exclude: [
               // This would be a regular expression
               /node_modules/
               // This would be a path
               // Omit stuff to be worked on
            ],
            use: {
               loader: "ts-loader",
               // Note. Do not other put compile options here !!!
               // ts-loader or babel-loader may override them.
               // i.e ts-loader listFiles: true or
               //     ts-loader outdir: 'js'
               options: {
                  transpileOnly: true,
                  experimentalWatchApi: true,
               },
            }
         }
      ]
   }
};

module.exports = (env, argv) =>
{
   console.log("Not bundling pixi.js");

   webpackOptions.watchOptions = {
      // Add a delay before rebuilding once the first file changed
      aggregateTimeout:  600,
      poll: 5000
   };

   // The default 'mode' to use.
   webpackOptions.mode='production';

   if ( argv )
   {
      //const r = Object.keys(argv);
      //console.log("argv = " + r);
      //console.log("argv.mode = " + argv.mode );

      if ( argv.mode === undefined || argv.mode === 'development' )
      {
         // Since this is processed as a command line option
         // (because of argv...) the mode must be set so that it
         // can be returned as part of the big config entry.
         webpackOptions.mode='development';
         webpackOptions.performance = {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
         };
      }
      else if ( argv.mode === 'production' )
      {
         // For now
         // Will minify later ...
         webpackOptions.performance = {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
         };

      } else
         throw new Error('unhandled mode:' + argv.mode);

   }

   //const util = require('util')
   //console.log(util.inspect(webpackOptions, {showHidden: false, depth: null, colors: true}));

   return webpackOptions;
};
