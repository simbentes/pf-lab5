import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import g_icon from "../icons/g_icon.svg";

function Login() {
  //iniciar sessão com a conta da google
  const iniciarSessaoGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        //sessão iniciada
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='text-center'>
        <div className='text-5xl font-bold'>Primeiro Jornal.</div>
        <div className='mb-4'>A sua audioteca de notícias portuguesas.</div>
        <div>
          <button
            className='my-4 px-4 py-3 mx-auto bg-white rounded-md flex items-center text-sm  border-4 text-black'
            onClick={iniciarSessaoGoogle}
          >
            <img src={g_icon} className='w-8 pr-3' alt='logo' />
            Iniciar Sessão com o Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
