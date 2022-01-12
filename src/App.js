import "./css/App.css";
import NavBar from "./NavBar";
import { useAuth } from "./firebase";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Ultimas from "./Ultimas";
import Noticia from "./Noticia";
import NoMatch from "./NoMatch";
import ProtectedRoutes from "./ProtectedRoutes";
import PaginaInicial from "./PaginaInicial";
import Inicio from "./Inicio";

function App() {
  const utilizador = useAuth();
  return (
    <div className='App'>
      {utilizador && <NavBar user={utilizador} />}
      <header className='App-header'>
        <Routes>
          {!utilizador && <Route index element={<PaginaInicial />} />}
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Inicio />} />
            <Route path='ultimas' element={<Ultimas />} />
            <Route path='noticia/:fonte/:id' element={<Noticia />} />
            <Route path='dashboard' element={<NoMatch />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
