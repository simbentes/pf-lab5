import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { SaveIcon } from "@heroicons/react/solid";
import { fetchNoticia } from "../fetchNoticia";
import { guardarNoticia, useAuth } from "../firebase";
import parse from "html-react-parser";
import "../css/App.css";
import AudioPlayer from "./AudioPlayer";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";
import publico from "../icons/publico.svg";
import { Remarkable } from "remarkable";

function Noticia() {
  let userID = useAuth();
  let reference = useRef({});
  let hasStarted = false;
  const [disable, setDisable] = useState(true);

  let id_noticia = useParams();

  const [noticia, setNoticia] = useState({});
  const [tts, setTts] = useState([]);

  useEffect(() => {
    let md = new Remarkable();
    fetchNoticia(id_noticia.fonte, id_noticia.id)
      .then((resultado) => {
        if (id_noticia.fonte === "eco") {
          setNoticia({
            titulo: resultado.title.long,
            img: resultado.images.wide.urlTemplate,
            body: parse(md.render(resultado.body)),
            raw_body: resultado.body,
            fonte: "eco",
          });
        } else {
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
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  /*
  useEffect(() => {
    console.log(tts);

    let tts_feito = markdown.toHTML(tts).replace(/(<([^>]+)>)/gi, "");

    console.log(tts_feito);

    reference.current.context = new AudioContext();
    reference.current.source = reference.current.context.createBufferSource();

    fetch("https://pf-py-api.herokuapp.com/audio/", {
      method: "POST",
      body: JSON.stringify({
        type: "body",
        id: id_noticia.id,
        gender: "female",
        jornal: id_noticia.fonte + "4354",
        contents: [tts_feito],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        reference.current.context.decodeAudioData(arrayBuffer)
      )
      .then((audioBuffer) => {
        reference.current.source.buffer = audioBuffer;
        reference.current.source.connect(reference.current.context.destination);
        setDisable(false);
      });
  }, [tts]);
*/
  const play = () => {
    if (!hasStarted) {
      reference.current.source.start();
      hasStarted = true;
    } else if (reference.current.context.state == "running") {
      reference.current.context.suspend().then();
    } else if (reference.current.context.state == "suspended") {
      reference.current.context.resume().then();
    }
  };

  return (
    <div>
      <div className='md:container mx-auto px-10 lg:px-24'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='md:col-span-3'>
            <h1 className='font-bold text-5xl mb-3'>{noticia.titulo}</h1>
            <AudioPlayer func={play} />
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
