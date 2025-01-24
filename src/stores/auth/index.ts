import { create as createStore } from 'zustand';

import actions from './auth.actions';
import initialState from './auth.state';
import { AuthStore } from './auth.types';

const useAuthStore = createStore<AuthStore>((set, get) => ({
  ...initialState,
  ...actions(set, get),
}));

export default useAuthStore;
