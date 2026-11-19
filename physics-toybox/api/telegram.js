// Vercel Serverless Function: /api/telegram
// Full Autonomous Telegram Bot Webhook for @Danial_devmaple_bot

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8929246195:AAF2tAlCJweVOY-NpRf2NnCNE-ZrBJCWXN0';
const TG_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const GROQ_KEY = process.env.GROQ_API_KEY;

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET: Setup & Webhook Status Check
  if (req.method === 'GET') {
    const { setup } = req.query || {};
    try {
      if (setup === 'true') {
        const webhookUrl = 'https://danial-portfolio-v2.vercel.app/api/telegram';
        const setRes = await fetch(`${TG_API}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
        const setData = await setRes.json();
        return res.status(200).json({ action: 'setWebhook', webhookUrl, result: setData });
      }

      const meRes = await fetch(`${TG_API}/getMe`);
      const meData = await meRes.json();
      const hookRes = await fetch(`${TG_API}/getWebhookInfo`);
      const hookData = await hookRes.json();

      return res.status(200).json({
        status: 'online',
        bot: meData.result,
        webhook: hookData.result,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST: Webhook Update Handler
  if (req.method === 'POST') {
    try {
      const update = req.body || {};
      const msg = update.message;

      if (!msg || !msg.chat) {
        return res.status(200).json({ ok: true, ignored: true });
      }

      const chatId = msg.chat.id;
      const fromUser = msg.from || {};
      const username = fromUser.username ? `@${fromUser.username}` : '';
      const senderName = [fromUser.first_name, fromUser.last_name].filter(Boolean).join(' ') || username || 'Telegram User';
      let customerQuery = (msg.text || '').trim();

      // 1. Send immediate typing indicator
      fetch(`${TG_API}/sendChatAction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
      }).catch(() => {});

      // 2. Handle Voice Notes via Groq Whisper
      if (!customerQuery && (msg.voice || msg.audio)) {
        const fileId = msg.voice?.file_id || msg.audio?.file_id;
        try {
          const fileInfoRes = await fetch(`${TG_API}/getFile?file_id=${fileId}`);
          const fileInfo = await fileInfoRes.json();
          if (fileInfo.ok && fileInfo.result?.file_path) {
            const audioDownloadUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${fileInfo.result.file_path}`;
            const audioRes = await fetch(audioDownloadUrl);
            const arrayBuf = await audioRes.arrayBuffer();

            // Transcribe using Groq Whisper
            if (GROQ_KEY) {
              const formData = new FormData();
              const blob = new Blob([arrayBuf], { type: 'audio/ogg' });
              formData.append('file', blob, 'voice.ogg');
              formData.append('model', 'whisper-large-v3-turbo');
              formData.append('prompt', 'Transcribe in Roman Urdu or English: Assalam o alaikum Danial bhai');

              const whisperRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
                method: 'POST',
                headers: { Authorization: `Bearer ${GROQ_KEY}` },
                body: formData,
              });
              const whisperData = await whisperRes.json();
              if (whisperData.text) {
                customerQuery = whisperData.text.trim();
              }
            }
          }
        } catch (voiceErr) {
          console.error('Voice handling error:', voiceErr);
        }
      }

      if (!customerQuery) {
        return res.status(200).json({ ok: true, empty: true });
      }

      // 3. Handle Commands
      if (customerQuery === '/start') {
        const welcomeText = `
*Hello ${senderName}! 👋 Welcome to DANIAL AI.*

I am the official AI assistant for *Muhammad Danial (DANIAL®)* — Full-Stack & Agentic AI Software Engineer.

*Quick Commands:*
• 🚀 *Projects & Stack:* Ask me anything about React 19, Next.js, MERN, or Agentic AI!
• 📄 */cv:* Get Danial's official CV & Portfolio document.
• 🌐 */portfolio:* Direct link to live 3D portfolio & tools.
• 📞 */contact:* Connect directly with Danial on WhatsApp.
• 🎙️ *Voice Notes:* Send me a voice note in Urdu or English!

How can I help you today?
        `.trim();

        const keyboard = {
          inline_keyboard: [
            [
              { text: '📄 Get CV / Resume (PDF)', callback_data: 'get_cv' },
              { text: '🌐 View Portfolio', url: 'https://danial-portfolio-v2.vercel.app/' },
            ],
            [
              { text: '💬 WhatsApp Danial Directly', url: 'https://wa.me/923137525862' },
              { text: '🛠️ DevMaple (38 Tools)', url: 'https://www.devmaple.com' },
            ],
          ],
        };

        await fetch(`${TG_API}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeText,
            parse_mode: 'Markdown',
            reply_markup: keyboard,
          }),
        });
        return res.status(200).json({ ok: true, command: '/start' });
      }

      if (customerQuery === '/portfolio') {
        await fetch(`${TG_API}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: '🌐 *Muhammad Danial Live Portfolio:*\nhttps://danial-portfolio-v2.vercel.app/\n\nFeatures 3D Physics Toybox, DevMaple (38 developer tools), ChatFlow AI, and live GitHub repositories! 🚀',
            parse_mode: 'Markdown',
          }),
        });
        return res.status(200).json({ ok: true, command: '/portfolio' });
      }

      if (customerQuery === '/contact') {
        await fetch(`${TG_API}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: '📞 *Direct Contact Information for Muhammad Danial:*\n\n• 📱 **WhatsApp:** +92 313 7525862 (24/7 via WhatsApp AI)\n• ✉️ **Email:** innocentdanial00@gmail.com\n• 🌐 **Portfolio:** https://danial-portfolio-v2.vercel.app/\n\nFeel free to send a message on WhatsApp for instant project discussion!',
            parse_mode: 'Markdown',
          }),
        });
        return res.status(200).json({ ok: true, command: '/contact' });
      }

      // 4. Automated CV / Portfolio PDF Dispatch
      const isAskingCv = customerQuery === '/cv' || customerQuery.toLowerCase().includes('cv') || customerQuery.toLowerCase().includes('resume');
      if (isAskingCv) {
        const cvCaption = '📄 *Muhammad Danial — Official CV & Portfolio Profile*\n\nAap is document mein tamam live projects (DevMaple, ChatFlow AI, PDF Suite) aur technical stack review kar sakte hain. Direct contact: *+92 313 7525862* | *innocentdanial00@gmail.com* 🚀';
        
        await fetch(`${TG_API}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `📄 *Official CV & Portfolio Document:*  \n[Download Muhammad Danial CV & Portfolio PDF](https://danial-portfolio-v2.vercel.app/docs/Muhammad_Danial_CV_Portfolio.pdf)\n\n${cvCaption}`,
            parse_mode: 'Markdown',
          }),
        });
        return res.status(200).json({ ok: true, command: '/cv' });
      }

      // 5. Generate AI Response with Groq (qwen/qwen3.8-27b)
      if (GROQ_KEY) {
        const systemPrompt = `
You are Danial AI, an intelligent, helpful assistant for Muhammad Danial (DANIAL®) on Telegram.
Muhammad Danial is an expert Full-Stack & Agentic AI Engineer (Next.js, React 19, Node.js, Express 5, Whisper, Groq, n8n).

GUIDELINES:
- Reply in natural, friendly Roman Urdu or English matching the user's language.
- Keep responses punchy, concise, and helpful (1 to 2 short paragraphs).
- Use *bold* for emphasis and clean emojis.
- Direct contact: WhatsApp: +92 313 7525862 | Email: innocentdanial00@gmail.com | Portfolio: https://danial-portfolio-v2.vercel.app/
        `.trim();

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GROQ_KEY}`,
          },
          body: JSON.stringify({
            model: 'qwen/qwen3.8-27b',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: customerQuery },
            ],
            max_tokens: 250,
            temperature: 0.3,
          }),
        });

        const groqData = await groqRes.json();
        const replyText = groqData.choices?.[0]?.message?.content || 'Hello! How can I help you today? Feel free to contact Danial on WhatsApp: +92 313 7525862!';

        await fetch(`${TG_API}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: replyText,
            parse_mode: 'Markdown',
          }),
        });
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Telegram webhook error:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
