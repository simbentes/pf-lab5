export default function fetchUltimas(num = 25, id = null, fonte) {
  const noticias_arr = [];
  return new Promise((resolve, reject) => {
    if (fonte == "eco") {
      fetch(`https://eco.sapo.pt/wp-json/eco/v1/items/id/${id}/related`)
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

          resolve(json_tratato);
        });
    }
    fetch("https://eco.sapo.pt/wp-json/eco/v1/lists/latest")
      .then((res) => res.json())
      .then((data) => {
        let json_tratato = data.map((e) => {
          console.log(e);
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
          console.log(e);
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
          console.log(e);
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
          if (num < 25) {
            console.log(noticias_arr);
            console.log(id);
            const noticias_arr_reduzido = noticias_arr.filter((e, i) => i < num + 1 && e.id != id);
            resolve(noticias_arr_reduzido);
          } else {
            resolve(noticias_arr);
          }
        } else {
          reject(new Error("Array Vazio"));
        }
      });
  });
}
