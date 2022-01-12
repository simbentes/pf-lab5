import g_icon from "./g_icon.svg";
import "./App.css";
import NavBar from "./NavBar";
import { auth, useAuth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Ultimas from "./Ultimas";
import Noticia from "./Noticia";
import NoMatch from "./NoMatch";
import ProtectedRoutes from "./ProtectedRoutes";

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
  return (
    <div className='App'>
      {utilizador && <NavBar />}
      <header className='App-header'>
        {!utilizador && (
          <>
            <h5>Primeiro Jornal.</h5>
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
        {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
            <Route path='ultimas' element={<Ultimas />} />
            <Route path='ultimas/desporto' element={<Ultimas />} />
            <Route />
            <Route path='noticia/:id' element={<Noticia />} />
            <Route path='dashboard' element={<NoMatch />} />
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

function Home() {
  const utilizador = useAuth();
  return (
    <div>
      <div>
        <img src={utilizador.photoURL} className='rounded-full mx-auto'></img>
      </div>
      <div>Olá, {utilizador.displayName}!</div>
    </div>
  );
}

export default App;
