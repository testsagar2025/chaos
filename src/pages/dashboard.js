import { authStore } from '../stores/authStore';
import { geminiService } from '../services/geminiService';
import { taskService } from '../services/taskService';

export function createDashboardPage() {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900';

  let currentView = 'overview';
  let tasks = [];
  let aiLoading = false;

  const state = authStore.getState();
  const userEmail = state.user?.email || 'User';

  const showView = (view) => {
    currentView = view;
    render();
  };

  const render = () => {
    container.innerHTML = `
      <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 flex flex-col">
          <div class="mb-8">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChaosPrep
            </h1>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">Study Dashboard</p>
          </div>

          <nav class="space-y-2 flex-1">
            <button class="nav-btn w-full text-left px-4 py-2 rounded-lg transition ${currentView === 'overview' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}"
              onclick="window.dashboardController.showView('overview')">
              <i class="fas fa-chart-line mr-3"></i>Overview
            </button>
            <button class="nav-btn w-full text-left px-4 py-2 rounded-lg transition ${currentView === 'tasks' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}"
              onclick="window.dashboardController.showView('tasks')">
              <i class="fas fa-tasks mr-3"></i>Tasks
            </button>
            <button class="nav-btn w-full text-left px-4 py-2 rounded-lg transition ${currentView === 'ai' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}"
              onclick="window.dashboardController.showView('ai')">
              <i class="fas fa-sparkles mr-3"></i>AI Assistant
            </button>
          </nav>

          <div class="border-t border-slate-200 dark:border-slate-700 pt-4">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                ${userEmail.charAt(0).toUpperCase()}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">${userEmail}</p>
              </div>
            </div>
            <button id="signOutBtn" class="w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
              <i class="fas fa-sign-out-alt mr-2"></i>Sign Out
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-auto">
          <div class="p-8">
            ${this.renderContent()}
          </div>
        </div>
      </div>
    `;

    const signOutBtn = container.querySelector('#signOutBtn');
    signOutBtn.addEventListener('click', async () => {
      await authStore.signOut();
    });

    window.dashboardController = {
      showView: (view) => showView(view),
    };

    if (currentView === 'ai') {
      this.attachAIHandlers(container);
    } else if (currentView === 'tasks') {
      this.attachTaskHandlers(container);
    }
  };

  this.renderContent = () => {
    switch (currentView) {
      case 'overview':
        return this.renderOverview();
      case 'tasks':
        return this.renderTasks();
      case 'ai':
        return this.renderAIAssistant();
      default:
        return '<div></div>';
    }
  };

  this.renderOverview = () => `
    <div>
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">Welcome back!</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Today's Tasks</p>
              <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <i class="fas fa-tasks text-blue-600 dark:text-blue-400"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Study Streak</p>
              <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">0 days</p>
            </div>
            <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <i class="fas fa-fire text-amber-600 dark:text-amber-400"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Questions</p>
              <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <i class="fas fa-check-circle text-green-600 dark:text-green-400"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Start</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onclick="window.dashboardController.showView('tasks')" class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition text-left">
            <i class="fas fa-plus text-blue-600 dark:text-blue-400 text-xl mb-2"></i>
            <p class="font-medium text-slate-900 dark:text-white">Create Task</p>
            <p class="text-sm text-slate-600 dark:text-slate-400">Add a new study task</p>
          </button>
          <button onclick="window.dashboardController.showView('ai')" class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition text-left">
            <i class="fas fa-sparkles text-purple-600 dark:text-purple-400 text-xl mb-2"></i>
            <p class="font-medium text-slate-900 dark:text-white">AI Assistant</p>
            <p class="text-sm text-slate-600 dark:text-slate-400">Get AI-powered help</p>
          </button>
        </div>
      </div>
    </div>
  `;

  this.renderTasks = () => `
    <div>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Tasks</h2>
        <button id="addTaskBtn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <i class="fas fa-plus mr-2"></i>Add Task
        </button>
      </div>

      <div id="taskForm" class="hidden bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
        <h3 class="font-bold text-slate-900 dark:text-white mb-4">Create New Task</h3>
        <form id="newTaskForm" class="space-y-4">
          <input type="text" id="taskTitle" placeholder="Task title" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <select id="taskSubject" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Mathematics</option>
            <option>Biology</option>
          </select>
          <textarea id="taskDesc" placeholder="Description" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
          <div class="flex gap-3">
            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Save Task</button>
            <button type="button" id="cancelTaskBtn" class="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 transition">Cancel</button>
          </div>
        </form>
      </div>

      <div id="tasksList" class="space-y-4">
        <p class="text-slate-600 dark:text-slate-400">No tasks yet. Create one to get started!</p>
      </div>
    </div>
  `;

  this.renderAIAssistant = () => `
    <div>
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">AI Assistant</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 class="font-bold text-slate-900 dark:text-white mb-4">Ask AI for Help</h3>
          <form id="aiForm" class="space-y-4">
            <textarea id="aiPrompt" placeholder="Ask me anything about your studies..." class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" required></textarea>
            <button type="submit" id="aiSubmitBtn" class="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50">
              <i class="fas fa-paper-plane mr-2"></i>Get AI Response
            </button>
          </form>
          <div id="aiResponse" class="hidden mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <p class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">AI Response:</p>
            <div id="responseText" class="text-slate-900 dark:text-white text-sm leading-relaxed"></div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 class="font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button class="w-full p-3 text-left text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition" onclick="window.dashboardController.generateStudyPlan()">
                <i class="fas fa-calendar-alt mr-2 text-blue-600"></i>Generate Study Plan
              </button>
              <button class="w-full p-3 text-left text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition" onclick="window.dashboardController.generateQuiz()">
                <i class="fas fa-question-circle mr-2 text-purple-600"></i>Generate Quiz
              </button>
              <button class="w-full p-3 text-left text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition" onclick="window.dashboardController.generateNotes()">
                <i class="fas fa-book mr-2 text-green-600"></i>Generate Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  this.attachTaskHandlers = (container) => {
    const addTaskBtn = container.querySelector('#addTaskBtn');
    const taskForm = container.querySelector('#taskForm');
    const cancelTaskBtn = container.querySelector('#cancelTaskBtn');
    const newTaskForm = container.querySelector('#newTaskForm');

    addTaskBtn.addEventListener('click', () => {
      taskForm.classList.toggle('hidden');
    });

    cancelTaskBtn.addEventListener('click', () => {
      taskForm.classList.add('hidden');
    });

    newTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = container.querySelector('#taskTitle').value;
      const subject = container.querySelector('#taskSubject').value;
      const desc = container.querySelector('#taskDesc').value;

      console.log('Task created:', { title, subject, desc });
      taskForm.classList.add('hidden');
      newTaskForm.reset();
    });
  };

  this.attachAIHandlers = (container) => {
    const aiForm = container.querySelector('#aiForm');
    const aiSubmitBtn = container.querySelector('#aiSubmitBtn');
    const aiResponse = container.querySelector('#aiResponse');
    const responseText = container.querySelector('#responseText');

    window.dashboardController.generateStudyPlan = async () => {
      const prompt = 'Generate a study plan for Physics covering Motion in a Plane for 7 days';
      aiSubmitBtn.disabled = true;
      aiSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';

      try {
        const response = await geminiService.generateText(prompt);
        responseText.innerHTML = response;
        aiResponse.classList.remove('hidden');
      } catch (error) {
        responseText.textContent = 'Error: ' + error.message;
        aiResponse.classList.remove('hidden');
      } finally {
        aiSubmitBtn.disabled = false;
        aiSubmitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Get AI Response';
      }
    };

    window.dashboardController.generateQuiz = async () => {
      const prompt = 'Generate a 5 question quiz for Physics Chapter: Laws of Motion';
      aiSubmitBtn.disabled = true;
      aiSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';

      try {
        const response = await geminiService.generateText(prompt);
        responseText.innerHTML = response;
        aiResponse.classList.remove('hidden');
      } catch (error) {
        responseText.textContent = 'Error: ' + error.message;
        aiResponse.classList.remove('hidden');
      } finally {
        aiSubmitBtn.disabled = false;
        aiSubmitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Get AI Response';
      }
    };

    window.dashboardController.generateNotes = async () => {
      const prompt = 'Generate comprehensive study notes for Physics topic: Circular Motion';
      aiSubmitBtn.disabled = true;
      aiSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';

      try {
        const response = await geminiService.generateText(prompt);
        responseText.innerHTML = response;
        aiResponse.classList.remove('hidden');
      } catch (error) {
        responseText.textContent = 'Error: ' + error.message;
        aiResponse.classList.remove('hidden');
      } finally {
        aiSubmitBtn.disabled = false;
        aiSubmitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Get AI Response';
      }
    };

    aiForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const prompt = container.querySelector('#aiPrompt').value;
      aiSubmitBtn.disabled = true;
      aiSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';

      try {
        const response = await geminiService.generateText(prompt);
        responseText.innerHTML = response;
        aiResponse.classList.remove('hidden');
      } catch (error) {
        responseText.textContent = 'Error: ' + error.message;
        aiResponse.classList.remove('hidden');
      } finally {
        aiSubmitBtn.disabled = false;
        aiSubmitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Get AI Response';
      }
    });
  };

  render();
  return container;
}
