import { useEffect, useState } from "react";
import { nGuardadas } from "../firebase";
import NoticiaMiniaturaGuardadas from "./NoticiaMiniaturaGuardadas";
import { BookmarkAltIcon } from "@heroicons/react/outline";

function NoticiasGuardadas() {
  const [noticias_arr, setNoticias_arr] = useState([]);
  useEffect(() => {
    //dar display das notícias guardadas
    nGuardadas().then((res) => setNoticias_arr(res.noticia_guardada));
  }, []);
  return (
    <div className='pt-3'>
      <div className='container mx-auto px-10'>
        <h1 className='pl-3 font-semibold text-2xl my-5 flex items-center'>
          <BookmarkAltIcon className='h-10 w-10 mr-2' />
          Notícias Guardadas
        </h1>
      </div>
      <div className='py-6'>
        <div className='container mx-auto px-10'>
          <div className='grid grid-cols-1 lg:grid-cols-6'>
            <div className='lg:col-span-5'>
              {noticias_arr.length > 0 ? (
                noticias_arr.map((el, index) => <NoticiaMiniaturaGuardadas info={el} key={index} />)
              ) : (
                <div className='pt-10 pb-96'>Sem notícias guardadas.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticiasGuardadas;
