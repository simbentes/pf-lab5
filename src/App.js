import "./App.css";
import { auth, useAuth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function App() {
  const iniciarSessaoGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const terminarSessao = () => {
    signOut(auth);
  };

  const utilizador = useAuth();
  console.log(utilizador);
  return (
    <div className='App'>
      <p>Teste Luis</p>
      <header className='App-header'>
        <h5>eBooks.</h5>
        {utilizador && (
          <>
            <div>
              <img src={utilizador.photoURL}></img>
            </div>
            <div>Olá, {utilizador.displayName}!</div>
            <button onClick={terminarSessao}>Terminar Sessão</button>
          </>
        )}
        {!utilizador && (
          <>
            <button onClick={iniciarSessaoGoogle}>
              Iniciar Sessão com o Google
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
