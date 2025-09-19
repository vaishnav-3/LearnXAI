
# 🚀 LearnX-AI – The AI-Powered Smart Learning Platform

LearnX-AI is an open-source, full-stack platform designed to revolutionize how students and self-learners interact with learning material. It combines the power of AI, video content, interactive quizzes, and PDF processing into a unified microlearning experience.

## 📚 Features

### 1. AI Notes Generation Tool
- Generate structured notes from any topic or keyword
- Fetch relevant YouTube videos for deeper understanding
- Auto-generate flashcards for revision
- Quizzes to test topic understanding
- Q&A section with preloaded and dynamic questions

### 2. PDF Interaction Tool  [🔗 Repo](https://github.com/vaishnav-3/AI-PDF)
- Upload any PDF (textbook, notes, research paper)
- Chat with your PDFs contextually
- Summarize content (page-wise or chapter-wise)
- Extract important points and answer custom queries


## 🧰 Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS + Ripple UI
- Lucide React
- Swiper.js
- React Card Flip
- Styled Components

### Backend
- Node.js
- Inngest (for background tasks & event-driven logic)
- Clerk (authentication)
- Serverless Functions (Vercel)

### Database
- Neon Serverless PostgreSQL (via Drizzle ORM)
- ConvexDB (real-time sync and storage)

### AI & Tools
- Google Gemini API
- LangChain (for document querying)

---

## ⚙️ Getting Started

To run LearnX-AI locally, follow the steps below:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/learnx-ai.git
cd learnx-ai
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a file called `.env.local` in the root directory and add the following:

```env
NEXT_PUBLIC_DATABASE_CONNECTION_STRING=your_neon_postgres_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_data_api_key
```

> 📌 Make sure you get the required API keys from:
>
> * [Google Gemini API](https://aistudio.google.com/app/apikey)
> * [YouTube Data API](https://console.cloud.google.com/)
> * [Clerk](https://clerk.dev/)
> * [Neon Database](https://neon.tech/)
> * [ConvexDB](https://www.convex.dev/)

---

## 🔄 Running Locally


### Run Inngest locally (for background jobs)

```bash
npx inngest-cli@latest dev
```

### Run Drizzle Studio (to explore DB schema visually)

```bash
npx drizzle-kit studio
```

### Start the development server

```bash
npm run dev
```


---

## 🌐 Live Demo

Try out the live version here:
🔗 [Live Project](https://learnxai-three.vercel.app/)

---

## 💻 Open Source

Contributions are welcome! This project is open-source and available on GitHub:

🔗 [GitHub Repository](https://github.com/vaishnav-3/LearnXAI)

Feel free to fork it, raise issues, and submit pull requests!

---

## 📂 Project Structure (Simplified)

```
/app                → Next.js App Router components  
/components         → UI components (Cards, Inputs, Layouts)  
/lib                → Utilities (YouTube, Gemini, LangChain handlers)  
/pages/api          → Serverless API endpoints  
/drizzle            → DB schema & config (Drizzle ORM)  
/inngest            → Event-driven workflows  
/public             → Static assets  
.env.local          → Environment configuration  
```

---

## 🎯 Goal

> "To create a smarter, AI-powered microlearning platform that allows users to learn, revise, interact, and grow — all from one intelligent interface."

---

## 🧠 Contribution Guidelines

1. Fork the repository
2. Create a new branch: `git checkout -b your-feature-name`
3. Make your changes and commit: `git commit -m "Added new feature"`
4. Push to your fork: `git push origin your-feature-name`
5. Open a pull request

Make sure to write clean, modular, and well-documented code. 😊

---




