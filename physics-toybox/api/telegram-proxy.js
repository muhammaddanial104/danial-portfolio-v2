// Vercel Serverless Function: /api/telegram-proxy
// Hardened proxy to api.telegram.org (restricted exclusively to Danial's authorized bot)
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    if (!TELEGRAM_TOKEN) {
      return res.status(500).json({ error: 'TELEGRAM_BOT_TOKEN is not configured.' });
    }

    const rawPath = (req.query.path || '').replace(/^\/+/, '');

    // SECURITY CHECK: Strictly allow only requests to THIS specific bot
    const isBotPath = rawPath.startsWith(`bot${TELEGRAM_TOKEN}/`);
    const isFilePath = rawPath.startsWith(`file/bot${TELEGRAM_TOKEN}/`);

    if (!isBotPath && !isFilePath) {
      return res.status(403).json({
        error: 'Forbidden: This proxy is restricted exclusively to authorized bot interactions.',
      });
    }

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
