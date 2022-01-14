import "../css/App.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import g_icon from "../icons/g_icon.svg";

function PaginaInicial() {
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
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='text-center'>
        <h5>Primeiro Jornal.</h5>
        <button
          className='my-4 px-4 py-3 mx-auto bg-white border-0 rounded-md flex items-center text-sm text-black'
          onClick={iniciarSessaoGoogle}
        >
          <img src={g_icon} className='w-8 pr-3' alt='logo' />
          Iniciar Sessão com o Google
        </button>
      </div>
    </div>
  );
}

export default PaginaInicial;
