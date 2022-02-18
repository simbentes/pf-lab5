export const fetchMeuFeed = () => {
  const noticias_arr = [];
  return new Promise((resolve, reject) => {
    fetch("https://eco.sapo.pt/wp-json/eco/v1/lists/latest")
      .then((res) => res.json())
      .then((data) => {
        let json_tratato = data.map((e) => {
          return {
            id: e.item.id,
            titulo: e.item.title.long,
            data: e.item.pubDate,
            tag: e.item.type,
            lead: e.item.lead,
            img: e.item.images.wide.urlTemplate,
            fonte: "eco",
          };
        });

        noticias_arr.push(...json_tratato);

        return fetch("https://pf-py-api.herokuapp.com/fetch/", {
          method: "POST",
          body: JSON.stringify({
            link: "https://observador.pt/wp-json/obs_api/v4/news/widget/",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        let json_tratato = data.map((e) => {
          return {
            id: e.id,
            titulo: e.title,
            data: e.publish_date,
            tag: e.tag,
            lead: e.lead,
            img: e.image,
            fonte: "observador",
          };
        });
        noticias_arr.push(...json_tratato);

        return fetch("https://pf-py-api.herokuapp.com/fetch/", {
          method: "POST",
          body: JSON.stringify({
            link: "https://www.publico.pt/api/list/ultimas",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        let json_tratato = data.map((e) => {
          return {
            id: e.id,
            titulo: e.tituloNoticia,
            data: e.data,
            tag: e.tag,
            lead: e.descricao,
            img: e.multimediaPrincipal,
            fonte: "publico",
          };
        });
        noticias_arr.push(...json_tratato);

        noticias_arr.sort(function (a, b) {
          return new Date(b.data) - new Date(a.data);
        });

        if (noticias_arr !== []) {
          resolve(noticias_arr);
        } else {
          reject(new Error("Array Vazio"));
        }
      });
  });
};

export const fetchTemaNoticia = (arr_antigo, temas, fontes) => {
  let arr_noticias = [];
  return new Promise((resolve, reject) => {
    let arr_temas = [];
    for (let prop in temas) {
      if (temas[prop] === true) {
        arr_temas.push(prop);
      }
    }
    Promise.all(
      arr_temas.map((u) =>
        fetch("https://pf-py-api.herokuapp.com/fetch/", {
          method: "POST",
          body: JSON.stringify({
            link: `https://www.publico.pt/api/list/${u}`,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
      )
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((res) => {
        res.forEach((e) => {
          e.forEach((el) => {
            arr_noticias.push({
              id: el.id,
              titulo: el.tituloNoticia,
              data: el.data,
              tag: "sociedade",
              lead: el.descricao,
              img: el.multimediaPrincipal,
              fonte: "publico",
            });
          });
        });

        /* const checkTemas = (el) => {
          if (el.tag == "sociedade" || el.tag == "Sociedade") return true;
          return false;
        };*/

        //remover noticias de tags diferentes
        // let arr_filtrado = arr_noticias.filter((el) => checkTemas(el));

        //remover noticias com o mesmo id
        arr_noticias = arr_noticias.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id));

        arr_noticias.sort(function (a, b) {
          return new Date(b.data) - new Date(a.data);
        });










        

        if (arr_noticias != []) {
          console.log(arr_noticias);
          resolve(arr_noticias);
        } else {
          reject(new Error("Array Vazio"));
        }














      });
  });
};
