import g_icon from "./g_icon.svg";
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
      <header className='App-header'>
        <h5>Primeiro Jornal.</h5>
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
            <button
              className='px-4 py-3 bg-white border-0 rounded-md flex items-center'
              onClick={iniciarSessaoGoogle}
            >
              <img src={g_icon} className='w-5 pr-3' alt='logo' />
              Iniciar Sessão com o Google
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
