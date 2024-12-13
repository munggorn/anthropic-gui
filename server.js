const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Enable CORS
app.use(cors());

// Proxy middleware configuration
const anthropicProxy = createProxyMiddleware({
  target: 'https://api.anthropic.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/anthropic': '', // Remove the /api/anthropic prefix when forwarding
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
  onError: function (err, req, res) {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  },
});

// Use proxy for /api/anthropic routes
app.use('/api/anthropic', anthropicProxy);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});
