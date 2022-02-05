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

  const data = new Date(props.info.data);

  return (
    <div className='relative bg-white shadow-md m-3 rounded-lg'>
      <div className='grid grid-cols-12'>
        <div className='col-span-3'>
          <img
            src={image}
            className='w-full h-32 object-cover hover:cursor-pointer '
            onClick={() =>
              navegar(
                `/noticia/${props.info.fonte}/${data.getFullYear()}/${
                  data.getMonth() + 1
                }/${data.getDate()}/${props.info.id}`
              )
            }
          />
        </div>
        <div className='col-span-9'>
          <div className='px-2 py-3'>
            <div className='py-3 grid grid-cols-12 gap-4'>
              <div className='col-start-1 col-end-11'>
                <h6 className='text-base leading-5 font-semibold mb-2'>
                  {props.info.titulo}
                </h6>
              </div>
              <div className='col-end-12 text-right'>
                {(() => {
                  switch (props.info.fonte) {
                    case "eco":
                      return <img src={eco} className='w-11 inline' />;
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
            <div>
              <AudioPlayer func={audioATocar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticiaMiniaturaGuardadas;
