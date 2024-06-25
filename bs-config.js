const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
    port: 8080,
    server: {
        baseDir: 'dist/apps/randem-frames',
        routes: {
            '/node_modules': 'node_modules',
        },
        middleware: [
            createProxyMiddleware('/image', {
                target: 'http://localhost:3000',
                changeOrigin: true,
            }),
            createProxyMiddleware('/pl/image', {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/pl': '', // to usuwa '/pl'  z żądania.
                },
            }),
            createProxyMiddleware('/en/image', {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/en': '', // to usuwa '/en'  z żądania.
                },
            }),
        ],
    },
};
