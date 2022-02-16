import { useState, useEffect, useRef } from "react";
import NoticiaMiniatura from "./NoticiaMiniatura";
import fetchUltimas from "../fetchUltimas";

function Ultimas() {
  const [noticias, setNoticias] = useState([]);

  const ref = useRef(0);

  useEffect(() => {
    fetchUltimas().then(
      (news) => {
        console.log(news);
        setNoticias(news);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    ref.current = ref.current + 1;
  });

  return (
    <div className='py-5'>
      <h1 className='pl-11 text-center font-semibold text-2xl my-5'>
        Últimas Notícias
      </h1>
      <div className='container mx-auto px-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {noticias &&
            noticias.map((el, index) => (
              <NoticiaMiniatura info={el} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Ultimas;
