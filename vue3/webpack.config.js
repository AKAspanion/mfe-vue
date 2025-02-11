const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = (config = {}) => {
  const { WEBPACK_BUILD } = config;
  const HOST = WEBPACK_BUILD
    ? "https://vue-remote-react.netlify.app"
    : "http://localhost:3001";

  return {
    mode: "development",
    cache: false,
    devtool: "source-map",
    optimization: {
      minimize: false,
    },
    output: {
      publicPath: "auto",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      watchFiles: ["src/**/*"],
      historyApiFallback: true,
      liveReload: true,
      port: 3000,
    },
    resolve: {
      extensions: [".vue", ".tsx", ".ts", ".js", ".json"],
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/i,
          loader: "vue-loader",
          options: {
            esModule: true,
          },
        },
        {
          test: /\.png$/,
          use: {
            loader: "url-loader",
            options: { limit: 8192 },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            "css-loader",
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new ModuleFederationPlugin({
        name: "vue3",
        filename: "remoteEntry.js",
        remotes: {
          react: `react@${HOST}/remoteEntry.js`,
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./index.html"),
      }),
    ],
  };
};
