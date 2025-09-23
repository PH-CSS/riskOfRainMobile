// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXaWhw_wY6K_nLa9te_SfuXJGRKCoi_ro",
  authDomain: "riskofrainmobile.firebaseapp.com",
  projectId: "riskofrainmobile",
  storageBucket: "riskofrainmobile.firebasestorage.app",
  messagingSenderId: "1092207535730",
  appId: "1:1092207535730:web:fc833a995d9466594684eb",
  measurementId: "G-M3HX6ZP7Z2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});