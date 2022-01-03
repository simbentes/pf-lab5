import { useEffect, useState } from "react";
import { initializeApp, signOut } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithRedirect,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API,
  authDomain: process.env.REACT_APP_FB_URL,
  projectId: process.env.REACT_APP_FB_PROJECT,
  storageBucket: process.env.REACT_APP_FB_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_SENDER,
  appId: process.env.REACT_APP_FB_APP,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const useAuth = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return user;
};
