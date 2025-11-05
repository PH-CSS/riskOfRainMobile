// config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: "AIzaSyCRy_4MU5_bsuKiCyRY8FBcmUcudbpRX1A",
  authDomain: "ror-server.firebaseapp.com",
  databaseURL: "https://ror-server-default-rtdb.firebaseio.com",
  projectId: "ror-server",
  storageBucket: "ror-server.firebasestorage.app",
  messagingSenderId: "469880511061",
  appId: "1:469880511061:web:f19f68ed3ed12bf98212dc",
  measurementId: "G-9BX6JSWN88"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);


// GoogleSignin.configure({
//   webClientId: '469880511061-jg0pghl82nq6lqo2mmkt00c5jp1aklpl.apps.googleusercontent.com', 
// });

// Inicializa Auth com tipo específico
let auth: Auth;

try {
  // Tenta usar a nova API com persistência
  const { initializeAuth, getReactNativePersistence } = require("firebase/auth");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  console.log("✅ Auth inicializado com persistência");
} catch (error) {
  console.log("⚠️  Usando auth padrão (sem persistência):", error);
  // Fallback para auth padrão
  auth = getAuth(app);
}

// Database
export const dbFB = getDatabase(app);

// Storage - NOVO
export const storage = getStorage(app);

export { auth };