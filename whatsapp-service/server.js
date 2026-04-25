require('dotenv').config();

const express = require('express');
const BaileysClient = require('./baileys-client');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY || 'dev-key';

app.use(express.json());

const client = new BaileysClient('./auth');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

client.on('qr', ({ dataUrl }) => {
  console.log('QR code ready for scanning');
});

client.on('ready', (user) => {
  console.log('Baileys ready:', user?.id);
});

client.on('error', (err) => {
  console.error('Baileys error:', err);
});

app.get('/health', (req, res) => {
  const status = client.getStatus();
  res.json({
    status: status.connectionState === 'connected' ? 'ok' : 'degraded',
    ...status,
  });
});

app.get('/qr', async (req, res) => {
  const status = client.getStatus();
  const dataUrl = await client.getQRDataUrl();

  if (status.connectionState === 'connected') {
    return res.send(statusPage(`
      <h2>WhatsApp Bersambung</h2>
      <p style="font-size:14px;color:#666">User: ${status.user?.id || 'unknown'}</p>
      <p style="font-size:14px;color:#666">QR tidak diperlukan.</p>
    `));
  }

  if (dataUrl) {
    return res.send(statusPage(`
      <h2>Scan QR Code dengan WhatsApp</h2>
      <p style="font-size:13px;color:#666">Buka WhatsApp > Linked Devices > Link a Device</p>
      <img src="${dataUrl}" style="max-width:280px;margin:20px auto;display:block;border:2px solid #e5e7eb;border-radius:12px;padding:8px" alt="QR Code" />
      <p style="margin-top:8px"><a href="/qr" style="color:#ea580c;font-size:13px">Refresh</a></p>
    `));
  }

  const errorMsg = status.lastError
    ? `Ralat: ${status.lastError.reason} (kod: ${status.lastError.statusCode || 'N/A'})`
    : '';

  return res.send(statusPage(`
    <h2 style="color:#dc2626">WhatsApp Web Tidak Dapat Disambungkan</h2>
    <p style="font-size:13px;color:#666;margin:12px 0">
      Sambungan ke WhatsApp Web gagal. Ini biasana terhasil oleh rangkaian atau firewall.
    </p>
    ${errorMsg ? `<p style="font-size:12px;color:#991b1b;background:#fef2f2;padding:10px;border-radius:8px;margin:10px 0">${errorMsg}</p>` : ''}
    <p style="font-size:12px;color:#666;margin-top:16px">
      Cuba: <br>
      1. Pastikan sambungan internet stabil<br>
      2. Cuba di rangkaian lain (mobile hotspot)<br>
      3. Gunakan VPN jika tersekat<br>
      4. Restart service: <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px">node server.js</code>
    </p>
    <p style="margin-top:12px"><a href="/qr" style="color:#ea580c;font-size:13px">Cuba Lagi</a></p>
  `));
});

app.post('/send-text', requireAuth, async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ error: 'phone and message are required' });
  }

  const status = client.getStatus();
  if (status.connectionState !== 'connected') {
    return res.status(503).json({ error: 'WhatsApp not connected', status });
  }

  try {
    const result = await client.sendMessageToPhone(phone, message);
    res.json({ success: true, result });
  } catch (err) {
    console.error('Send error:', err);
    res.status(500).json({ error: 'Failed to send message', detail: err.message });
  }
});

app.get('/status', (req, res) => {
  res.json(client.getStatus());
});

app.post('/logout', requireAuth, async (req, res) => {
  try {
    await client.logout();
    res.json({ success: true, message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function statusPage(body) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>WhatsApp Service</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-align:center;padding:40px 20px;max-width:420px;margin:0 auto;color:#1e293b}h2{font-size:20px;font-weight:700;margin:0 0 8px}p{margin:4px 0}a{text-decoration:none;font-weight:600}</style>
</head><body>${body}</body></html>`;
}

function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down...`);
  client.removeAllListeners();
  if (client.sock) {
    client.sock.end(undefined).catch(() => {});
  }
  setTimeout(() => {
    console.log('Shutdown complete.');
    process.exit(0);
  }, 3000);
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

client.start().catch((err) => {
  console.error('Failed to start Baileys client:', err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`
  WhatsApp Service running on port ${PORT}
  Health: http://localhost:${PORT}/health
  QR:     http://localhost:${PORT}/qr
  `);
});
