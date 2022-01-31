import "./../css/App.css";
import NavBar from "./NavBar";
import { useAuth } from "../firebase";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Ultimas from "./Ultimas";
import Noticia from "./Noticia";
import NoMatch from "./NoMatch";
import ProtectedRoutes from "./ProtectedRoutes";
import PaginaInicial from "./PaginaInicial";
import Inicio from "./Inicio";
import PlayButton from "./PlayButton";
import OMeuFeed from "./OMeuFeed";
import NoticiasGuardadas from "./NoticiasGuardadas";

function App() {
  const utilizador = useAuth();
  return (
    <div className='App'>
      {utilizador && <NavBar user={utilizador} />}
      <div className='pt-5 pb-15 bg-gray-100'>
        <Routes>
          {!utilizador && <Route index element={<PaginaInicial />} />}
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Inicio />} />
            <Route path='ultimas' element={<Ultimas />} />
            <Route path='omeufeed' element={<OMeuFeed />} />
            <Route path='guardadas' element={<NoticiasGuardadas />} />
            <Route path='noticia/:fonte/:id' element={<Noticia />} />
            <Route path='dashboard' element={<NoMatch />} />
            <Route path='*' element={<NoMatch />} />
            <Route path='playbutton' element={<PlayButton />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
