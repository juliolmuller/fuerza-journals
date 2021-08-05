import { createContext, FC, useState } from 'react';

type AuthContextProps = {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  function signIn() {
    setAuthenticated(true);
  }

  function signOut() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
