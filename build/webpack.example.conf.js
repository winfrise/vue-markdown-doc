const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

function resolve (dir) {
    return path.join(__dirname, '../example', dir)
}

const exampleConfig = {
    context: resolve('./'),
    mode: 'development',
    entry: {
        app: ['./main.js']
    },
    output: {
        path: resolve('./dist'),
        filename: '[name].js',
        clean: true
    },
    devtool: 'source-map',
    devServer: {
        static: resolve('./public'), // 默认值就是项目根目录
        host: 'localhost',
        port: 3000
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            use: ['vue-loader']
          },
          {
            test: /\.js$/,
            use: ['babel-loader']
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: process.env.NODE_ENV === 'development' ? 'static' : ''
            }
          },
          {
            test: /\.(scss|sass)$/,
            use: ['style-loader','css-loader', 'sass-loader']
          },
          {
            test: /\.css$/,
            use: ['style-loader','css-loader']
          },
          {
            test: /\.md$/,
            use: ['vue-loader', resolve('../src/loader/index.js')]
          }
        ]
      },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('./public/index.html')
        })
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue': 'vue/dist/vue.esm.js',
        '@': resolve('/example'),
      },
      fallback: { 
          "path": require.resolve("path-browserify"),
          "crypto": require.resolve("crypto-browserify"),
          "buffer": require.resolve("buffer/"),
          "stream": require.resolve("stream-browserify")
      }
    }
}

module.exports = exampleConfig