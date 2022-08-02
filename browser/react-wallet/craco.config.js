const { SourceMapDevToolPlugin } = require("webpack");
const path = require("path");

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    mode: "development",
    resolve: {
      extensions: ['*', '.ts', '.mts', '.mjs', '.js', '.json']
    },
    entry: "./index.js",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            configFile: 'tsconfig.json'
          }
        }
      ],
    },
    devtool: "inline-source-map",
    experiments: {
      asyncWebAssembly: true,
      topLevelAwait: true
    },
    plugins: [
      new SourceMapDevToolPlugin({
        filename: null,
        test: /\.(ts|js)($|\?)/i,
      })
    ],
    output: {
      path: path.resolve(__dirname, ""),
      filename: "bundle.js",
    },
    stats: {
      errorDetails: true,
    },
  }
}
  