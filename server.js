const http = require('http');
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ healthy: true }));
    return;
  }
  if (req.url === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      app: 'e2e-tier2-test',
      projectId: process.env.PANDO_PROJECT_ID || 'unknown',
      gatewayUrl: process.env.PANDO_GATEWAY_URL || 'not-set',
      hasApiKey: !!process.env.PANDO_PROJECT_API_KEY,
      uptime: process.uptime(),
    }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>E2E Tier 2 App</h1><p>Project: ' + (process.env.PANDO_PROJECT_ID || 'unknown') + '</p>');
});
server.listen(PORT, '0.0.0.0', () => console.log('Listening on port ' + PORT));
