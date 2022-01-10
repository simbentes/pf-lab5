import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SaveIcon } from "@heroicons/react/solid";
import { guardarNoticia } from "./firebase";

function Noticia() {
  let id_noticia = useParams();

  const [noticiaInfo, setNoticiaInfo] = useState({});
  const [noticia, setNoticia] = useState([]);

  const navegar = useNavigate();

  useEffect(() => {
    fetch("https://pf-py-api.herokuapp.com/pub/" + id_noticia.id)
      .then((res) => res.json())
      .then((data) => {
        setNoticia(data.content);
      })
      .catch((erro) => {
        console.log(erro);
        navegar("/");
      });

    fetch("https://pf-py-api.herokuapp.com/fetch/", {
      method: "POST",
      body: JSON.stringify({
        link: "https://www.publico.pt/api/list/search?query=" + id_noticia.id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNoticiaInfo(data[0]);
      });
  }, []);
  return (
    <div>
      <div className='md:container mx-auto px-10 lg:px-24 my-12'>
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-3'>
            <h1 className='font-bold text-5xl mb-3'>
              {noticiaInfo.tituloNoticia}
            </h1>
            <div className='py-3'>
              <button
                onClick={() => guardarNoticia(id_noticia.id)}
                className='px-4 py-1 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center'
              >
                <SaveIcon className='h-8 w-8 inline pr-2' />
                Guardar
              </button>
            </div>
            <img className='w-full' src={noticiaInfo.multimediaPrincipal} />
            {noticia.map((el) => (
              <div key={el} className='py-4'>
                <p className='text-base '>{el}</p>
              </div>
            ))}
          </div>
          <div>
            <h5 className='font-semibold'>Notícias Relacionadas</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noticia;