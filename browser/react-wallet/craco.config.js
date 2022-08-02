const { addBeforeLoader, loaderByName } = require('@craco/craco');

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
    devtool: "inline-source-map",
    experiments: {
      asyncWebAssembly: true,
    },
    stats: {
      errorDetails: true,
    },
  }
}
  