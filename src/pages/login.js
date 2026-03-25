import { authStore } from '../stores/authStore';

export function createLoginPage() {
  const container = document.createElement('div');
  container.className = 'min-h-screen flex items-center justify-center px-4';

  let isSignUp = false;

  const render = () => {
    container.innerHTML = `
      <div class="w-full max-w-md">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              ChaosPrep
            </h1>
            <p class="text-slate-600 dark:text-slate-400">Your AI-powered study companion</p>
          </div>

          <form id="authForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            ${isSignUp ? `
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
            ` : ''}

            <div id="errorMessage" class="hidden p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p class="text-sm text-red-600 dark:text-red-400"></p>
            </div>

            <button
              type="submit"
              id="submitBtn"
              class="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              ${isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div class="mt-6 text-center">
            <button
              id="toggleBtn"
              class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              ${isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>

        <div class="mt-6 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>No Google login • Simple, secure authentication</p>
        </div>
      </div>
    `;

    const toggleBtn = container.querySelector('#toggleBtn');
    const form = container.querySelector('#authForm');
    const submitBtn = container.querySelector('#submitBtn');
    const errorMessage = container.querySelector('#errorMessage');

    toggleBtn.addEventListener('click', () => {
      isSignUp = !isSignUp;
      render();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;

      const email = container.querySelector('#email').value;
      const password = container.querySelector('#password').value;

      if (isSignUp) {
        const confirmPassword = container.querySelector('#confirmPassword').value;
        if (password !== confirmPassword) {
          errorMessage.classList.remove('hidden');
          errorMessage.querySelector('p').textContent = 'Passwords do not match';
          submitBtn.disabled = false;
          return;
        }

        try {
          await authStore.signUp(email, password);
          errorMessage.classList.remove('hidden');
          errorMessage.classList.remove('bg-red-50', 'border-red-200', 'dark:bg-red-900/20', 'dark:border-red-800');
          errorMessage.classList.add('bg-green-50', 'border-green-200', 'dark:bg-green-900/20', 'dark:border-green-800');
          errorMessage.querySelector('p').className = 'text-sm text-green-600 dark:text-green-400';
          errorMessage.querySelector('p').textContent = 'Account created! Check your email to confirm.';
          form.reset();
        } catch (error) {
          errorMessage.classList.remove('hidden');
          errorMessage.querySelector('p').textContent = error.message;
        }
      } else {
        try {
          await authStore.signIn(email, password);
        } catch (error) {
          errorMessage.classList.remove('hidden');
          errorMessage.querySelector('p').textContent = error.message;
        }
      }

      submitBtn.disabled = false;
    });
  };

  render();
  return container;
}
