const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

const anthropicProxy = createProxyMiddleware({
  target: 'https://api.anthropic.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/anthropic': '',
  },
  onProxyReq: (proxyReq, req) => {
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  },
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, anthropic-version';
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
});

app.use('/api/anthropic', anthropicProxy);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
