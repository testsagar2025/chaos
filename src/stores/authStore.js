import { authService } from '../services/authService';

class AuthStore {
  constructor() {
    this.user = null;
    this.loading = true;
    this.error = null;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  getState() {
    return {
      user: this.user,
      loading: this.loading,
      error: this.error,
    };
  }

  async initialize() {
    try {
      this.loading = true;
      const user = await authService.getCurrentUser();
      this.user = user;
      this.error = null;

      authService.onAuthStateChange((event, session) => {
        this.user = session?.user || null;
        this.notify();
      });
    } catch (error) {
      this.error = error.message;
      console.error('Auth initialization error:', error);
    } finally {
      this.loading = false;
      this.notify();
    }
  }

  async signUp(email, password) {
    try {
      this.loading = true;
      this.error = null;
      await authService.signUp(email, password);
      this.notify();
    } catch (error) {
      this.error = error.message;
      this.notify();
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async signIn(email, password) {
    try {
      this.loading = true;
      this.error = null;
      const { user } = await authService.signIn(email, password);
      this.user = user;
      this.notify();
    } catch (error) {
      this.error = error.message;
      this.notify();
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    try {
      this.loading = true;
      await authService.signOut();
      this.user = null;
      this.error = null;
      this.notify();
    } catch (error) {
      this.error = error.message;
      this.notify();
      throw error;
    } finally {
      this.loading = false;
    }
  }
}

export const authStore = new AuthStore();
