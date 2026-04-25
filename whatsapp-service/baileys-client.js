const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const QRCode = require('qrcode');
const pino = require('pino');
const EventEmitter = require('events');
const NodeCache = require('node-cache');

class BaileysClient extends EventEmitter {
  constructor(authDir = './auth') {
    super();
    this.authDir = authDir;
    this.sock = null;
    this.qrCode = null;
    this.connectionState = 'disconnected';
    this.lastError = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 20;
    this.baseReconnectDelay = 5000;
    this.logger = pino({ level: 'trace' });
    this.msgRetryCounterCache = new NodeCache();
  }

  async start() {
    const { state, saveCreds } = await useMultiFileAuthState(this.authDir);

    const { version } = await fetchLatestBaileysVersion().catch(() => ({ version: [2, 3000, 1023223821] }));

    this.sock = makeWASocket({
      version,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, this.logger),
      },
      logger: this.logger,
      browser: ['Hari Sukan', 'Chrome', '131'],
      syncFullHistory: false,
      markOnlineOnConnect: false,
      connectTimeoutMs: 60000,
      qrTimeout: 120000,
      defaultQueryTimeoutMs: 60000,
      msgRetryCounterCache: this.msgRetryCounterCache,
      generateHighQualityLinkPreview: true,
      getMessage: async () => undefined,
    });

    this.sock.ev.on('creds.update', saveCreds);

    this.sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr, isNewLogin } = update;

      if (qr) {
        this.qrCode = qr;
        this.lastError = null;
        try {
          const qrDataUrl = await QRCode.toDataURL(qr, { width: 300, margin: 2 });
          this.emit('qr', { raw: qr, dataUrl: qrDataUrl });

          try {
            const qrcodeTerminal = require('qrcode-terminal');
            console.log('\n  Scan QR code below with WhatsApp > Linked Devices > Link a Device:\n');
            qrcodeTerminal.generate(qr, { small: true });
            console.log(`\n  Or open http://localhost:${process.env.PORT || 3001}/qr in browser\n`);
          } catch {}
          console.log('  QR code ready.');
        } catch (err) {
          this.emit('error', err);
        }
      }

      if (isNewLogin) {
        console.log('  WhatsApp pairing successful.');
      }

      if (connection === 'connecting') {
        this.connectionState = 'connecting';
        this.emit('connecting');
      }

      if (connection === 'open') {
        this.connectionState = 'connected';
        this.reconnectAttempts = 0;
        this.qrCode = null;
        this.lastError = null;
        this.emit('ready', this.sock.user);
        console.log('  Connected as', this.sock.user?.id);
      }

      if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const reason = DisconnectReason[statusCode] || 'unknown';
        const data = lastDisconnect?.error?.output?.payload;
        this.connectionState = 'disconnected';
        this.lastError = { statusCode, reason, data };

        console.log(`  Disconnected: ${reason} (code: ${statusCode}) data:`, data ? JSON.stringify(data) : 'none');

        const shouldReconnect = statusCode !== DisconnectReason.loggedOut
          && statusCode !== DisconnectReason.badSession
          && this.reconnectAttempts < this.maxReconnectAttempts;

        if (shouldReconnect) {
          this.reconnectAttempts++;
          const delay = Math.min(
            this.baseReconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1),
            60000
          );
          console.log(`  Reconnecting in ${Math.round(delay / 1000)}s (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          setTimeout(() => this.start(), delay);
        } else if (statusCode === DisconnectReason.loggedOut) {
          console.log('  Logged out. Delete auth/ and restart.');
        } else {
          console.log('  Max retries. Restart service.');
        }
      }
    });
  }

  async sendText(jid, text) {
    if (!this.sock || this.connectionState !== 'connected') {
      throw new Error('WhatsApp not connected');
    }
    return await this.sock.sendMessage(jid, { text });
  }

  formatPhone(phone) {
    let clean = phone.replace(/[^0-9]/g, '');
    if (!clean.endsWith('@s.whatsapp.net')) {
      clean = clean + '@s.whatsapp.net';
    }
    return clean;
  }

  async sendMessageToPhone(phone, text) {
    return this.sendText(this.formatPhone(phone), text);
  }

  async getQRDataUrl() {
    if (this.qrCode) {
      return await QRCode.toDataURL(this.qrCode, { width: 300, margin: 2 });
    }
    return null;
  }

  async logout() {
    if (this.sock) {
      await this.sock.logout();
    }
    this.qrCode = null;
    this.connectionState = 'disconnected';
  }

  getStatus() {
    return {
      connectionState: this.connectionState,
      user: this.sock?.user || null,
      qrAvailable: !!this.qrCode,
      reconnectAttempts: this.reconnectAttempts,
      lastError: this.lastError,
    };
  }
}

module.exports = BaileysClient;
