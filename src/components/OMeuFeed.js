import { useState, useEffect, useRef } from "react";
import NoticiaMiniatura from "./NoticiaMiniatura";
import fetchUltimas from "../fetchUltimas";
import fetchMeuFeed from "../fetchUltimas";
import eco from "../icons/eco.svg";
import publico from "../icons/publico.svg";
import observador from "../icons/observador.png";

function OMeuFeed() {
  const [noticias, setNoticias] = useState([]);
  const [fontes, setFontes] = useState({
    publico: false,
    eco: false,
    obs: false,
  });

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

  const escolherFonte = (id, estado) => {
    switch (id) {
      case "publico":
        setFontes({ ...fontes, publico: estado });
        break;
      case "eco":
        setFontes({ ...fontes, eco: estado });
        break;
      case "obs":
        setFontes({ ...fontes, obs: estado });
        break;
    }
  };

  useEffect(() => {
    const fetchMeuFeed = (arr_noticias) => {
      const arr_filtrado = arr_noticias.filter((el) => el.fonte === "publico");
      return arr_filtrado;
    };

    console.log("noticiasfiltradas: ", fetchMeuFeed(noticias));
    setNoticias(fetchMeuFeed(noticias));
  }, [fontes]);

  return (
    <div className='py-5'>
      <h1 className='pl-11 text-center font-semibold text-2xl my-5'>
        O Meu Feed
      </h1>
      <div className='container mx-auto px-10'>
        <div className='pb-7'>
          <div className='my-4'>
            <h6 className='mb-3 text-xl font-semibold'>Temas</h6>
            <div className='flex justify-start'>
              <div className='pr-3'>
                <input
                  type='checkbox'
                  id='politica'
                  name='politica'
                  className='peer hidden'
                />
                <label
                  for='politica'
                  className='rounded-full py-2.5 px-3 bg-slate-300 peer-checked:bg-teal-700 peer-checked:text-white'
                >
                  Política
                </label>
              </div>
              <div className='pr-3'>
                <input
                  type='checkbox'
                  id='economia'
                  name='economia'
                  className='peer hidden'
                />
                <label
                  for='economia'
                  className='rounded-full py-2.5 px-3 bg-slate-300 peer-checked:bg-teal-700 peer-checked:text-white'
                >
                  Economia
                </label>
              </div>
              <div className='pr-3'>
                <input
                  type='checkbox'
                  id='mundo'
                  name='mundo'
                  className='peer hidden'
                />
                <label
                  for='mundo'
                  className='rounded-full py-2.5 px-3 bg-slate-300 peer-checked:bg-teal-700 peer-checked:text-white'
                >
                  Mundo
                </label>
              </div>
              <div className='pr-3'>
                <input
                  type='checkbox'
                  id='cultura'
                  name='cultura'
                  className='peer hidden'
                />
                <label
                  for='cultura'
                  className='rounded-full py-2.5 px-3 bg-slate-300 peer-checked:bg-teal-700 peer-checked:text-white'
                >
                  Cultura
                </label>
              </div>
              <div className='pr-3'>
                <input
                  type='checkbox'
                  id='desporto'
                  name='desporto'
                  className='peer hidden'
                />
                <label
                  for='desporto'
                  className='rounded-full py-2.5 px-3 bg-slate-300 peer-checked:bg-teal-700 peer-checked:text-white'
                >
                  Desporto
                </label>
              </div>
            </div>
          </div>
          <div className='my-4'>
            <h6 className='mb-3 text-xl font-semibold'>Fontes</h6>
            <div className='flex justify-start'>
              <div className='pr-3'>
                <input
                  type='checkbox'
                  id='publico'
                  name='publico'
                  className='peer hidden'
                  onChange={(e) =>
                    escolherFonte(e.target.name, e.target.checked)
                  }
                />
                <label
                  for='publico'
                  className='rounded-full py-2.5 px-3 bg-slate-300 peer-checked:bg-teal-700 peer-checked:text-white'
                >
                  <img src={publico} className='h-6 inline' />
                </label>
              </div>
              <div className='pr-3'>
                <input
                  type='checkbox'
                  id='eco'
                  name='eco'
                  className='peer hidden'
                  onChange={(e) =>
                    escolherFonte(e.target.name, e.target.checked)
                  }
                />
                <label
                  for='eco'
                  className='rounded-full py-2.5 px-3 bg-slate-300 peer-checked:bg-teal-700 peer-checked:text-white'
                >
                  <img src={eco} className='h-4 inline' />
                </label>
              </div>
              <div className='pr-3'>
                <input
                  type='checkbox'
                  id='obs'
                  name='obs'
                  className='peer hidden'
                  onChange={(e) =>
                    escolherFonte(e.target.name, e.target.checked)
                  }
                />
                <label
                  for='obs'
                  className='rounded-full py-2.5 px-3 bg-slate-300 peer-checked:bg-teal-700 peer-checked:text-white'
                >
                  <img src={observador} className='h-2 inline' />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {noticias &&
            noticias.map((el) => <NoticiaMiniatura info={el} key={el.id} />)}
        </div>
      </div>
    </div>
  );
}

export default OMeuFeed;
