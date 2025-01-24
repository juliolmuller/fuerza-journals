import { StoreApi } from 'zustand';

import http from '~/services/api';

import { AuthActions, AuthStore } from './auth.types';

function authStoreActions(
  set: StoreApi<AuthStore>['setState'],
  get: StoreApi<AuthStore>['getState'],
): AuthActions {
  function resolveAuthentication(user: any = null, token: any = null) {
    const storageKey = import.meta.env.VITE_AUTH_STORAGE_KEY as string;

    set({ user, isAuthenticated: Boolean(token) });
    if (user && token) {
      sessionStorage.setItem(storageKey, JSON.stringify({ user, token }));
    }
  }

  async function signIn(username: string, password: string) {
    const data = { username, password };
    const auth: any = await http.post('/auth/login', data);
    const { user, token } = auth;
    resolveAuthentication(user, token);
  }

  async function signUp(username: string, password: string, email?: string) {
    const data = { email, username, password };
    const auth: any = await http.post('/auth/signup', data);
    const { user = null, token = null } = auth;
    resolveAuthentication(user, token);
  }

  async function signOut() {
    const storageKey = import.meta.env.VITE_AUTH_STORAGE_KEY as string;
    set({ user: null, isAuthenticated: false });
    sessionStorage.removeItem(storageKey);
  }

  return {
    signIn,
    signUp,
    signOut,
  };
}

export default authStoreActions;
