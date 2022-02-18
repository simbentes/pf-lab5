import { useState, useEffect, useRef } from "react";
import NoticiaMiniatura from "./NoticiaMiniatura";
import fetchUltimas from "../fetchUltimas";
import { isDefAudio, useAuth } from "../firebase";

function Ultimas() {
  const userInfo = useAuth();
  const [noticias, setNoticias] = useState([]);
  const [defAudio, setDefAudio] = useState({
    genero: "male",
    vel: 1,
    pitch: 0,
  });

  useEffect(() => {
    //fazer fetch das ultimas 25 noticias dos 3 jornais (10 público, 10 observador, 5 eco)
    fetchUltimas().then(
      (news) => {
        console.log(news);
        setNoticias(news);
      },
      (err) => {
        console.log(err);
      }
    );

    //verificar se existem definições de audio no firebase
    isDefAudio(userInfo.uid).then((res) => {
      console.log(res);
      if (res !== false) {
        setDefAudio(res);
      }
    });
  }, []);

  return (
    <div className='py-5'>
      <h1 className='pl-11 text-center font-semibold text-2xl my-5'>Últimas Notícias</h1>
      <div className='container mx-auto px-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {noticias && noticias.map((el, index) => <NoticiaMiniatura info={el} key={index} def_audio={defAudio} />)}
        </div>
      </div>
    </div>
  );
}

export default Ultimas;
