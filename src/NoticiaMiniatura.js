import { useNavigate } from "react-router-dom";

function NoticiaMiniatura(props) {
  const navegar = useNavigate();
  let image;
  try {
    image = props.info.img;
  } catch (e) {
    console.log(e);
  }
  return (
    <div className='bg-white shadow-md m-3 rounded-lg'>
      <img
        src={image}
        className='mx-auto w-full rounded-t-lg h-48 object-cover hover:cursor-pointer '
        onClick={() =>
          navegar("/noticia/" + props.info.fonte + "/" + props.info.id)
        }
      />
      <div className='p-2'>
        <h6 className='text-base leading-4 font-semibold'>
          {props.info.titulo}
        </h6>
        <p className='text-xs'>{props.info.lead}</p>
        <div className='text-right text-base font-extrabold pt-4 pr-1'>
          {props.info.fonte}
        </div>
      </div>
    </div>
  );
}

export default NoticiaMiniatura;
