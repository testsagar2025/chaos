# Next Steps to Get Started

## Before Running the App

### Step 1: Create Supabase Project (5 min)
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name it "ChaosPrep"
4. Save your password
5. Wait for project to initialize

### Step 2: Get Supabase Keys (2 min)
1. In Supabase dashboard, go to **Settings → API**
2. Copy these two values:
   - Project URL (under "Project URL")
   - Anon Public Key (under "Project API keys")

### Step 3: Set Up Database (3 min)
1. Go to **SQL Editor** in Supabase
2. Copy the SQL from this command:
   ```bash
   cat << 'EOF'
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

   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

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
   EOF
   ```
3. Paste in Supabase SQL Editor
4. Click "Run"

### Step 4: Get Gemini API Key (2 min)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 5: Configure App (2 min)
1. In project folder, create `.env.local`:
   ```
   VITE_SUPABASE_URL=your_project_url_from_step_2
   VITE_SUPABASE_ANON_KEY=your_anon_key_from_step_2
   VITE_GEMINI_API_KEY=your_api_key_from_step_4
   ```

### Step 6: Run App (1 min)
```bash
npm install  # One time only
npm run dev
```

Visit `http://localhost:5173`

## Testing the App

### Test Sign Up
1. Click "Don't have an account? Sign Up"
2. Enter email: `test@example.com`
3. Password: `Test123!`
4. Confirm: `Test123!`
5. Click "Create Account"
6. Should see success message

### Test Sign In
1. Click "Already have an account? Sign In"
2. Enter same email and password
3. Click "Sign In"
4. Should go to Dashboard

### Test Tasks
1. Click "Tasks" in sidebar
2. Click "Add Task"
3. Fill in:
   - Title: "Study Physics"
   - Subject: "Physics"
   - Description: "Learn Motion"
4. Click "Save Task"

### Test AI
1. Click "AI Assistant" in sidebar
2. Click "Generate Study Plan"
3. Wait for AI response (will take a few seconds)
4. Or type custom prompt and submit

## Troubleshooting

### Build Error: "Supabase configuration missing"
- Check `.env.local` has both URL and ANON_KEY
- Restart dev server: `npm run dev`

### Auth not working
- Verify Supabase project is initialized
- Check `.env.local` has correct credentials
- Make sure database table exists

### AI features disabled
- Add `VITE_GEMINI_API_KEY` to `.env.local`
- Restart dev server
- Or just skip if you don't need AI

### Blank page after login
- Check browser console (F12)
- Look for red error messages
- Copy error and search online

## Files to Know

| File | Purpose |
|------|---------|
| `.env.local` | Your credentials (keep secret!) |
| `src/main.js` | App entry point |
| `src/pages/login.js` | Login/signup UI |
| `src/pages/dashboard.js` | Main dashboard |
| `README.md` | Quick reference |
| `SETUP_GUIDE.md` | Detailed setup |

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check TypeScript errors (if added later)
npm run type-check
```

## What's Included

✅ Email/password authentication
✅ Dashboard with 3 views (Overview, Tasks, AI)
✅ Task management (CRUD)
✅ AI assistant (study plans, quizzes, notes)
✅ Mobile responsive design
✅ Production-ready code
✅ Complete documentation

## What's NOT Included (Yet)

❌ Google/GitHub login (removed as requested)
❌ Landing page (removed as requested)
❌ Real-time collaboration
❌ Mobile app (web only)
❌ Notifications/reminders
❌ Advanced analytics
❌ Dark mode toggle (Tailwind supports it, just add button)

## Need Help?

1. **Setup issues**: See `SETUP_GUIDE.md`
2. **Technical questions**: See `ARCHITECTURE.md`
3. **Code issues**: Check `src/` folder comments
4. **Deployment**: Follow readme in `README.md`

## Quick Deployment (Vercel)

Once app works locally:

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your_repo_url
git push -u origin main

# 2. Go to vercel.com
# 3. Import repository
# 4. Add environment variables in Vercel dashboard:
#    - VITE_SUPABASE_URL
#    - VITE_SUPABASE_ANON_KEY
#    - VITE_GEMINI_API_KEY
# 5. Deploy!
```

Your app is live!

## Time Estimate

| Task | Time |
|------|------|
| Create Supabase project | 5 min |
| Get API keys | 5 min |
| Configure `.env.local` | 2 min |
| Run app | 2 min |
| Test features | 5 min |
| **Total** | **19 min** |

---

**Ready to go?** Start with Step 1 above! 🚀
