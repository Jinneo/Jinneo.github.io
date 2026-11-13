const { isIP } = require('node:net');

module.exports = async function handler(req, res) {
  const origin = process.env.PORTFOLIO_ORIGIN || 'https://praveensriramvadlamani.github.io';
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Origin');
  if (req.headers.origin !== origin) return res.status(403).end();
  res.setHeader('Access-Control-Allow-Origin', origin);
  if (req.method !== 'POST') return res.status(405).end();
  if (!process.env.SHEETS_WEB_APP_URL || !process.env.TRACKING_SECRET) return res.status(503).end();
  // Only trust this provider-controlled header when running on Vercel.
  const ip = process.env.VERCEL === '1' ? req.headers['x-vercel-forwarded-for'] : req.socket?.remoteAddress;
  if (typeof ip !== 'string' || !isIP(ip)) return res.status(400).end();
  try {
    const response = await fetch(process.env.SHEETS_WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.TRACKING_SECRET, event: 'view_projects', ip }),
      signal: AbortSignal.timeout(8000)
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error('Sheet write failed');
    return res.status(204).end();
  } catch {
    return res.status(502).end();
  }
};
