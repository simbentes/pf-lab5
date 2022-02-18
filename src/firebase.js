import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { getAuth, onAuthStateChanged, reauthenticateWithRedirect } from "firebase/auth";

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

export const guardarNoticia = async (id_noticia, obj_noticia, checked) => {
  const db = getFirestore();
  const docRef = doc(db, "noticias_guardadas", auth.currentUser.uid);
  if (checked) {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const utilizadorRef = doc(db, "noticias_guardadas", auth.currentUser.uid);
      await updateDoc(utilizadorRef, {
        noticia_guardada: arrayUnion({
          id: id_noticia,
          fonte: obj_noticia.fonte,
          titulo: obj_noticia.titulo,
          img: obj_noticia.img,
          data: obj_noticia.data,
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
            data: obj_noticia.data,
          },
        ],
      };
      await setDoc(doc(db, "noticias_guardadas", auth.currentUser.uid), docData);
    }
  } else {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const noticias_todas = await docSnap.data().noticia_guardada;

      await updateDoc(docRef, {
        noticia_guardada: noticias_todas.filter((noticia) => noticia.id !== id_noticia),
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
};

export const nGuardadas = async () => {
  const db = getFirestore();
  const docRef = await doc(db, "noticias_guardadas", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const isGuardado = async (noticia_id) => {
  const db = getFirestore();
  const docRef = await doc(db, "noticias_guardadas", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return (
      docSnap.data().noticia_guardada.some((obj) => {
        return obj.id === noticia_id;
      }) === true
    );
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const definicoesAudio = async (genero, vel, pitch) => {
  const db = getFirestore();
  const docRef = doc(db, "definicoes_audio", auth.currentUser.uid);

  const docData = {
    genero: genero,
    vel: vel,
    pitch: pitch,
  };
  await setDoc(doc(db, "definicoes_audio", auth.currentUser.uid), docData);
};

export const isDefAudio = async () => {
  const db = getFirestore();
  const docRef = await doc(db, "definicoes_audio", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return false;
};
