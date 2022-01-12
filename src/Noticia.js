import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SaveIcon } from "@heroicons/react/solid";
import { fetchNoticia } from "./fetchNoticia";
import { guardarNoticia } from "./firebase";
import { markdown } from "markdown";
import parse from "html-react-parser";
import "./Noticia.css";

function Noticia() {
  let id_noticia = useParams();

  const [noticia, setNoticia] = useState([]);

  useEffect(() => {
    fetchNoticia(id_noticia.fonte, id_noticia.id)
      .then((resultado) => {
        console.log(resultado);
        setNoticia(resultado);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className='md:container mx-auto px-10 lg:px-24 my-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='md:col-span-3'>
            <h1 className='font-bold text-5xl mb-3'>
              {noticia.map((e) => e.title.long)}
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
            <div></div>
            <img
              className='w-full'
              src={noticia.map((e) => e.images.wide.urlTemplate)}
            />
            <div className='corpo-noticia text-base py-8'>
              {noticia.map((e) =>
                parse(markdown.toHTML(e.body.replace("{0}", "")))
              )}
            </div>
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
