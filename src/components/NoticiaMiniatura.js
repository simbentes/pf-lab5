import { useNavigate } from "react-router-dom";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";
import publico from "../icons/publico.svg";
import AudioPlayer from "./AudioPlayer";

function NoticiaMiniatura(props) {
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

  const data = new Date(props.info.data);
  console.log(data);

  return (
    <div className='relative bg-white shadow-md m-3 rounded-lg pb-6'>
      <img
        src={image}
        className='mx-auto w-full rounded-t-lg h-60 object-cover hover:cursor-pointer '
        onClick={() =>
          navegar(
            `/noticia/${props.info.fonte}/${data.getFullYear()}/${
              data.getMonth() + 1
            }/${data.getDate()}/${props.info.id}`
          )
        }
      />
      <div className='px-2 py-3'>
        <h6 className='text-base leading-5 font-semibold mb-2'>
          {props.info.titulo}
        </h6>
        <p className='text-xs'>{props.info.lead}</p>
        <div>
          <AudioPlayer func={audioATocar} />
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

export default NoticiaMiniatura;
