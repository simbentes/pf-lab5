import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticiaMiniatura from "./NoticiaMiniatura";

function Ultimas() {
  const [noticias, setNoticias] = useState([]);
  const [ver, setVer] = useState(false);

  /*useEffect(() => {
    fetch("https://pf-py-api.herokuapp.com/fetch/", {
      method: "POST",
      body: JSON.stringify({
        link: "https://www.publico.pt/api/list/ultimas",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
      });
  }, []); */

  useEffect(() => {
    fetch("https://eco.sapo.pt/wp-json/eco/v1/lists/latest")
      .then((res) => res.json())
      .then((data) => {
        let json_tratato = data.map((e) => {
          return {
            id: e.item.id,
            titulo: e.item.title.long,
            data: e.item.pubDate,
            tag: e.item.type,
            lead: e.item.lead,
            img: e.item.images.wide.urlTemplate,
            fonte: "eco",
          };
        });
        let arr = noticias;
        arr.push(...json_tratato);
        setNoticias(arr);
        return fetch("https://observador.pt/wp-json/obs_api/v4/news/widget/");
      })
      .then((res) => res.json())
      .then((data) => {
        let json_tratato = data.map((e) => {
          return {
            id: e.id,
            titulo: e.title,
            data: e.publish_date,
            tag: e.tag,
            lead: e.lead,
            img: e.image,
            fonte: "observador",
          };
        });
        let arr = noticias;
        arr.push(...json_tratato);
        setNoticias(arr);
        setVer(true);
      });

    console.log(noticias);
  }, []);

  let mudarCategoria = useNavigate();
  let urlParams = useParams();
  return (
    <div>
      {console.log(noticias.length)}
      <button
        onClick={() => {
          mudarCategoria("/ultimas/desporto");
        }}
        className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
      >
        Desporto
      </button>
      <h1 className='pl-11'>Últimas Notícias</h1>
      <div className='container mx-auto px-10'>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {ver &&
            noticias.map((el) => <NoticiaMiniatura info={el} key={el.id} />)}
        </div>
      </div>
    </div>
  );
}

export default Ultimas;
