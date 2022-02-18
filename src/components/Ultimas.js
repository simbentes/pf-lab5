import React, { useState, useEffect, useRef } from "react";
import NoticiaMiniatura from "./NoticiaMiniatura";
import fetchUltimas from "../fetchUltimas";
import { isDefAudio, useAuth } from "../firebase";

function Ultimas() {
  const [noticias, setNoticias] = useState([]);
  const [arrayRefs, setArrayRefs] = useState([])

  const pauseAllAudios = () => {
    arrayRefs.forEach(elem => elem.current.pause_func())
  }

  const ref = useRef(0);

  useEffect(() => {
    fetchUltimas().then(
      (news) => {
        console.log(news);
        setNoticias(news);
        setArrayRefs(news.map(noticia => React.createRef()))
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    ref.current = ref.current + 1;
  });

  const [defAudio, setDefAudio] = useState({
    genero: "male",
    vel: 1,
    pitch: 0,
  });

  const userInfo = useAuth();

  useEffect(() => {
    isDefAudio(userInfo.uid).then((res) => {
      console.log(res);
      if (res !== false) {
        setDefAudio(res);
      }
    });
  }, []);

  return (
    <div className='py-5'>
      <h1 className='pl-11 text-center font-semibold text-2xl my-5'>
        Últimas Notícias
      </h1>
      <div className='container mx-auto px-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {noticias &&
            noticias.map((el, index) => (
              <NoticiaMiniatura ref={arrayRefs[index]} pauseAllFunc={pauseAllAudios} info={el} key={index} def_audio={defAudio} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Ultimas;
