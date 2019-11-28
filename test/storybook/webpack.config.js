const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = ({config}) => {
  config.module.rules.push({
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
      {
        loader: require.resolve('./inlineLoader.js')
      },
    ],
  });
  // config.module.rules.push(
  //   {
  //     test: /\.html$/,
  //     use: [
  //       {
  //         loader: require.resolve('text-loader')
  //       },
  //       {
  //         loader: require.resolve('./importLoader.js')
  //       }
  //     ]
  //   }
  // );
  config.module.rules[2].test = /\.html$/;
  config.module.rules[2].use = [
    {
      loader: require.resolve('text-loader')
    },
    {
      loader: require.resolve('./importLoader.js')
    }
  ];
  return config;
};
