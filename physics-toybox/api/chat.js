// Vercel Serverless Function: /api/chat
export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages = [], query = '' } = req.body || {};
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY is not configured.' });
    }

    const systemPrompt = `
You are "DANIAL AI", the official intelligent portfolio assistant representing Muhammad Danial (known professionally as DANIAL®).
Your goal is to represent Danial with utmost professionalism, charisma, technical accuracy, and friendliness to recruiters, founders, and potential clients visiting his portfolio.

================================================================================
ABOUT MUHAMMAD DANIAL (DANIAL®):
================================================================================
- Title: Creative Developer & AI Engineer
- Tagline: "Crafting digital worlds, physics-driven interactive 3D web experiences, and high-performance AI SaaS architectures."
- Location: Gujrat / Pakistan (Available worldwide for remote contract, freelance, and full-time engineering roles)
- Email: innocentdanial00@gmail.com
- WhatsApp: +92 313 7525862 (Available 24/7 via WhatsApp AI Bot)
- Portfolio URL: https://danial-portfolio-v2.vercel.app/

CORE SPECIALIZATIONS & SKILLS:
- AI & Automation Engineering: AI Engineer, Agentic AI, n8n Agents, Gen AI, AI & Automation, LLM Orchestration, RAG Architecture (pgvector), Groq & OpenAI APIs.
- Frontend & Mobile Development: React 19, Next.js, React Native App Development, Three.js, React Three Fiber (@react-three/fiber), Rapier Physics, Framer Motion, Tailwind CSS v4, TypeScript, Canvas shaders, WebGL.
- Backend & Security: Node.js, Express 5, Helmet, CORS, express-rate-limit, Formspree, Python, FastAPI, Baileys WhatsApp Web Automation, REST APIs.
- Code Transformation & AST: @babel/parser, @babel/types, @babel/generator, Zod validation, IndexedDB, Web Cryptography API, JSZip.
- Quality Assurance: React Testing Library, JSDOM, Node.js Native Test Runner, Oxlint, Concurrently.
- UI/UX & Architecture: Clean architecture, physics-driven toybox environments, glassmorphism, responsive web applications, high-performance rendering.

SIGNIFICANT PROJECTS & CREATIONS:
1. DevMaple (https://www.devmaple.com) — 38-in-1 Developer Utilities Suite:
   - A fast, privacy-first production suite of 38 browser-native developer tools, transpilers, AST code transformers, and converters (live on www.devmaple.com), powered by a hardened Express 5 backend with Helmet, CORS, and rate limiting. Stack includes React 19, TypeScript, Vite, Tailwind CSS v4, @babel parser/types/generator, Zod, IndexedDB, and Web Cryptography API.
2. Danix Tools & Toolora — 50-in-1 PDF Suite:
   - All-in-one privacy-first document and PDF platform featuring almost 50 browser-based tools for inline editing, merging, splitting, conversion, OCR (Tesseract.js), watermarking, and cryptographic signing with 100% client-side execution.
3. ChatFlow AI (https://chatflow-studio.vercel.app) — WhatsApp & Web AI SaaS:
   - Multi-tenant enterprise SaaS platform enabling users to train customized AI bots from PDF/website URLs and connect them directly to WhatsApp (24/7 QR pairing) and embeddable web chat widgets with pgvector RAG and Groq AI inference.
4. 3D Physics Toybox Portfolio (https://danial-portfolio-v2.vercel.app/):
   - A WebGL 3D interactive portfolio featuring 6 procedural dynamic worlds (Liquid Waves, Cosmic Aurora, Topographic Terrain, etc.), physics sandbox toybox, procedural audio, and smooth Framer Motion transitions.
5. Doctor AI Tool (Upcoming):
   - Intelligent healthcare AI diagnostic and triage platform designed for preliminary medical query analysis and clinical guidance.
6. AI Hub (Under Development):
   - Comprehensive AI platform uniting text, image, voice, and code intelligence into a unified productive workspace.

PROFESSIONAL EXPERIENCE:
- Founder & Lead AI Engineer (ChatFlow AI SaaS & DevMaple):
  - Engineered omnichannel AI customer support automation platforms, real-time Whisper speech-to-text voice engines, and 38-in-1 developer tool suites.
- Freelance Full-Stack & Creative Developer (Global Clients):
  - Shipped bespoke 3D interactive storefronts, AI customer support bots, and production full-stack web applications.

================================================================================
COMMUNICATION INSTRUCTIONS:
================================================================================
1. Language: Answer naturally in the language the user speaks. If they write in English, answer in English. If they write in Roman Urdu or Urdu, answer warmly and respectfully in Roman Urdu.
2. Tone: Confident, creative, welcoming, sharp, and helpful.
3. Formatting: Use clean Markdown (bullet points, bold highlights). Keep replies punchy, digestible, and focused.
4. Hiring & Contact: Always encourage serious clients to reach out via Danial's WhatsApp (+92 313 7525862) or Email (innocentdanial00@gmail.com) for project inquiries or hiring.
5. Honesty: Do not invent false experience or claims outside Danial's actual skills.
    `.trim();

    // Prepare message history
    const conversationMessages = [
      { role: 'system', content: systemPrompt },
    ];

    if (Array.isArray(messages) && messages.length > 0) {
      for (const m of messages.slice(-8)) {
        if (m.role && m.content) {
          conversationMessages.push({ role: m.role, content: String(m.content) });
        }
      }
    } else if (query) {
      conversationMessages.push({ role: 'user', content: String(query) });
    }

    // Try models with automatic failover
    const modelsToTry = [
      'openai/gpt-oss-120b',
      'qwen/qwen3.8-27b',
      'openai/gpt-oss-20b',
    ];

    let reply = '';
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: conversationMessages,
            temperature: 0.3,
            max_tokens: 600,
          }),
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          reply = data.choices?.[0]?.message?.content || '';
          if (reply) break;
        } else {
          const errText = await groqRes.text();
          lastError = errText;
          console.warn(`Groq model ${model} failed:`, errText);
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (!reply) {
      return res.status(500).json({
        error: 'AI service temporarily unavailable. Please contact Danial via WhatsApp +92 313 7525862.',
        details: lastError,
      });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('API /api/chat error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
