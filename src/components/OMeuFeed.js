import { useState, useEffect, useRef } from "react";
import NoticiaMiniatura from "./NoticiaMiniatura";
import fetchUltimas from "../fetchUltimas";
import fetchMeuFeed from "../fetchUltimas";
import eco from "../icons/eco.svg";
import publico from "../icons/publico.svg";
import observador from "../icons/observador.png";
import SortButton from "./SortButton";
import ButtonSection from "./ButtonSection";

function OMeuFeed() {
  const [noticias, setNoticias] = useState([]);
  const [displayNoticias, setDisplayNoticias] = useState([])
  const [fontes, setFontes] = useState({
    publico: false,
    eco: false,
    observador: false,
  });
  const [temas, setTemas] = useState({
    politica: false,
    economia: false,
    mundo: false,
    cultura: false,
    desporto: false
  })
  const escolherFonte = (id, estado) => {
    setFontes({...fontes, [id]: estado})
  };
  const escolherTema = (id, estado) => {
    setTemas({...temas, [id]: estado})
  }



  useEffect(() => {
    fetchUltimas().then(
      (news) => {
        console.log(news);
        setNoticias(news);
        setDisplayNoticias(news)

      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const checkFontes =(el)=>{
    // check if all fontes are false
    if (!fontes.publico && !fontes.observador && !fontes.eco) return true
    // check if elems fonte is trued in fontes
    if((el.fonte === "publico" && fontes.publico) || (el.fonte === "eco" && fontes.eco) || (el.fonte === "observador" && fontes.observador)) return true
    return false
  }

  useEffect(() => {
    
    const arr_filtrado = noticias.filter((el) => {
      if (checkFontes(el)) return true
    });
      
    setDisplayNoticias(arr_filtrado);
  }, [fontes, temas]);

 

  return (
    <div className='py-5'>
      <h1 className='pl-11 text-center font-semibold text-2xl my-5'>
        O Meu Feed
      </h1>
      <div className='container mx-auto px-10'>
        <div className='pb-7'>
          <ButtonSection name="Temas">
            <SortButton id="politica" content="Política" type="text" onChangeHandle={escolherTema}/>
            <SortButton id="economia" content="Economia" type="text" onChangeHandle={escolherTema}/>
            <SortButton id="mundo" content="Mundo" type="text" onChangeHandle={escolherTema}/>
            <SortButton id="cultura" content="Cultura" type="text" onChangeHandle={escolherTema}/>
            <SortButton id="desporto" content="Desporto" type="text" onChangeHandle={escolherTema}/>
          </ButtonSection>

          <ButtonSection name="Fontes">
            <SortButton id="publico" content={publico} type="img" size="h-6" onChangeHandle={escolherFonte}/>
            <SortButton id="eco" content={eco} type="img" size="h-4" onChangeHandle={escolherFonte}/>
            <SortButton id="observador" content={observador} type="img" size="h-2" onChangeHandle={escolherFonte}/>
          </ButtonSection>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {displayNoticias &&
            displayNoticias.map((el) => <NoticiaMiniatura info={el} key={el.id} />)}
        </div>
      </div>
    </div>
  );
}

export default OMeuFeed;