import g_icon from "./g_icon.svg";
import "./App.css";
import NavBar from "./NavBar";
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

  const utilizador = useAuth();
  console.log(utilizador);
  return (
    <div className='App'>
      {utilizador && <NavBar />}
      <header className='App-header'>
        {!utilizador && (
          <>
            <h5>Primeiro Jornal.</h5>
          </>
        )}
        {utilizador && (
          <>
            <div>
              <img src={utilizador.photoURL} className='rounded-full'></img>
            </div>
            <div>Olá, {utilizador.displayName}!</div>
          </>
        )}
        {!utilizador && (
          <>
            <button
              className='my-4 px-4 py-3 bg-white border-0 rounded-md flex items-center text-sm text-black'
              onClick={iniciarSessaoGoogle}
            >
              <img src={g_icon} className='w-8 pr-3' alt='logo' />
              Iniciar Sessão com o Google
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
