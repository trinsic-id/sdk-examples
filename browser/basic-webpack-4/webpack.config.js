const path = require("path");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  mode: "development",
  resolve: {
    extensions: ['*', '.mjs', '.js', '.json']
  },
  entry: "./src/index.ts",
  plugins: [
    new SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i,
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  }
};