const path = require('path')
const webpack = require('webpack')
const hmtlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')  // css分离插件，不分离则css会打包在js文件中
const glob = require('glob')
const PurfiyCSSPlugin = require('purifycss-webpack') // 消除未使用的css代码插件
const copyWebpackPlugin = require('copy-webpack-plugin')

var website = {
  //publicPath：主要作用就是处理静态文件路径的
  publicPath: 'http://localhost:1717'
}

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    // entry: './src/entry.js',
    entry: ["babel-polyfill", './src/entry.js'],
    rukou: './src/entry2.js',
    jquery: 'jquery',
    vue: "vue"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: website.publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?sourceMap'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
        // use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use:[
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ],
          fallback: 'style-loader'
        })
        // use: [
        //   {
        //     loader: 'css-loader'
        //   },
        //   {
        //     loader: 'style-loader'
        //   },
        //   {
        //     loader: 'less-loader'
        //   }
        // ]
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader?sourceMap'
            },
            {
              loader: 'sass-loader?sourceMap'
            }
          ],
          fallback: 'style-loader'
        })
        // use: [
        //   {
        //     loader: 'style-loader'
        //   },
        //   {
        //     loader: 'css-loader'
        //   },
        //   {
        //     loader: 'sass-loader'
        //   }
        // ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: '/images'
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new hmtlPlugin({
      // 对html文件进行压缩
      minify: {
        // 去掉属性双引号
        removeAttributeQuotes: true
      },
      // 避免缓存js
      hash: true,
      // 要打包的html模版路径和文件名称
      template: './src/index.html'
    }),
    new extractTextPlugin('/css/index.css'),
    new PurfiyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    }),
    // 添加版权
    new webpack.BannerPlugin('zzh版权所以， ©️2019.5.22'),
    // 添加第三方库
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    // new webpack.optimize.splitChunks({
    //   name: 'jquery',
    //   minChunks: 2
    // }),
    new copyWebpackPlugin([
      {
        from: __dirname + '/src/public',
        to: './public'
      }
    ])
  ],
  // optimization: {
  //   splitChunks: {
  //       cacheGroups: {
  //           commons: {
  //               name: function() {
  //                 return ["jquery.min.js", "vue.min.js"]
  //               },
  //               chunks: "initial",
  //               minChunks: 2
  //           }
  //       }
  //   }
  // },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    compress: true,
    port: 1717
  }
}