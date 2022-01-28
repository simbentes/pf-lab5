import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
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

export const terminarSessao = () => {
  signOut(auth);
};

export const guardarNoticia = async (
  id_utilizador,
  id_noticia,
  obj_noticia
) => {
  const db = getFirestore();

  console.log("ola");
  console.log(id_utilizador);

  const docRef = doc(db, "utilizadores", id_utilizador);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const utilizadorRef = doc(db, "utilizadores", id_utilizador);
    console.log("Document data:", docSnap.data());
    await updateDoc(utilizadorRef, {
      noticia_guardada: arrayUnion({
        id: id_noticia,
        fonte: obj_noticia.fonte,
        titulo: obj_noticia.titulo,
        img: obj_noticia.img,
        body: obj_noticia.raw_body,
      }),
    });
  } else {
    const docData = {
      noticia_guardada: [
        {
          id: id_noticia,
          fonte: obj_noticia.fonte,
          titulo: obj_noticia.titulo,
          img: obj_noticia.img,
          body: obj_noticia.raw_body,
        },
      ],
    };
    await setDoc(doc(db, "utilizadores", id_utilizador), docData);
  }
};
