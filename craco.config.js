/* craco.config.js */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#921349",
              "@layout-header-background": "#921349",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
