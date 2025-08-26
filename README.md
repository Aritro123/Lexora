# 🤖 Lexora Chatbot

An AI-powered chatbot built with **Next.js (frontend)** and **Node.js + Express (backend)**, powered by **LangChain + Ollama (Mistral model)**.  

It provides an elegant UI, dark mode, and real-time conversations with memory.

---

## ✨ Features

- 🌙 **Dark/Light Mode Toggle**  
- 💬 **Real-time chat interface** with smooth animations  
- 🧠 **Conversation memory** using LangChain BufferMemory  
- 🎨 **Modern UI** with TailwindCSS and Lucide Icons  
- ⚡ **Local AI** responses via Ollama + Mistral  

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js 15](https://nextjs.org/) (React 19 + Turbopack)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

**Backend**
- [Node.js + Express](https://expressjs.com/)
- [LangChain](https://www.langchain.com/)
- [Ollama](https://ollama.ai/) (Mistral model)
- [BufferMemory](https://js.langchain.com/docs/modules/memory)

---

## 📂 Project Structure


lexora-chatbot/
│
├── client/ # Next.js frontend
│ ├── package.json
│ ├── app/page.tsx # Chat UI
│ └── ...
│
├── server/ # Node.js backend
│ ├── package.json
│ ├── server.js # Express API server
│
└── README.md # Documentation




---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone git@github.com:Aritro123/Lexora.git
cd Lexora



2️⃣ Backend Setup
cd server
npm install
npm run dev


Runs on: http://localhost:5000


3️⃣ Frontend Setup
cd ../client
npm install
npm run dev


Runs on: http://localhost:3000




🚀 Usage

Open http://localhost:3000

Type a message and hit Enter or click Send

The bot will reply using Mistral via Ollama

Toggle 🌙 / ☀️ for dark/light mode

📡 API Endpoint
POST /chat

Send a message to the bot and receive a response.

Request

{
  "message": "Hello, who are you?"
}


Response

{
  "reply": "Hi! I'm Lexora, your AI assistant."
}

🔒 Access & Security

Only repo owner (Aritro123) has push access

Others can view/clone but cannot push changes

Optional branch protection can prevent force pushes

📜 License

This project is licensed under the MIT License.