import './style.css';
import { authStore } from './stores/authStore';
import { createLoginPage } from './pages/login';
import { createDashboardPage } from './pages/dashboard';

const app = document.getElementById('app');

function renderApp(state) {
  app.innerHTML = '';

  if (state.loading) {
    app.innerHTML = `
      <div class="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div class="text-center">
          <div class="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 animate-spin mx-auto mb-4"></div>
          <p class="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    `;
    return;
  }

  if (state.user) {
    app.appendChild(createDashboardPage());
  } else {
    app.appendChild(createLoginPage());
  }
}

authStore.subscribe(renderApp);
authStore.initialize();
