function NoticiaMiniatura(props) {
  return (
    <div className='bg-white shadow-md m-3 rounded-md'>
      <div key={props.info.id}>
        <img src={props.info.multimediaPrincipal} className='mx-auto w-full' />{" "}
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
