# ChaosPrep Architecture

## Overview

ChaosPrep is a dashboard-first study application with modern cloud infrastructure:
- **Frontend**: Vanilla JavaScript with Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: Google Gemini API
- **Bundler**: Vite

## Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─→ authStore.initialize()
       │   └─→ authService.getCurrentUser()
       │       └─→ Supabase.auth.getUser()
       │
       ├─ Session exists?
       │   YES → Dashboard
       │   NO  → Login Page
       │
       └─→ User submits credentials
           ├─ Sign Up: authService.signUp(email, password)
           └─ Sign In: authService.signInWithPassword(email, password)
               └─→ Supabase Auth handles
                   └─→ JWT token issued
                       └─→ Stored in browser
                           └─→ Auto-sent with requests
```

## Component Architecture

### State Management (Store Pattern)

**authStore.js**: Single source of truth for auth state
```javascript
{
  user: { id, email, ... },
  loading: false,
  error: null,
  listeners: [...]
}
```

Subscribers get notified on state changes → UI re-renders

### Page Structure

#### Login Page (`pages/login.js`)
- Single component with two modes: Sign In / Sign Up
- Email validation
- Password confirmation
- Error messaging
- No external libraries (pure HTML form)

#### Dashboard Page (`pages/dashboard.js`)
- Sidebar navigation
- Three views:
  - **Overview**: Stats and quick actions
  - **Tasks**: CRUD operations
  - **AI Assistant**: Chat with Gemini

### Services (API Layers)

#### authService.js
```javascript
- signUp(email, password)
- signIn(email, password)
- signOut()
- getCurrentUser()
- onAuthStateChange(callback) // Listener
```

#### geminiService.js
```javascript
- generateText(prompt)
- generateStudyPlan(subject, topics, duration)
- generateQuiz(chapter, difficulty)
- analyzeErrors(errors)
- generateNotes(topic)
```

#### taskService.js
```javascript
- createTask(task)
- getTasks(userId)
- updateTask(id, updates)
- deleteTask(id)
- getTasksByDate(userId, date)
```

#### supabaseClient.js
- Single Supabase client instance
- Shared by all services
- Handles authentication state

## Data Flow

### Sign In → Dashboard

```
User Input (Email/Password)
    ↓
authStore.signIn()
    ↓
authService.signIn()
    ↓
supabase.auth.signInWithPassword()
    ↓
Supabase API (JWT validation)
    ↓
Token issued + cached in browser
    ↓
authStore updates state
    ↓
All subscribers notified
    ↓
main.js renders Dashboard
```

### Create Task

```
User fills form
    ↓
taskForm.submit()
    ↓
taskService.createTask({
  user_id: currentUser.id,
  title: "...",
  subject: "Physics",
  description: "..."
})
    ↓
supabase.from('tasks').insert()
    ↓
RLS policies check: auth.uid() == user_id
    ↓
PostgreSQL INSERT
    ↓
Success → Clear form
    ↓
Optional: Fetch updated tasks list
```

### AI Assistant Flow

```
User types prompt
    ↓
aiForm.submit()
    ↓
geminiService.generateText(prompt)
    ↓
GoogleGenerativeAI.generateContent()
    ↓
Gemini API processes
    ↓
Response streamed back
    ↓
Display in UI
```

## Security

### Authentication Security
- Passwords hashed by Supabase
- JWTs issued with expiration
- Auto-refresh via Supabase SDK
- No passwords stored locally

### Database Security (RLS)
```sql
-- Every table has RLS enabled
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policies restrict data access
CREATE POLICY "Users can read own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);
```

### API Key Security
- Gemini API key stored in `.env.local` (not committed)
- Only frontend can access (rate limited by Gemini)
- ANON_KEY used for Supabase (limited permissions)

## Rendering Strategy

### Dynamic Content Rendering
Pages use `innerHTML` for simplicity:
```javascript
container.innerHTML = `
  <div class="...">
    ${expression}
  </div>
`;
```

Pros:
- No build step for components
- Simple event binding
- Great for small apps

Cons:
- No virtual DOM (re-renders everything)
- XSS risk if not careful

## Directory Structure

```
src/
├── main.js                 # Entry point
├── style.css              # Tailwind + custom styles
├── pages/
│   ├── login.js          # Login/signup page
│   └── dashboard.js      # Main dashboard with views
├── services/
│   ├── supabaseClient.js # Supabase instance
│   ├── authService.js    # Auth operations
│   ├── geminiService.js  # Gemini API wrapper
│   └── taskService.js    # Task CRUD
└── stores/
    └── authStore.js      # Auth state management
```

## Deployment Considerations

### Environment Variables
```
Development: .env.local (not committed)
Staging: .env.staging (CI/CD)
Production: Secret manager (Vercel, Netlify, etc.)
```

### Build Output
```
npm run build → dist/
├── index.html (18KB)
├── assets/
│   ├── index-HASH.css (6.5KB gzipped)
│   └── index-HASH.js (220KB uncompressed, 57KB gzipped)
```

### Browser Support
- Modern browsers (ES2020+)
- Chrome, Firefox, Safari, Edge
- No IE11 support

## Performance Optimizations

1. **Code Splitting**: Vite handles automatically
2. **Tree Shaking**: Unused code removed in build
3. **Lazy Loading**: Services loaded on demand
4. **Caching**: Browser caches JS/CSS with hash
5. **Minification**: CSS and JS minified

## Scalability Path

### Current
- Single user auth
- Client-side state
- No persistence beyond Supabase

### Future Enhancements
1. **Squad feature**: Real-time multiplayer
   - Supabase Realtime channels
   - WebSocket connections
   - Live task sharing

2. **Advanced analytics**
   - Store metrics in separate table
   - Build dashboard with charts
   - Export study reports

3. **Mobile app**
   - React Native version
   - Same Supabase backend
   - Push notifications

4. **Offline support**
   - Service worker
   - IndexedDB for offline data
   - Sync on reconnect

## Technology Choices

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Vanilla JS | Simple, no dependencies |
| Styling | Tailwind | Utility-first, fast development |
| Bundler | Vite | Fast, modern, ES modules |
| Auth | Supabase Auth | Simple, built-in |
| Database | PostgreSQL | Powerful, scalable, free tier |
| AI | Gemini API | Free tier, good quality |

## Monitoring & Debugging

### Debug Mode
Add `?debug=true` to URL for enhanced logging

### Error Tracking
Console logs include:
- Auth errors with status codes
- API errors from Supabase
- Gemini API errors
- Form validation errors

## Future Roadmap

- [ ] Dark mode toggle
- [ ] Export tasks to PDF
- [ ] Share study plans
- [ ] Mobile responsive (in progress)
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Spaced repetition scheduler
- [ ] Flashcard integration
