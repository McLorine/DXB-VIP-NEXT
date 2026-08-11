/**
 * AuthContext — lightweight auth context that does NOT depend on base44.
 *
 * For this marketing site, users are never required to log in before
 * viewing content. The context simply exposes a "not authenticated" state
 * so any component that reads it still works without crashing.
 *
 * If you add real authentication later, replace the stubs below with
 * your auth-provider calls (JWT, OAuth, Supabase, Firebase, etc.).
 */
import React, { createContext, useContext } from 'react';

type AuthContextValue = {
  user: any | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: any | null;
  appPublicSettings: any | null;
  authChecked: boolean;
  logout: () => void;
  navigateToLogin: () => void;
  checkUserAuth: () => Promise<void>;
  checkAppState: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const value: AuthContextValue = {
    user: null,
    isAuthenticated: false,
    isLoadingAuth: false,
    isLoadingPublicSettings: false,
    authError: null,
    appPublicSettings: null,
    authChecked: true,
    logout: () => {},
    navigateToLogin: () => { window.location.href = '/login'; },
    checkUserAuth: async () => {},
    checkAppState: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
