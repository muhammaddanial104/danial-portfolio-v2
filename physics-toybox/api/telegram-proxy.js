// Vercel Serverless Function: /api/telegram-proxy
// Transparent Proxy to api.telegram.org to bypass regional ISP firewall restrictions
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const rawPath = req.query.path || '';
    const targetUrl = `https://api.telegram.org/${rawPath}`;

    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
    };

    if (req.method === 'POST' && req.body) {
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const tgRes = await fetch(targetUrl, fetchOptions);
    const data = await tgRes.json();
    return res.status(tgRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
