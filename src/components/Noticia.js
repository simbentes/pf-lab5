import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { SaveIcon } from "@heroicons/react/solid";
import { fetchNoticia } from "../fetchNoticia";
import { guardarNoticia, useAuth, isGuardado } from "../firebase";
import parse from "html-react-parser";
import "../css/App.css";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";
import publico from "../icons/publico.svg";
import { Remarkable } from "remarkable";
import PlayButton from "./PlayButton";
import fetchUltimas from "../fetchUltimas";
import NoticiaMiniatura from "./NoticiaMiniatura";

function Noticia() {
  const [noticias, setNoticias] = useState([]);

  let userID = useAuth();

  const [guardado, setGuardado] = useState(false);

  let noticia_param = useParams();

  const [noticia, setNoticia] = useState({});

  useEffect(() => {
    isGuardado(userID, noticia_param.id).then((res) => setGuardado(res));
  }, [userID]);

  useEffect(() => {
    let md = new Remarkable();
    fetchNoticia(noticia_param.fonte, noticia_param.id)
      .then((resultado) => {
        if (noticia_param.fonte === "eco") {
          // alterar isto para ajudar no render docorpo
          let expression = /{*0}/;
          console.log(resultado.body.split(expression));
          setNoticia({
            titulo: resultado.title.long,
            img: resultado.images.wide.urlTemplate,
            body: parse(md.render(resultado.body)),
            raw_body: resultado.body,
            fonte: "eco",
            data: noticia_param.dia + "-" + noticia_param.mes + "-" + noticia_param.ano,
            body_array: resultado.body.split(expression),
            // arranjar o tipo
          });
        } else {
          console.log(resultado.content.map((elem) => elem.content));
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
            fonte: noticia_param.fonte,
            data: noticia_param.dia + "-" + noticia_param.mes + "-" + noticia_param.ano,
            body_array: resultado.content.map((elem) => elem.content),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetchUltimas(3, noticia_param.id, noticia_param.fonte).then(
      (news) => {
        console.log(news);
        setNoticias(news);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div>
      <div className='md:container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 px-10'>
          <div className='md:col-span-8'>
            <h1 className='font-bold text-5xl mb-3'>{noticia.titulo}</h1>
            <PlayButton
              contents={noticia.body_array}
              id={noticia_param.id}
              type='body'
              jornal={noticia_param.fonte}
              def_audio={{ genero: "male", vel: 1, pitch: 0 }}
            />
            <div className='py-3 grid grid-cols-6 gap-4'>
              <div className='col-span-2'>
                <input
                  type='checkbox'
                  id='guardar'
                  name='guardar'
                  checked={guardado}
                  className='peer hidden'
                  onChange={(e) => {
                    setGuardado(!guardado);
                    guardarNoticia(userID.uid, noticia_param.id, noticia, e.target.checked);
                  }}
                />
                <label
                  htmlFor='guardar'
                  className='px-4 py-1 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center peer-checked:bg-gray-300 peer-checked:text-black'
                >
                  <SaveIcon className='h-8 w-8 inline pr-2' />
                  {guardado ? "Guardado" : "Guardar"}
                </label>
              </div>
              <div className='col-end-7 col-span-3 text-right'>
                <img
                  className='inline h-8'
                  src={(() => {
                    switch (noticia_param.fonte) {
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
          <div className='col-span-4'>
            {noticia_param.fonte == "eco" ? (
              <h5 className='font-semibold'>Notícias Relacionadas</h5>
            ) : (
              <h5 className='font-semibold'>Outras Notícias</h5>
            )}

            <div>
              {noticias &&
                noticias.map((el, index) => <NoticiaMiniatura info={el} key={index} def_audio={{ genero: "male", vel: 1, pitch: 0 }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noticia;
