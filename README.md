# AI Productivity Hub

Build a modern, responsive web application called "AI Workplace Productivity Assistant" that helps professionals automate daily work tasks using AI.

**UI Layout:**
- Clean professional SaaS design with dark/light sidebar navigation
- Dashboard home with feature cards grid
- Each feature on its own page/section accessible from the sidebar
- Card-based layouts, proper loading states, skeleton loaders
- Fully responsive (mobile + desktop)
- Footer disclaimer on every AI output: "⚠️ AI-generated content may require human review"

**Sidebar Navigation items:**
1. Dashboard (home overview)
2. Email Generator
3. Meeting Summarizer
4. Task Planner
5. Research Assistant
6. AI Chat

**Use Lovable AI (useChat or similar) for all AI features with structured prompt engineering.**

---

**Feature 1: Smart Email Generator**
- Inputs: Subject, Key Points (textarea), Tone (dropdown: Professional, Friendly, Formal, Persuasive, Concise), Audience (dropdown: Client, Team, Executive, Vendor, General)
- Structured prompt: Generate a professional email with subject line and body. Tone: {tone}. Audience: {audience}. Key points to cover: {points}. Format with clear paragraphs and appropriate greeting/sign-off.
- Output: Full email with subject line, copy button

**Feature 2: Meeting Notes Summarizer**
- Input: Paste raw meeting notes/transcript (large textarea)
- Structured prompt: Analyze these meeting notes and extract: 1) Executive Summary (2-3 sentences), 2) Key Discussion Points (bullet list), 3) Action Items with owners if mentioned, 4) Deadlines and dates mentioned, 5) Decisions Made. Format clearly with headers.
- Output: Structured summary with sections, copy button

**Feature 3: AI Task Planner**
- Inputs: List of tasks (textarea, one per line), Available hours per day (number input), Deadline (date picker), Priority focus (dropdown: Urgent, Important, Balanced)
- Structured prompt: You are a productivity expert. Given these tasks: {tasks}. Available: {hours} hours/day until {deadline}. Priority focus: {priority}. Create a prioritized daily schedule with: 1) Priority ranking with reasoning, 2) Day-by-day breakdown, 3) Time estimates per task, 4) Risk flags for tight deadlines.
- Output: Structured schedule with priority badges

**Feature 4: AI Research Assistant**
- Inputs: Research topic (text input), Research depth (dropdown: Quick Overview, Detailed Analysis, Comprehensive Report), Output format (dropdown: Bullet Points, Executive Summary, Report Format)
- Structured prompt: Act as an expert research analyst. Research topic: {topic}. Provide a {depth} in {format} format covering: 1) Overview and context, 2) Key findings and insights, 3) Important statistics or data points, 4) Expert perspectives, 5) Practical implications, 6) Further reading suggestions.
- Output: Structured research report

**Feature 5: AI Chatbot Interface**
- Full chat interface with message bubbles (user right, AI left)
- System prompt: You are a professional workplace productivity assistant. Help with work tasks, drafting, planning, analysis, and professional communication. Be concise, actionable, and professional.
- Chat history in session, clear chat button
- Typing indicator while generating

**Dashboard Home:**
- Welcome card with user greeting
- 5 feature cards with icon, title, description, and "Open" button
- Quick stats row (e.g., "5 AI Tools Available", "Powered by AI", "Professional Grade")
- Recent activity section placeholder

**Tech: React + TypeScript + Tailwind + shadcn/ui components. Use Lovable AI for all AI calls.**

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ai-workflow-co-pilot.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/303dc101-91c6-426b-90cd-d554a51a3c44).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
