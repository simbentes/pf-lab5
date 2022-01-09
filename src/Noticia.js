import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Noticia() {
  let id_noticia = useParams();

  const [noticiaInfo, setNoticiaInfo] = useState([]);
  const [noticia, setNoticia] = useState([]);

  const navegar = useNavigate();

  useEffect(() => {
    fetch("https://pf-py-api.herokuapp.com/pub/" + id_noticia.id)
      .then((res) => res.json())
      .then((data) => {
        setNoticia(data.content);
      })
      .catch((erro) => {
        console.log(erro);
        navegar("/");
      });

    fetch("https://pf-py-api.herokuapp.com/pub/" + id_noticia.id)
      .then((res) => res.json())
      .then((data) => {
        setNoticiaInfo(data.content);
      });
  }, []);
  return (
    <div>
      <div className='md:container mx-auto px-10 lg:px-24'>
        {noticia.map((el) => (
          <div key={el} className='py-4'>
            <p className='text-base text-left'>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Noticia;
