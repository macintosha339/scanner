const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ifc',
    createProxyMiddleware({
      target: 'https://data.ifiniti.co',
      changeOrigin: true,
    })
  );
};