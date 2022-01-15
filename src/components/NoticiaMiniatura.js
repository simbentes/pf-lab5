import { useNavigate } from "react-router-dom";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";

function NoticiaMiniatura(props) {
  const navegar = useNavigate();
  let image;
  try {
    image = props.info.img;
  } catch (e) {
    console.log(e);
  }
  return (
    <div className='relative bg-white shadow-md m-3 rounded-lg pb-4'>
      <img
        src={image}
        className='mx-auto w-full rounded-t-lg h-60 object-cover hover:cursor-pointer '
        onClick={() =>
          navegar("/noticia/" + props.info.fonte + "/" + props.info.id)
        }
      />
      <div className='px-2 py-3'>
        <h6 className='text-base leading-5 font-semibold mb-2'>
          {props.info.titulo}
        </h6>
        <p className='text-xs'>{props.info.lead}</p>
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
              return "Jornal Público";
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default NoticiaMiniatura;
