const path = require('path');

module.exports = ({config}) => {
  config.module.rules[2].use = [
    {
      loader: require.resolve('text-loader')
    },
    {
      loader: require.resolve('./loader.js')
    }
  ];
  return config;
};
