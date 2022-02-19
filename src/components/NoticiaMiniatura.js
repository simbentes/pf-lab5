import React from "react";
import { Link } from "react-router-dom";
import eco from "../icons/eco.svg";
import observador from "../icons/observador.png";
import publico from "../icons/publico.svg";
import PlayButton from "./PlayButton";

const NoticiaMiniatura = React.forwardRef((props, ref) => {
  const data = new Date(props.info.data);

  let image;
  try {
    image = props.info.img;
  } catch (e) {
    image = observador;
    console.log(e);
  }

  return (
    <div className='relative bg-white shadow-md m-3 rounded-lg pb-24'>
      <Link to={`/noticia/${props.info.fonte}/${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}/${props.info.id}`}>
        <img src={image} className='mx-auto w-full rounded-t-lg h-60 object-cover hover:cursor-pointer' />
      </Link>
      <div className='px-2 py-3'>
        <Link to={`/noticia/${props.info.fonte}/${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}/${props.info.id}`}>
          <h6 className='text-base leading-5 font-semibold mb-2'>{props.info.titulo.replace(/(<([^>]+)>)/gi, "") /*props.info.titulo*/}</h6>
          <p className='text-xs'>{props.info.lead}</p>
        </Link>
        <div className='absolute bottom-8 right-2.5 left-2.5'>
          <PlayButton
            contents={[props.info.lead]}
            id={props.info.id}
            type='desc'
            jornal={props.info.fonte}
            def_audio={props.def_audio}
            ref={ref}
            pauseAllFunc={props.pauseAllFunc}
          />
        </div>
      </div>
      <div>
        {(() => {
          switch (props.info.fonte) {
            case "eco":
              return <img src={eco} className='w-11 absolute bottom-3 right-3' />;
            case "observador":
              return <img src={observador} className='w-28 absolute bottom-3 right-3' />;
            case "publico":
              return <img src={publico} className='w-5 absolute bottom-3 right-3' />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
});

export default NoticiaMiniatura;
