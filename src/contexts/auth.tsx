import { createContext, FC } from 'react';
import { useLocalStorage } from 'react-use';
import http from '../services/api';

type User = {
  id: number;
  email: string;
  username: string;
};

type Storage = {
  user: User;
  token: string;
};

type AuthContextProps = {
  user?: User;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => void;
  signUp: (username: string, password: string, email?: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: FC = ({ children }) => {
  const [storage, setStorage, destroyStorage] = useLocalStorage<Storage>('FORZA::auth');

  const user = storage?.user;
  const isAuthenticated = Boolean(user);

  async function signIn(username: string, password: string) {
    const data = { username, password };
    const storage: Storage = await http.post('/auth/login', data);

    setStorage(storage);
  }

  async function signUp(username: string, password: string, email?: string) {
    const data = { email, username, password };
    const storage: Storage = await http.post('/auth/signup', data);

    setStorage(storage);
  }

  async function signOut() {
    destroyStorage();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
