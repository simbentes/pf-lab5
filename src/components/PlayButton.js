import { useState } from "react";
import { Dialog } from "@headlessui/react";

function PlayButton() {
  let [isOpen, setIsOpen] = useState(true);
  return (
    <div className='grid grid-cols-2 justify-between'>
      <div className='text-center'>
        <input
          type='radio'
          id='masculina'
          name='voz'
          value='masculina'
          className='peer hidden'
        />
        <label
          htmlFor='masculina'
          className='bg-gray-200 rounded-md py-2 px-4 peer-checked:bg-indigo-600 peer-checked:text-white'
        >
          Joaquim
        </label>
      </div>
      <div className='text-center'>
        <input
          type='radio'
          id='feminina'
          name='voz'
          value='CSS'
          className='peer hidden'
        />
        <label
          htmlFor='feminina'
          className='bg-gray-200 rounded-md py-2 px-4 peer-checked:bg-indigo-600 peer-checked:text-white'
        >
          Joana
        </label>
      </div>
    </div>
  );
}

export default PlayButton;
