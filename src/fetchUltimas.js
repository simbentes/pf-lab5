export default function fetchUltimas() {
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

        return fetch("https://observador.pt/wp-json/obs_api/v4/news/widget/");
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

        if (noticias_arr !== []) {
          resolve(noticias_arr);
        } else {
          reject(new Error("Array Vazio"));
        }
      });
  });
}
