import { useState } from "react";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";
import publico from "../icons/publico.svg";
import AudioPlayer from "./AudioPlayer";
import GuardarButton from "./GuardarButton";
import { useAuth, guardarNoticia } from "../firebase";
import { Link } from "react-router-dom";

function NoticiaMiniaturaGuardadas(props) {
  let userID = useAuth();
  let image;
  try {
    image = props.info.img;
  } catch (e) {
    console.log(e);
  }

  const audioATocar = (aTocar) => {
    if (aTocar) {
      console.log(aTocar);
      return true;
    }
    return false;
  };

  const data = new Date(props.info.data);

  const [guardado, setGuardado] = useState(true);
  const removerNoticia = (is_checked, noticia_id, noticia_info) => {
    setGuardado(!guardado);
    guardarNoticia(userID.uid, noticia_id, noticia_info, is_checked);
  };

  return (
    <div className='relative bg-white shadow-md m-3 rounded-lg'>
      <div className='grid grid-cols-12'>
        <div className='col-span-3'>
          <Link to={`/noticia/${props.info.fonte}/${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}/${props.info.id}`}>
            <img src={image} className='w-full h-full object-cover hover:cursor-pointer rounded-tl-lg rounded-bl-lg' />
          </Link>
        </div>
        <div className='col-span-9'>
          <div className='py-3 px-4'>
            <Link to={`/noticia/${props.info.fonte}/${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}/${props.info.id}`}>
              <div className='py-3 grid grid-cols-12 gap-4'>
                <div className='col-start-1 col-end-11'>
                  <h6 className='text-base leading-5 font-semibold mb-2'>{props.info.titulo}</h6>
                </div>
                <div className='col-span-2 col-end-13 text-right'>
                  {(() => {
                    switch (props.info.fonte) {
                      case "eco":
                        return <img src={eco} className='w-14 inline' />;
                      case "observador":
                        return <img src={observador} className='w-28 inline' />;
                      case "publico":
                        return <img src={publico} className='w-5 inline' />;
                      default:
                        return null;
                    }
                  })()}
                </div>
              </div>
            </Link>
            <div className='grid grid-cols-8'>
              <div className='col-span-6 pr-2'>
                <AudioPlayer func={audioATocar} />
              </div>
              <div className='col-span-2 pl-2 flex items-center justify-end w-full'>
                <GuardarButton is_saved={guardado} onChangeHandle={removerNoticia} info={props.info} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticiaMiniaturaGuardadas;
