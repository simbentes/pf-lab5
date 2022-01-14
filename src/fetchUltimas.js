export default function fetchUltimas() {
  return new Promise(function)
  
  
  
  
  
  
  
  
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
      let arr = noticias;
      arr.push(...json_tratato);
      setNoticias(arr);
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
      let arr = noticias;
      arr.push(...json_tratato);
      setNoticias(arr);
    });



}
