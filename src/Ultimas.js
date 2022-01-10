import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticiaMiniatura from "./NoticiaMiniatura";

function Ultimas() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
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
  }, []);
  let mudarCategoria = useNavigate();
  let urlParams = useParams();
  console.log(urlParams);
  return (
    <div>
      <button
        onClick={() => {
          mudarCategoria("/ultimas/desporto");
        }}
        className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
      >
        Desporto
      </button>
      <h1 className="pl-11">Últimas Notícias</h1>
      <div className='container px-10'>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {noticias.length > 0 &&
            noticias.map((el) => <NoticiaMiniatura info={el} />)}
        </div>
      </div>
    </div>
  );
}

export default Ultimas;
