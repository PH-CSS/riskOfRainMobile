// hooks/authStore.ts
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

interface AuthState {
  user: any;
  loading: boolean;
  authChecked: boolean;
}

// Estado global singleton
let globalAuthState: AuthState = {
  user: null,
  loading: true,
  authChecked: false
};

let listeners: ((state: AuthState) => void)[] = [];
let unsubscribe: (() => void) | null = null;

// Inicializa uma única vez
function initializeAuth() {
  if (unsubscribe) return; // Já inicializado

  console.log('🔍 AuthStore inicializado - ÚNICA VEZ');

  unsubscribe = onAuthStateChanged(auth, (userAuth: User | null) => {
    console.log('🔄 Auth state changed no Store:', userAuth?.email);

    const newUser = userAuth ? {
      uid: userAuth.uid,
      email: userAuth.email,
      name: userAuth.displayName || userAuth.email?.split('@')[0] || 'Usuário'
    } : null;

    globalAuthState = {
      user: newUser,
      loading: false,
      authChecked: true
    };

    // Notifica todos os listeners
    listeners.forEach(listener => listener(globalAuthState));
  });
}

export function useAuthStore() {
  const [state, setState] = useState<AuthState>(globalAuthState);

  useEffect(() => {
    // Inicializa na primeira vez que alguém usa
    initializeAuth();

    // Adiciona este componente como listener
    const listener = (newState: AuthState) => {
      setState(newState);
    };
    
    listeners.push(listener);

    return () => {
      // Remove o listener quando componente desmonta
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return state;
}