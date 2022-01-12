let server_url = "https://pf-py-api.herokuapp.com/";

const requestPublicationBody = (id) => {
  return new Promise((fullfil, reject) => {
    fetch(server_url + "pub/" + id)
      .then((response) => response.json())
      .then((json) => {
        if (json != {}) fullfil(json.content);
        else reject(new Error("Promised failed"));
      });
  });
};

const requestFromApi = (link_url) => {
  return new Promise((fullfil, reject) => {
    fetch(server_url + "fetch/", {
      method: "POST",
      body: JSON.stringify({
        link: link_url,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json != {}) fullfil(json);
        else reject(new Error("Promised failed"));
      });
  });
};

// example
const getHandle = () => {
  requestPublicationBody(1990981).then((bodyArray) => {
    // fazer aqui o que quisermos com o array do body da noticia
    console.log(bodyArray);
  });
};

const postHandle = () => {
  requestFromApi("https://www.publico.pt/api/list/ultimas").then((json) => {
    // por aqui o que queremos fazer com o json
    console.log(json);
  });
};
