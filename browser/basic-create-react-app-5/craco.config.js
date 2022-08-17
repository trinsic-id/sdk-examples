// craco.config.js
​
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.experiments = {
        syncWebAssembly: true,
        asyncWebAssembly: true
      };
​
      const wasmExtensionRegExp = /\.wasm$/;
      webpackConfig.module.rules.forEach((rule) => {
        (rule.oneOf || []).forEach((oneOf) => {
            if (oneOf.type === "asset/resource") {
                oneOf.exclude.push(wasmExtensionRegExp);
            }
        });
    });
      return webpackConfig;
    },
  },
};