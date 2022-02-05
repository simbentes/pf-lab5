import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { SaveIcon } from "@heroicons/react/solid";
import { fetchNoticia } from "../fetchNoticia";
import { guardarNoticia, useAuth } from "../firebase";
import parse from "html-react-parser";
import "../css/App.css";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";
import publico from "../icons/publico.svg";
import { Remarkable } from "remarkable";
import PlayButton from "./PlayButton";

function Noticia() {
  let userID = useAuth();

  let id_noticia = useParams();
  console.log(id_noticia)

  const [noticia, setNoticia] = useState({});

  useEffect(() => {
    let md = new Remarkable();
    fetchNoticia(id_noticia.fonte, id_noticia.id)
      .then((resultado) => {

        if (id_noticia.fonte === "eco") {
          // alterar isto para ajudar no render docorpo 
          let expression = /{*0}/
          console.log(resultado.body.split(expression))
          setNoticia({
            titulo: resultado.title.long,
            img: resultado.images.wide.urlTemplate,
            body: parse(md.render(resultado.body)),
            raw_body: resultado.body,
            fonte: "eco",
            body_array: resultado.body.split(expression)
            // arranjar o tipo
          });
        } 
        else {
          console.log(resultado.content.map(elem => elem.content))
          setNoticia({
            titulo: resultado.title,
            img: resultado.img,
            body: resultado.content.map((e, index) => {
              if (e.type === "p") {
                return (
                  <p key={index} className='mb-5'>
                    {e.content}
                  </p>
                );
              }
              return (
                <h2 key={index} className='mb-5 font-semibold text-2xl'>
                  {e.content}
                </h2>
              );
            }),
            raw_body: resultado.content,
            fonte: id_noticia.fonte,
            body_array: resultado.content.map(elem => elem.content),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className='md:container mx-auto px-10 lg:px-24'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='md:col-span-3'>
            <h1 className='font-bold text-5xl mb-3'>{noticia.titulo}</h1>
            <PlayButton contents={noticia.body_array} id={id_noticia.id} type="body" jornal={id_noticia.fonte}/>
            <div className='py-3 grid grid-cols-6 gap-4'>
              <div>
                <button
                  onClick={() =>
                    guardarNoticia(userID.uid, id_noticia.id, noticia)
                  }
                  className='px-4 py-1 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center'
                >
                  <SaveIcon className='h-8 w-8 inline pr-2' />
                  Guardar
                </button>
              </div>
              <div className='col-end-7 col-span-3 text-right'>
                <img
                  className='inline h-8'
                  src={(() => {
                    switch (id_noticia.fonte) {
                      case "publico":
                        return publico;
                        break;
                      case "eco":
                        return eco;
                        break;
                      case "observador":
                        return observador;
                        break;
                    }
                  })()}
                />
              </div>
            </div>
            <div></div>
            <img className='w-full' src={noticia.img} />
            <div className='corpo-noticia text-base py-8'>{noticia.body}</div>
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
