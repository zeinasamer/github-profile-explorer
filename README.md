# GitHub Profile Explorer

A modern GitHub profile explorer built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **OpenRouter AI**.

Search GitHub users, browse their repositories, compare two profiles, save personal notes, and chat with AI about any repository.

---

## Highlights

- Built with Next.js App Router
- Uses GitHub REST API
- Streams AI responses in real time
- Stores notes and chat history in Local Storage
- Repository-aware AI assistant using OpenRouter
- User comparison dashboard


---

## Features

- Search any GitHub user
- View profile information
- Browse repositories
- AI repository chat
  - Understand what a repository does
  - Ask follow-up questions
  - Streaming AI responses
  - Conversation history saved in Local Storage
- Personal notes for users and repositories
- Compare two GitHub users
- AI-generated profile summary
- Local storage persistence
- Responsive UI built with Tailwind CSS

---

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- OpenRouter API
- GitHub REST API

---

## Installation

Clone the repository

```bash
git clone https://github.com/zeinasamer/github-profile-explorer.git
```

Go into the project

```bash
cd github-profile-explorer
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file

```env
OPENROUTER_API_KEY=your_api_key_here
```

Run the development server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| OPENROUTER_API_KEY | API key from OpenRouter |

---

## Project Structure

```
app/
components/
lib/
types/
public/
```

---

## Author

Zeina Samer

GitHub:
https://github.com/zeinasamer

---

## License

This project is licensed under the MIT License.
