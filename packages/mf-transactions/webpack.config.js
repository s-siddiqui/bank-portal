const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const getDefineEnv = require("../../webpack.utils/env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const envPath = isProd ? ".env.production" : ".env";
  const envVars =
    dotenv.config({ path: path.resolve(__dirname, envPath) }).parsed || {};

  const defineEnv = getDefineEnv(argv.mode, envVars);

  // Convert to DefinePlugin format: { 'process.env.KEY': JSON.stringify(value) }
  // const envKeys = {
  //   "process.env.NODE_ENV": JSON.stringify(argv.mode),
  //   ...Object.keys(envVars).reduce((prev, next) => {
  //     prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
  //     return prev;
  //   }, {}),
  // };

  return {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "eval-source-map",
    output: {
      filename: isProd ? "assets/[name].[contenthash].js" : "[name].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProd ? "/bank-portal/mf-transactions/" : "auto",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "react-native$": "react-native-web",
        "ui-kit": path.resolve(__dirname, "../ui-kit/src"),
      },
    },
    optimization: isProd
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              extractComments: false,
              terserOptions: {
                compress: true,
                format: { comments: false },
              },
            }),
          ],
          runtimeChunk: false,
        }
      : { runtimeChunk: false },
    devServer: {
      port: 3002,
      static: path.join(__dirname, "public"),
      hot: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsconfig.json"),
            transpileOnly: true,
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "mf_transactions",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: require("./package.json").dependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion:
              require("./package.json").dependencies["react-dom"],
          },
          "react-native-web": { singleton: true },
          "@apollo/client": { singleton: true },
          "@bank-portal/ui-kit": {
            singleton: true,
            requiredVersion: false,
          },
        },
      }),
      new webpack.DefinePlugin(defineEnv),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
      }),
      new webpack.ProvidePlugin({
        process: "process/browser.js",
      }),
      ...(isProd ? [new CompressionPlugin()] : []),
    ],
  };
};
