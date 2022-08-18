const path = require("path");
const {SourceMapDevToolPlugin} = require("webpack");

module.exports = {
  mode: "development",
  resolve: {
    extensions: ['*', '.mjs', '.js', '.json']
  },
  devServer: {
    client: { overlay: { warnings: false, errors: true } },
  },
  entry: "./src/index.js",
  plugins: [
    new SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i,
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
