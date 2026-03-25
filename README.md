# ChaosPrep - AI-Powered Study Dashboard

A modern, dashboard-focused study management application with Supabase authentication and Gemini API integration.

## Features

- **Simple Email/Password Authentication** - No social login, clean and secure
- **Dashboard-First Design** - Direct login to dashboard, no landing page
- **AI Assistant Integration** - Powered by Google Gemini API
  - Generate study plans
  - Create quizzes
  - Generate study notes
  - Analyze errors
  - Custom AI prompts
- **Task Management** - Organize study tasks by subject
- **Analytics Dashboard** - Track study progress and streaks
- **Responsive Design** - Works seamlessly on desktop and mobile

## Setup

### Prerequisites

- Node.js 16+ and npm
- Supabase account
- Google Gemini API key

### 1. Clone and Install

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Set Up Supabase

1. Create a new Supabase project
2. Go to SQL Editor and run:

```sql
-- Create tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE
  USING (auth.uid() = user_id);
```

### 4. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to `.env.local` as `VITE_GEMINI_API_KEY`

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── pages/
│   ├── login.js          # Login/signup page
│   └── dashboard.js      # Main dashboard
├── services/
│   ├── supabaseClient.js # Supabase client
│   ├── authService.js    # Authentication logic
│   ├── geminiService.js  # Gemini AI integration
│   └── taskService.js    # Task management
├── stores/
│   └── authStore.js      # Authentication state
└── main.js               # App entry point
```

## Authentication Flow

1. User visits app
2. AuthStore initializes and checks for existing session
3. If authenticated → Dashboard
4. If not authenticated → Login page
5. User can sign up or sign in with email/password
6. Session persists via Supabase

## AI Features

### Generate Study Plan
Creates a structured study plan for a subject/topic over N days

### Generate Quiz
Creates a quiz with multiple choice questions and answers

### Generate Notes
Produces comprehensive study notes on a topic

### Analyze Errors
Provides insights on common mistakes and improvement strategies

### Custom Prompts
Send any custom prompt to the Gemini API for AI-powered responses

## Technology Stack

- **Frontend**: Vanilla JS, Tailwind CSS, Vite
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **AI**: Google Gemini API
- **Deployment**: Ready for Vercel/Netlify

## Troubleshooting

### "Missing Supabase configuration"
- Check that `.env.local` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### "Gemini API not configured"
- AI features will be disabled, add `VITE_GEMINI_API_KEY` to enable

### "Cannot read property of undefined"
- Ensure Supabase tables exist with correct schema

## License

MIT
