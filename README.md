![Luwak AI Banner](/public/img/jb-banner.jpg)

# Java Bridge: Cross-Chain Brilliance Powered by Luwak AI ☕🦝

## Overview  
**Java Bridge** is a next-gen cross-chain platform built with **Next.js**, enabling seamless and secure ETH bridging across multiple rollup chains. At its core is **Luwak AI**, your intelligent assistant for everything EduChain—combining blockchain expertise with an engaging user experience.

---

## Supported Chains

| Chain | RPC URL | Icon |
|-------|---------|------|
| **Arbitrum Sepolia** | `https://arbitrum-sepolia-rpc.publicnode.com` | ![Arbitrum Sepolia](https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png) |
| **Gayo Roll** | `https://rpc-gayo-roll.javabridge.fun` | <img src="public/img/coffee-1.png" height="64" /> |
| **Bali Beans** | `https://rpc-bali-beans.javabridge.fun` | <img src="public/img/coffee-2.png" height="64" /> |

---

## ☕ Meet Luwak AI: Your On-Chain Crypto Assistant

**Luwak AI** is your 24/7 AI-powered guide to the EduChain ecosystem. Whether you're new to Web3 or a seasoned dev, Luwak AI delivers instant answers, bridging support, real-time data, and protocol guidance—all with a cyberpunk raccoon twist.

### 🧠 *Core Capabilities:*

- 📚 *EduChain Documentation* – Get instant, accurate answers from the official EduChain docs.  
  → No more digging—Luwak brings the docs to you.

- 🧩 *EduChain Ecosystem Guide* – Explore protocols, tools, and projects within the EduChain universe.  
  → Discover what's possible, from rollups to dApps.

- 📖 *Crypto Glossary* – Understand complex blockchain terms with simple explanations.  
  → Jargon-free learning for devs and curious minds alike.

- 🔁 *Chat-Based Asset Bridging* – Move assets across chains directly through chat—fast, secure, and user-friendly.  
  → One chat, one command—done.

- 💸 *Live Coin Prices* – Track real-time market prices and make smarter decisions.  
  → Get live data with zero delay, right when you need it.

- 🤖 *Custom Persona* – Luwak responds in a helpful, engaging tone—tailored for both devs and newcomers.  
  → A smart assistant that speaks your language.

---

## 🛠️ Technology Stack

- **RAG (Retrieval-Augmented Generation)**: Custom knowledge base powered by local PDF ingestion & vector search  
- **OpenAI o1-mini**: Custom prompt-engineered AI for crypto conversations  
- **Pyth Network**: Secure, live price feeds across multiple chains  
- **Next.js & Tailwind**: Lightning-fast UI/UX frontend

---

## 🚀 Getting Started

### Prerequisites  
- Node.js (v18+)  
- MetaMask or other Web3 wallet  
- Test ETH on supported chains

### Setup Steps  
```bash
git clone https://github.com/your-username/javabridge-nextjs.git
cd javabridge-nextjs
npm install
cp env-example .env.local  # Configure your API keys
npm run dev
```

> Access the app at `http://localhost:3000`

---

## 🔧 Usage Guide

### How to Bridge  
1. Connect your wallet  
2. Choose source/destination chains  
3. Enter ETH amount  
4. Hit "Bridge" and confirm  
5. Monitor transaction in real time

### Chat with Luwak AI  
- Open the "Chat" menu  
- Ask questions about EduChain, bridging, or crypto concepts  
- Get fast answers and actionable steps  
- Enjoy the cyberpunk raccoon vibes

---

## 🧪 Developer Mode: Expand Luwak’s Knowledge

### Add New Docs  
1. Drop PDFs into `embedding_docs/input/`  
2. Run the app locally or build for production  
3. Visit:  
   ```
   http://localhost:3000/api/embedding/create
   ```  
4. Verify in terminal, test your queries—Luwak now knows your docs

> Embedding may take time depending on doc size.

### Dev Customizations  
- Supported chains → `/lib/chains.js`  
- Token configs → `/lib/contracts.js`  
- Luwak’s persona → `/app/api/agent/characters.js`

---

## 📄 License  
MIT License – see [LICENSE](LICENSE) for full details.

---

## 🙏 Acknowledgements  
- [Edu Chain](https://educhain.xyz/) – A Layer 3 blockchain for consumer-facing education apps
- [Pyth Network](https://pyth.network/) – decentralized price oracle feeds  
- [OpenAI](https://openai.com) – powering Luwak’s brain  