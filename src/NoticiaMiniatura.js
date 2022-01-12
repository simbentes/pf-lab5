import { useNavigate } from "react-router-dom";
import eco from "./eco.svg";

function NoticiaMiniatura(props) {
  const navegar = useNavigate();
  let image;
  try {
    image = props.info.img;
  } catch (e) {
    console.log(e);
  }
  return (
    <div className='relative bg-white shadow-md m-3 rounded-lg pb-3'>
      <img
        src={image}
        className='mx-auto w-full rounded-t-lg h-48 object-cover hover:cursor-pointer '
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
        {props.info.fonte == "eco" ? (
          <img src={eco} className='w-10 absolute bottom-2 right-2' />
        ) : (
          "adeus"
        )}
      </div>
    </div>
  );
}

export default NoticiaMiniatura;
