import React from "react";
import { useState, useEffect, useRef } from "react";

const PlayButton = (props) => {
  let reference = useRef({});
  let hasStarted = false;
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    reference.current.context = new AudioContext();
    reference.current.source = reference.current.context.createBufferSource();
    fetch("https://pf-py-api.herokuapp.com/audio/", {
      method: "POST",
      body: JSON.stringify({
        type: "body",
        id: 167,
        gender: "male",
        jornal: "obs1x",
        contents: ["olá, novas tecnologias da comunicação"],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        reference.current.context.decodeAudioData(arrayBuffer)
      )
      .then((audioBuffer) => {
        reference.current.source.buffer = audioBuffer;
        reference.current.source.connect(reference.current.context.destination);
        setDisable(false);
      });
  }, []);

  const play = () => {
    if (!hasStarted) {
      reference.current.source.start();
      hasStarted = true;
    } else if (reference.current.context.state == "running") {
      reference.current.context.suspend().then();
    } else if (reference.current.context.state == "suspended") {
      reference.current.context.resume().then();
    }
  };

  return (
    <button disabled={disable} onClick={play}>
      Play Audio
    </button>
  );
};

export default PlayButton;
