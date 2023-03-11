/* eslint-disable import/no-anonymous-default-export */
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/ifc',
    createProxyMiddleware({
      target: 'https://data.ifiniti.co',
      changeOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  );
};