import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import audio from "../fallen-down.mp3";

function AudioPlayer(props) {
  const [audioNoticia] = useState(new Audio(audio));

  const [aTocar, setATocar] = useState(false);

  const playPause = () => {
    
      if (aTocar) {
        audioNoticia.pause();
        props.func(false);
      } else {
        audioNoticia.play();
        props.func(true);
      }

      setATocar(!aTocar);
    
  };

  useEffect(() => {
    audioNoticia.addEventListener("ended", () => {
      setATocar(false);
      props.func(false);
    });
    return () => {
      audioNoticia.removeEventListener("ended", () => {
        setATocar(false);
        props.func(false);
      });
    };
  }, []);

  return (
    <div className='my-3'>
      <div className='grid items-center rounded-lg bg-slate-200 w-full h-12 px-1'>
        <div onClick={playPause} className='cursor-pointer'>
          {!aTocar ? (
            <PlayIcon className='h-10 w-10 fill-slate-800' aria-hidden='true' />
          ) : (
            <PauseIcon
              className='h-10 w-10 fill-slate-800'
              aria-hidden='true'
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
