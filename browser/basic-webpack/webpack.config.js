const path = require("path");
const {IgnorePlugin} = require("webpack");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, ""),
    filename: "bundle.js",
  },
  experiments: {
    asyncWebAssembly: true,
  },
  resolve: {
    fallback: {
      Buffer: require.resolve("buffer")
    },
  },
  plugins: [
    new IgnorePlugin({ resourceRegExp: /^/u, contextRegExp: /grpc-web-node-http-transport/u })
  ]
};
