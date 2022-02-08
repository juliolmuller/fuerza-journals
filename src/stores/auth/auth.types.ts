import {User} from '../../interfaces'

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

export interface AuthActions {
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, email?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;
