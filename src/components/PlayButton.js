import React from "react";
import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/solid";

const PlayButton = React.forwardRef((props, ref) => {

  let playjsx = <PlayIcon className='h-10 w-10 fill-slate-800' aria-hidden='true' />;
  let pausejsx = <PauseIcon className='h-10 w-10 fill-slate-800' aria-hidden='true' />;
  let loadingjsx = <p>loading</p>

  let reference = useRef({ hasStarted: false, times: 0 });
  const [disable, setDisable] = useState(true);
  const [buttonContent, setButtonContent] = useState(loadingjsx);

  

  useEffect(() => {
    if (ref != null) {
      ref.current.pause_func = pause
      ref.current.refresh_func = refresh
    }

  });

  useEffect(() => {
    if (props.contents == undefined) return;

    //console.log("vel: ", typeof props.def_audio.vel, "pitch: ", typeof props.def_audio.pitch);
    reference.current.times += 1;

    fetch_audio()
    
  }, [props.contents]);

  const fetch_audio = () => {

    if (props.contents[0] == null) {
      setButtonContent(<p>Sem audio</p>)
      return 
    }


    reference.current.context = new AudioContext();
    reference.current.source = reference.current.context.createBufferSource();
    fetch("https://pf-py-api.herokuapp.com/audio/", {
      method: "POST",
      body: JSON.stringify({
        type: props.type,
        id: props.id,
        gender: props.def_audio.genero,
        jornal: props.jornal,
        contents: props.contents,
        speed: Number(props.def_audio.vel),
        pitch: Number(props.def_audio.pitch),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        try {
          return reference.current.context.decodeAudioData(arrayBuffer)
        }
        catch (e){
           //console.log(e)
        }
      })
      .then((audioBuffer) => {
        try {
          reference.current.source.buffer = audioBuffer;
        } catch (e) {
          //console.log(e);
        }
        reference.current.source.connect(reference.current.context.destination);
        setDisable(false);
        setButtonContent(playjsx);
      });
  }

  const pause = () => {
    if (disable || !reference.current.hasStarted) return;
    reference.current.context.suspend().then();
    setButtonContent(playjsx);
  };

  const refresh = () => {
    console.log("yo")
    pause()
    reference.current.hasStarted = false
    setDisable(true)
    setButtonContent(loadingjsx);
    fetch_audio()
  }

  const play_pause = () => {
    if (disable) return;

    if (props.pauseAllFunc != undefined) props.pauseAllFunc();

    //console.log(ref)

    if (!reference.current.hasStarted) {
      reference.current.source.start();
      reference.current.hasStarted = true;
      setButtonContent(pausejsx);
    } else if (reference.current.context.state == "running") {
      reference.current.context.suspend().then();
      setButtonContent(playjsx);
    } else if (reference.current.context.state == "suspended") {
      reference.current.context.resume().then();
      setButtonContent(pausejsx);
    }
  };

  return (
    <div ref={ref} className='my-3 grid items-center rounded-lg bg-slate-200 w-full h-12 px-1'>
      <div onClick={play_pause} className='cursor-pointer'>
        {buttonContent}
      </div>
      <button onClick={refresh}>refresh</button>
    </div>
  );
});

export default PlayButton;
