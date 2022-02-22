import React, { useState, useEffect, useRef } from "react";
import NoticiaMiniatura from "./NoticiaMiniatura";
import { fetchMeuFeed, fetchTemaNoticia } from "../fetchMeuFeed";
import eco from "../icons/eco.svg";
import publico from "../icons/publico.svg";
import observador from "../icons/observador.png";
import SortButton from "./SortButton";
import ButtonSection from "./ButtonSection";
import { hasFiltros, saveFitros, isDefAudio } from "../firebase";
import { RefreshIcon } from "@heroicons/react/solid";

function OMeuFeed() {
  const renders = useRef(0);
  const [arrayRefs, setArrayRefs] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [displayNoticias, setDisplayNoticias] = useState([]);
  const [fontes, setFontes] = useState({
    publico: false,
    eco: false,
    observador: false,
  });
  const [temas, setTemas] = useState({
    sociedade: false,
    politica: false,
    economia: false,
    mundo: false,
    cultura: false,
    desporto: false,
  });
  const [defAudio, setDefAudio] = useState({
    genero: "male",
    vel: 1,
    pitch: 0,
  });

  const escolherFonte = (id, estado) => {
    saveFitros(temas, { ...fontes, [id]: estado });
    setFontes({ ...fontes, [id]: estado });
  };
  const escolherTema = (id, estado) => {
    saveFitros({ ...temas, [id]: estado }, fontes);
    setTemas({ ...temas, [id]: estado });
  };

  useEffect(() => {
    fetchMeuFeed().then(
      (news) => {
        setNoticias(news);
        setDisplayNoticias(news);
        setArrayRefs(news.map((noticia) => React.createRef()));
        console.log(news);
      },
      (err) => {
        console.log(err);
      }
    );

    //verificar no firebase se exitem filtros selecionados e dar checked ao que estão
    hasFiltros().then((filtros) => {
      if (filtros) {
        setTemas(filtros.temas);
        setFontes(filtros.fontes);
      }
    });
  }, []);

  const checkFontes = (el) => {
    // check if all fontes are false
    if (!fontes.publico && !fontes.observador && !fontes.eco) return true;
    // check if elems fonte is trued in fontes
    if (
      (el.fonte === "publico" && fontes.publico) ||
      (el.fonte === "eco" && fontes.eco) ||
      (el.fonte === "observador" && fontes.observador)
    )
      return true;
    return false;
  };

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

  const refreshAllAudios = () => {
    arrayRefs.forEach((elem) => {
      try {
        if (elem.current != null) elem.current.refresh_func();
      } catch (e) {
        console.log(e);
      }
    });
  };

  useEffect(() => {
    const arr_filtrado = noticias.filter((el) => checkFontes(el));
    setDisplayNoticias(arr_filtrado);
    refreshAllAudios();
  }, [fontes]);

  useEffect(() => {
    isDefAudio().then((res) => {
      if (res !== false) {
        setDefAudio(res);
      }
    });

    return () => {
      pauseAllAudios();
    };
  }, []);

  useEffect(() => {
    const temTemas = () => {
      for (let prop in temas) {
        if (temas[prop] === true) return true;
      }
      return false;
    };

    if (temTemas()) {
      //se tiver temas selecionados fazer fetch com as fontes selecionadas
      fetchTemaNoticia(displayNoticias, temas, fontes).then((res) => {
        setNoticias(res);
        setDisplayNoticias(res);
        setArrayRefs(res.map((noticia) => React.createRef()));
      });
    } else {
      //se não, fazer fetch das ultimas 25 noticias dos 3 jornais (10 público, 10 observador, 5 eco)
      fetchMeuFeed().then((news) => {
        setNoticias(news);
        setDisplayNoticias(news);
        setArrayRefs(news.map((noticia) => React.createRef()));
      });
    }
  }, [temas]);

  return (
    <div className='py-5'>
      <h1 className='pl-11 text-center font-semibold text-2xl my-5'>O Meu Feed</h1>
      <div className='container mx-auto px-10'>
        <button onClick={refreshAllAudios}>Refresh</button>
        <div className='pb-7'>
          <ButtonSection name='Temas'>
            <SortButton id='sociedade' content='Sociedade' type='text' onChangeHandle={escolherTema} is_checked={temas.sociedade} />
            <SortButton id='politica' content='Política' type='text' onChangeHandle={escolherTema} is_checked={temas.politica} />
            <SortButton id='economia' content='Economia' type='text' onChangeHandle={escolherTema} is_checked={temas.economia} />
            <SortButton id='mundo' content='Mundo' type='text' onChangeHandle={escolherTema} is_checked={temas.mundo} />
            <SortButton id='cultura' content='Cultura' type='text' onChangeHandle={escolherTema} is_checked={temas.cultura} />
            <SortButton id='desporto' content='Desporto' type='text' onChangeHandle={escolherTema} is_checked={temas.desporto} />
          </ButtonSection>
          <ButtonSection name='Fontes'>
            <SortButton id='publico' content={publico} type='img' size='h-6' onChangeHandle={escolherFonte} is_checked={fontes.publico} />
            <SortButton id='eco' content={eco} type='img' size='h-4' onChangeHandle={escolherFonte} is_checked={fontes.eco} />
            <SortButton
              id='observador'
              content={observador}
              type='img'
              size='h-2'
              onChangeHandle={escolherFonte}
              is_checked={fontes.observador}
            />
          </ButtonSection>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {displayNoticias &&
            displayNoticias.map((el, index) => (
              <NoticiaMiniatura ref={arrayRefs[index]} pauseAllFunc={pauseAllAudios} info={el} key={el.id} def_audio={defAudio} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default OMeuFeed;
