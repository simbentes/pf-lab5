import React, { useState, useEffect, useRef } from "react";
import NoticiaMiniatura from "./NoticiaMiniatura";
import { fetchMeuFeed, fetchTemaNoticia } from "../fetchMeuFeed";
import eco from "../icons/eco.svg";
import publico from "../icons/publico.svg";
import observador from "../icons/observador.png";
import SortButton from "./SortButton";
import ButtonSection from "./ButtonSection";
import { hasFiltros, saveFitros, isDefAudio } from "../firebase";
import LoadingMiniatura from "./LoadingMiniatura";

function OMeuFeed() {
  const renders = useRef(0);
  const [arrayRefs, setArrayRefs] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [displayNoticias, setDisplayNoticias] = useState([]);
  const [fontes, setFontes] = useState(null);
  const [temas, setTemas] = useState(null);
  const [defAudio, setDefAudio] = useState({
    genero: "male",
    vel: 1,
    pitch: 0,
  });
  const loadingMin = [0, 1, 2, 3, 4, 5];
  const escolherFonte = (id, estado) => {
    setFontes({ ...fontes, [id]: estado });
    saveFitros(temas, { ...fontes, [id]: estado });
  };
  const escolherTema = (id, estado) => {
    setTemas({ ...temas, [id]: estado });
    saveFitros({ ...temas, [id]: estado }, fontes);
  };

  useEffect(() => {
    //verificar no firebase se exitem filtros selecionados e dar checked ao que estão
    hasFiltros().then((filtros) => {
      if (filtros === false) {
        setTemas({
          politica: false,
          sociedade: false,
          coronavirus: false,
          economia: false,
          cultura: false,
          desporto: false,
          ciencia: false,
          tecnologia: false,
        });
        setFontes({
          publico: false,
          eco: false,
          observador: false,
        });
      } else {
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
    arrayRefs.forEach((elem) => {
      try {
        if (elem.current != null) elem.current.pause_func();
      } catch (e) {}
    });
  };

  const refreshAllAudios = () => {
    arrayRefs.forEach((elem) => {
      try {
        if (elem.current != null) elem.current.refresh_func();
      } catch (e) {}
    });
  };

  const filtrar_fontes = () => {
    const arr_filtrado = noticias.filter((el) => checkFontes(el));
    setDisplayNoticias(arr_filtrado);
    refreshAllAudios();
  };

  useEffect(() => {
    filtrar_fontes();
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
    setNoticias([]);

    const temTemas = () => {
      for (let prop in temas) {
        if (temas[prop] === true) return true;
      }
      return false;
    };

    if (temas !== null) {
      if (temTemas()) {
        //se tiver temas selecionados fazer fetch com as fontes selecionadas
        fetchTemaNoticia(temas, fontes).then((res) => {
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
    }
  }, [temas]);

  useEffect(() => {
    filtrar_fontes();
  }, [noticias]);

  return (
    <div className='py-5'>
      {console.log("display", displayNoticias)}
      <h1 className='pl-11 text-center font-semibold text-2xl my-5'>O Meu Feed</h1>
      <div className='container mx-auto px-10'>
        <button onClick={refreshAllAudios}>Refresh</button>
        <div className='pb-7'>
          {temas !== null && (
            <ButtonSection name='Temas'>
              <SortButton id='politica' content='Política' type='text' onChangeHandle={escolherTema} is_checked={temas.politica} />
              <SortButton id='sociedade' content='Sociedade' type='text' onChangeHandle={escolherTema} is_checked={temas.sociedade} />
              <SortButton id='coronavirus' content='Covid-19' type='text' onChangeHandle={escolherTema} is_checked={temas.coronavirus} />
              <SortButton id='economia' content='Economia' type='text' onChangeHandle={escolherTema} is_checked={temas.economia} />
              <SortButton id='cultura' content='Cultura' type='text' onChangeHandle={escolherTema} is_checked={temas.cultura} />
              <SortButton id='desporto' content='Desporto' type='text' onChangeHandle={escolherTema} is_checked={temas.desporto} />
              <SortButton id='ciencia' content='Ciência' type='text' onChangeHandle={escolherTema} is_checked={temas.ciencia} />
              <SortButton id='tecnologia' content='Tecnologia' type='text' onChangeHandle={escolherTema} is_checked={temas.tecnologia} />
            </ButtonSection>
          )}
          {fontes !== null && (
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
          )}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {noticias.length > 0
            ? displayNoticias.map((el, index) => (
                <NoticiaMiniatura ref={arrayRefs[index]} pauseAllFunc={pauseAllAudios} info={el} key={index} def_audio={defAudio} />
              ))
            : loadingMin.map((e) => <LoadingMiniatura key={e} />)}
        </div>
      </div>
    </div>
  );
}

export default OMeuFeed;
