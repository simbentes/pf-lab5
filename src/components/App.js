import "./../css/App.css";
import NavBar from "./NavBar";
import { useAuth } from "../firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ultimas from "./Ultimas";
import Noticia from "./Noticia";
import NoMatch from "./NoMatch";
import ProtectedRoutes from "./ProtectedRoutes";
import Inicio from "./Inicio";
import OMeuFeed from "./OMeuFeed";
import NoticiasGuardadas from "./NoticiasGuardadas";

function App() {
  const utilizador = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoutes />}>
            <Route element={<NavBar />}>
              <Route index element={<Inicio />} />
              <Route path='ultimas' element={<Ultimas />} />
              <Route path='omeufeed' element={<OMeuFeed />} />
              <Route path='guardadas' element={<NoticiasGuardadas />} />
              <Route path='noticia/:fonte/:ano/:mes/:dia/:id' element={<Noticia />} />
              <Route path='noticia/:fonte/:id' element={<Noticia />} />
              <Route path='*' element={<NoMatch />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
