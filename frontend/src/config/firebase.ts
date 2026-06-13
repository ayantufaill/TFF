import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

const defaultAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const productionAuthDomain =
  import.meta.env.VITE_FIREBASE_PRODUCTION_AUTH_DOMAIN || defaultAuthDomain;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.PROD ? productionAuthDomain : defaultAuthDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let authInstance: Auth | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  googleProviderInstance = new GoogleAuthProvider();
  googleProviderInstance.addScope('email');
  googleProviderInstance.addScope('profile');
  googleProviderInstance.setCustomParameters({
    prompt: 'select_account',
  });
} else {
  console.warn('Firebase client configuration is missing. Google login is disabled for this local session.');
}

export const auth = authInstance;
export const googleProvider = googleProviderInstance;
