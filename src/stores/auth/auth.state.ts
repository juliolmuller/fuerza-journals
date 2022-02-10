import { AuthState } from './auth.types';

const storageKey = process.env.REACT_APP_AUTH_STORAGE_KEY as string;
const storageText = sessionStorage.getItem(storageKey);
const storage = storageText ? JSON.parse(storageText) : { user: null, token: null };

const authStoreState: AuthState = {
  isAuthenticated: Boolean(storage.token),
  user: storage.user,
};

export default authStoreState;
