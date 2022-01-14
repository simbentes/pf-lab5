import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticiaMiniatura from "./NoticiaMiniatura";
import fetchUltimas from "../fetchUltimas";

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
    fetchUltimas().then((data) => {
      setVer(ver);
    });
  }, []);

  let mudarCategoria = useNavigate();
  let urlParams = useParams();
  return (
    <div className='py-5'>
      {console.log(noticias.length)}
      <h1 className='pl-11 text-center font-semibold text-2xl my-5'>
        Últimas Notícias
      </h1>
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
