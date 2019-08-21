import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  history: 'hash',
  treeShaking: true,
  base: '/blog/',
  publicPath: '/blog/',
  copy: [
    {
      from: __dirname + '/favicon.png',
      to: __dirname + '/dist/favicon.png',
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: { webpackChunkName: true },
        title: 'blog',
        dll: true,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};

export default config;
