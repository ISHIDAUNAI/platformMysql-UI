/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

let baseUrl = 'http://localhost:8580';

export default {
  dev: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zhHealth': {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/zhHealth': '/',
      },
    },
    '/assets': {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/assets': '/assets',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zhHealth': {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/zhHealth': '/',
      },
    },
    '/assets': {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/assets': '/assets',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zhHealth': {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/zhHealth': '/',
      },
    },
    '/assets': {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/assets': '/assets',
      },
    },
  },
};
