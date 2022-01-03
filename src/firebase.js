import { useEffect, useState } from "react";
import { initializeApp, signOut } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithRedirect,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK08KFCBsi5km9CoCizj4dZ1DwxB3qmf0",
  authDomain: "pf-lab5.firebaseapp.com",
  projectId: "pf-lab5",
  storageBucket: "pf-lab5.appspot.com",
  messagingSenderId: "665266284817",
  appId: "1:665266284817:web:d0b94832ff8da6c03904b0",
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
