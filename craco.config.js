const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@tabs-active-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};