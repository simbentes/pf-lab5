import React from "react";
import { useAuth, isDefAudio } from "../firebase";
import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/solid";

const PlayButton = React.forwardRef((props, ref) => {

  let reference = useRef({ hasStarted: false, times: 0 });
  const [disable, setDisable] = useState(true);
  const [buttonContent, setButtonContent] = useState(<p>loading</p>);

  let playjsx = <PlayIcon className='h-10 w-10 fill-slate-800' aria-hidden='true' />;
  let pausejsx = <PauseIcon className='h-10 w-10 fill-slate-800' aria-hidden='true' />;

  useEffect(() => {
    //console.log(ref)
    if (ref != null) ref.current.pause_func = pause
  });


  useEffect(() => {
    
    if (props.contents == undefined) return;

    reference.current.times += 1
    //console.log(reference.current.times)

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
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => reference.current.context.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        try{
          reference.current.source.buffer = audioBuffer;
        }
        catch (e) {
          //console.log(e)
        }
        reference.current.source.connect(reference.current.context.destination);
        setDisable(false);
        setButtonContent(playjsx);
        
        
      });
  }, [props.contents]);


  const pause = () => {
    if (disable || !reference.current.hasStarted) return;
    reference.current.context.suspend().then();
    setButtonContent(playjsx);
  }

  const play_pause = () => {
    if (disable ) return;

    console.log(reference.current.context.state)
    if (props.pauseAllFunc != undefined) props.pauseAllFunc()

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
    </div>
  );
});

export default PlayButton;
