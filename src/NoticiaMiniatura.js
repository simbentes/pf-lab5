import { useNavigate } from "react-router-dom";

function NoticiaMiniatura(props) {
  const navegar = useNavigate();
  return (
    <div className='bg-white shadow-md m-3 rounded-lg'>
      <div key={props.info.id}>
        <img
          src={props.info.multimediaPrincipal}
          className='mx-auto w-full rounded-t-lg h-48 object-cover hover:cursor-pointer '
          onClick={() => navegar("/noticia/" + props.info.id)}
        />
        <div className='p-2'>
          <h6 className='text-base leading-4 font-semibold'>
            {props.info.titulo}
          </h6>
          <p className='text-xs'>{props.info.descricao}</p>
        </div>
      </div>
    </div>
  );
}

export default NoticiaMiniatura;
