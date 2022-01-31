import { useNavigate } from "react-router-dom";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";
import publico from "../icons/publico.svg";
import AudioPlayer from "./AudioPlayer";

function NoticiaMiniaturaGuardadas(props) {
  const navegar = useNavigate();
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

  return (
    <div className='relative bg-white shadow-md m-3 rounded-lg'>
      <div className='grid grid-cols-12'>
        <div className='col-span-3'>
          <img
            src={image}
            className='w-full h-32 object-cover hover:cursor-pointer '
            onClick={() =>
              navegar("/noticia/" + props.info.fonte + "/" + props.info.id)
            }
          />
        </div>
        <div className='col-span-9'>
          <div className='px-2 py-3'>
            <h6 className='text-base leading-5 font-semibold mb-2'>
              {props.info.titulo}
            </h6>
            <div>
              <AudioPlayer func={audioATocar} />
            </div>
          </div>
        </div>
      </div>
      <div>
        {(() => {
          switch (props.info.fonte) {
            case "eco":
              return (
                <img src={eco} className='w-11 absolute bottom-3 right-3' />
              );
            case "observador":
              return (
                <img
                  src={observador}
                  className='w-28 absolute bottom-3 right-3'
                />
              );
            case "publico":
              return (
                <img src={publico} className='w-5 absolute bottom-3 right-3' />
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default NoticiaMiniaturaGuardadas;
