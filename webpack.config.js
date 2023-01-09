/* eslint-disable @typescript-eslint/no-var-requires */
// webpack.config.js
const miniCss = require("mini-css-extract-plugin");
const path = require("path");

// eslint-disable-next-line no-undef
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "project-name.bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      {
        test: /\.hbs/,
        loader: "handlebars-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new miniCss({
      filename: "style.css",
    }),
  ],
};
