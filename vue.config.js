
const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/proto-taxi/' : '/',
  configureWebpack: {
    context: resolve(''),
    devServer: {
      compress: true,
      hot: true,
      // host: appConfig('local_domain'),
      // https: appConfig('local_https_enabled'),
      overlay: {
        warnings: false,
        errors: true
      }
    },
    entry: {
      app: './src/main.js'
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@api': resolve('src/api'),
        '@assets': resolve('src/assets'),
        images: resolve('src/assets/images'),
        '@components': resolve('src/components'),
        '@router': resolve('src/router'),
        '@store': resolve('src/store'),
        '@style': resolve('src/assets/style'),
        '@views': resolve('src/views')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        IS_DEVELOPMENT: !isProduction,
        IS_PRODUCTION: isProduction,
        // LOCAL_DOMAIN: JSON.stringify(appConfig('local_domain')),
        // BACKEND_VSHGU_URL: JSON.stringify(appConfig('api_url'))
      }),
      new webpack.ProvidePlugin({
        Vue: ['vue', 'default'],
        mapGetters: ['vuex', 'mapGetters'],
        mapActions: ['vuex', 'mapActions'],
        mapMutations: ['vuex', 'mapMutations'],
        mapState: ['vuex', 'mapState']
      }),
      new webpack.HashedModuleIdsPlugin(),
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: 'public/index.html',
      //   inject: true
      // }),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/)
    ],
    module: {}
  },


  css: {
    sourceMap: !isProduction,
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style/style.scss";'
      }
    }
  }
};
