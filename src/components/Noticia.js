import "../css/App.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchNoticia } from "../fetchNoticia";
import { guardarNoticia, useAuth, isGuardado } from "../firebase";
import GuardarButton from "./GuardarButton";
import parse from "html-react-parser";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";
import publico from "../icons/publico.svg";
import mainEco from "../imagens/eco.png";
import mainObs from "../imagens/obs.png";
import mainPub from "../imagens/pub.png";
import { Remarkable } from "remarkable";
import PlayButton from "./PlayButton";
import fetchUltimas from "../fetchUltimas";
import NoticiaMiniatura from "./NoticiaMiniatura";

function Noticia() {
  const [noticia, setNoticia] = useState({});
  const [noticias, setNoticias] = useState([]);
  const [guardado, setGuardado] = useState(false);
  const userID = useAuth();
  const noticia_param = useParams();

  const [arrayRefs, setArrayRefs] = useState([React.createRef()]);

  const pauseAllAudios = () => {
    console.log(arrayRefs);
    arrayRefs.forEach((elem) => {
      try {
        if (elem.current != null) elem.current.pause_func();
      } catch (e) {
        console.log(e);
      }
    });
  };

  //guardar notícia - enviamos como callback para o componente GuardarButton
  const adicionarNoticia = (is_checked, noticia_id, noticia_info) => {
    setGuardado(!guardado);
    guardarNoticia(noticia_param.id, noticia_info, is_checked);
  };

  useEffect(() => {
    //verificar se está guardado
    isGuardado(noticia_param.id).then((res) => setGuardado(res));
  }, [userID]);

  const removeCurlyBracketsNumerals = (body) => {
    console.log(body);
    let newbody = body;
    let counter = 0;
    let hasBrackets = true;

    while (hasBrackets) {
      let bracket = "{" + counter + "}";

      if (newbody.includes(bracket)) {
        newbody = newbody.replace(bracket, "");
        counter++;
      } else hasBrackets = false;
    }
    return newbody;
  };

  useEffect(() => {
    const md = new Remarkable();

    //fazer fetch da noticia com id e fonte recebido no url
    fetchNoticia(noticia_param.fonte, noticia_param.id)
      .then((resultado) => {
        if (noticia_param.fonte === "eco") {
          // alterar isto para ajudar no render docorpo

          setNoticia({
            titulo: resultado.title.long,
            img: resultado.images.wide.urlTemplate,
            body: parse(md.render(removeCurlyBracketsNumerals(resultado.body))),
            fonte: "eco",
            data: noticia_param.dia + "-" + noticia_param.mes + "-" + noticia_param.ano,
            body_array: resultado.body,
            // arranjar o tipo
          });
        } else {
          let imagem = resultado.img;
          if (resultado.img == "no image") {
            switch (noticia_param.fonte) {
              case "observador":
                imagem = mainObs;
                break;
              case "publico":
                imagem = mainPub;
                break;
              case "eco":
                imagem = mainEco;
                break;
            }
          }
          setNoticia({
            titulo: resultado.title,
            img: imagem,
            body: resultado.content.map((e, index) => {
              switch (e.type) {
                case "p":
                  return (
                    <p key={index} className='mb-5'>
                      {e.content}
                    </p>
                  );
                  break;
                case "h2":
                  return (
                    <h2 key={index} className='mb-5 font-semibold text-2xl'>
                      {e.content}
                    </h2>
                  );
                  break;
                case "video":
                  return parse(e.content);
                  break;
                case "audio":
                  return (
                    <audio key={index} className='w-full' controls>
                      <source src={index} type='audio/mp3' />
                    </audio>
                  );
              }
            }),
            fonte: noticia_param.fonte,
            data: noticia_param.dia + "-" + noticia_param.mes + "-" + noticia_param.ano,
            body_array: resultado.content.map((elem) => elem.content),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //fazer fetch das "outras noticias" (ou "noticias relacionadas" se forem a noticia for do jornal ECO)
    fetchUltimas(3, noticia_param.id, noticia_param.fonte).then(
      (news) => {
        console.log(news);
        setNoticias(news);
        let array = news.map((element) => React.createRef());
        setArrayRefs([...arrayRefs, ...array]);
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
              ref={arrayRefs[0]}
              pauseAllFunc={pauseAllAudios}
            />
            <div className='py-3 grid grid-cols-6 gap-4'>
              <div className='col-span-2'>
                <GuardarButton is_saved={guardado} onChangeHandle={adicionarNoticia} info={noticia} />
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
                noticias.map((el, index) => (
                  <NoticiaMiniatura
                    ref={arrayRefs[index + 1]}
                    pauseAllFunc={pauseAllAudios}
                    info={el}
                    key={index}
                    def_audio={{ genero: "male", vel: 1, pitch: 0 }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noticia;
