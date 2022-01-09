import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Ultimas() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?q=trump&apiKey=2d2ffd828b484c509da84c81c89ed60d"
    )
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data.articles);
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
      <h1>Últimas Notícias</h1>
      {noticias.length > 0 &&
        noticias.map((el) => (
          <div key={el.publishedAt} className='py-4'>
            <img src={el.urlToImage} className='mx-auto h-20' />
            <h6 className='font-semibold'>{el.title}</h6>
            <p className='text-xs'>{el.description}</p>
          </div>
        ))}
    </div>
  );
}

export default Ultimas;
