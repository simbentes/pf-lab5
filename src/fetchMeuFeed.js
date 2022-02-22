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
            link: "https://observador.pt/wp-json/obs_api/v4/news/widget/latest/",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        let json_tratato = [];
        data.forEach((e) => {
          // verificação para remover podcasts pois não têm texto
          if (!e.title.includes("As notícias")) {
            json_tratato.push({
              id: e.id,
              titulo: e.title,
              data: e.publish_date,
              tag: e.tag,
              lead: e.lead,
              img: e.image,
              fonte: "observador",
            });
          }
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
        console.log(prop);
        arr_temas.push(prop);
      }
    }

    const promises_publico = arr_temas.map((tema) =>
      fetch("https://pf-py-api.herokuapp.com/fetch/", {
        method: "POST",
        body: JSON.stringify({
          link: `https://www.publico.pt/api/list/${tema}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    );

    const promises_eco = arr_temas.map((tema) => fetch(`https://eco.sapo.pt/wp-json/eco/v1/lists/tag/slug/${tema}/items`));

    Promise.all([...promises_publico, ...promises_eco])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((res) => {
        console.log(res);
        res.forEach((e_array) => {
          let domain;
          try {
            domain = new URL(e_array[0].shareUrl);
          } catch (e) {
            domain = new URL(e_array[0].item.links.webUri);
          }

          console.log(domain.hostname);

          if (domain.hostname == "www.publico.pt") {
            e_array.forEach((el) => {
              arr_noticias.push({
                id: el.id,
                titulo: el.tituloNoticia,
                data: el.data,
                tag: el.tags,
                lead: el.descricao,
                img: el.multimediaPrincipal,
                fonte: "publico",
              });
            });
          } else if (domain.hostname == "eco.sapo.pt") {
            e_array.forEach((el) => {
              let imagem_eco;
              try {
                imagem_eco = el.item.images.wide.urlTemplate;
              } catch {
                imagem_eco = null;
              }
              arr_noticias.push({
                id: el.item.id,
                titulo: el.item.title.long,
                data: el.item.pubDate,
                tag: el.item.type,
                lead: el.item.lead,
                img: imagem_eco,
                fonte: "eco",
              });
            });
          }
        });
        /*   Promise.all(promises_eco)
          .then((responses) => Promise.all(responses.map((res) => res.json())))
          .then((res) => {
            console.log(res);
            
          });*/

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

        //quando todos os fetchs estiverem resolvidos, podemos lançar o array de noti
        Promise.allSettled([...promises_publico, ...promises_eco]).then((results) => {
          const tudo = results.every((el) => el.status == "fulfilled");

          if (tudo) {
            console.log(results);
            console.log(arr_noticias);
            resolve(arr_noticias);
          } else {
            reject(new Error("Array Vazio"));
          }
        });
      });
  });
};
