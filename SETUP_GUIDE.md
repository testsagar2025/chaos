# ChaosPrep Setup Guide

## Complete Setup Instructions

### Step 1: Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings → API** and copy:
   - `VITE_SUPABASE_URL` (Project URL)
   - `VITE_SUPABASE_ANON_KEY` (Anon Public Key)

4. Go to **SQL Editor** and paste this SQL:

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

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "Users can read own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE
  USING (auth.uid() = user_id);
```

### Step 2: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the key
4. Note: Gemini API has a free tier with rate limits

### Step 3: Configure Environment Variables

Create `.env.local` file in project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

**Important**: Never commit `.env.local` to git!

### Step 4: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## First Time User Flow

1. **Sign Up**: Email + Password
2. **Email Confirmation**: Check email (if enabled in Supabase)
3. **Dashboard**: Automatically redirected after auth
4. **Explore Features**:
   - Create tasks
   - Use AI Assistant
   - View analytics

## Features Explained

### Dashboard Overview
- **Today's Tasks**: Count of tasks created today
- **Study Streak**: Consecutive days of activity
- **Total Questions**: Questions answered/solved
- **Quick Start**: Shortcuts to main features

### Tasks Management
- Create tasks with subject and description
- Organize by subject (Physics, Chemistry, Maths, Biology)
- Simple to-do list for study planning

### AI Assistant
Three quick action buttons:
- **Generate Study Plan**: Creates a 7-day study plan for a subject
- **Generate Quiz**: Creates 5-question quiz on a topic
- **Generate Notes**: Comprehensive notes on a topic

Or ask custom questions directly.

## Troubleshooting

### "Gemini API not configured"
- This warning is normal if you haven't set `VITE_GEMINI_API_KEY`
- AI features will be disabled until configured
- Other features work fine

### "Missing Supabase configuration"
- Check `.env.local` has both URL and ANON_KEY
- Restart dev server after adding env variables

### Can't sign up/in
- Check Supabase project is active
- Verify email/password are valid format
- Check browser console for detailed errors

### AI responses slow
- Gemini API free tier has rate limits
- Wait a few seconds between requests
- Or upgrade to paid plan for higher limits

## Deployment

### Build for Production
```bash
npm run build
```

Output goes to `dist/` folder

### Deploy to Vercel
1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify
1. Push code to GitHub
2. Create site in [Netlify](https://netlify.com)
3. Set environment variables
4. Deploy!

## Database Schema

### tasks table
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | Links to auth.users |
| title | TEXT | Task name |
| description | TEXT | Task details |
| subject | TEXT | Physics, Chemistry, etc |
| status | TEXT | pending, in-progress, completed |
| created_at | TIMESTAMPTZ | Auto-set |
| updated_at | TIMESTAMPTZ | Auto-set |

## Architecture

```
Browser
   ↓
Vue/JS (Dashboard)
   ↓
Supabase SDK
   ├→ Auth (Email/Password)
   ├→ PostgreSQL (Tasks)
   └→ Realtime (Live updates)
   ↓
Gemini API (AI Features)
```

## Next Steps

1. **Customize**: Add more task fields
2. **Analytics**: Track study metrics
3. **Notifications**: Add reminders
4. **Social**: Share study plans with squad
5. **Mobile**: Optimize for mobile
6. **Themes**: Add light/dark mode toggle

## Support

Check `README.md` for more details.
