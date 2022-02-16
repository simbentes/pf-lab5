/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Menu, Popover, Transition, Dialog } from "@headlessui/react";
import {
  MenuIcon,
  LogoutIcon,
  BookmarkAltIcon,
  MicrophoneIcon,
  MinusCircleIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { terminarSessao } from "../firebase";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar(props) {
  const navegar = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {console.log(isOpen)}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='fixed z-10 inset-0 overflow-y-auto'
      >
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
        <div className='relative bg-white rounded max-w-sm mx-auto mt-48 p-5'>
          <div className='font-semibold text-md'>
            <MicrophoneIcon className='h-6 w-6 mr-1 inline' />
            Definições de Voz
          </div>
          <div>
            <div className='py-5'>
              <div className='font-medium pb-4 text-sm'>Pessoa</div>
              <div className='grid grid-cols-2 justify-between mb-12'>
                <div className='relative text-center'>
                  <input
                    type='radio'
                    id='masculina'
                    name='voz'
                    value='masculina'
                    className='peer hidden'
                  />
                  <label
                    htmlFor='masculina'
                    className='bg-gray-200 rounded-tl-md rounded-bl-md  py-3.5 absolute right-0 left-0  peer-checked:bg-indigo-600 peer-checked:text-white'
                  >
                    Joaquim
                  </label>
                </div>
                <div className='relative text-center'>
                  <input
                    type='radio'
                    id='feminina'
                    name='voz'
                    value='CSS'
                    className='peer hidden'
                  />
                  <label
                    htmlFor='feminina'
                    className='bg-gray-200 rounded-tr-md rounded-br-md py-3.5 absolute right-0 left-0  peer-checked:bg-indigo-600 peer-checked:text-white'
                  >
                    Joana
                  </label>
                </div>
              </div>
              <div className='pt-5'>
                <div className='font-medium pb-2 text-sm'>Velocidade</div>
                <input
                  type='range'
                  id='velocidade'
                  name='velocidade'
                  min='0'
                  max='50'
                  className='w-full'
                />
              </div>
              <div className='pt-5'>
                <div className='font-medium pb-2 text-sm'>Pitch</div>
                <input
                  type='range'
                  id='pitch'
                  name='velocidade'
                  min='0'
                  max='50'
                  className='w-full'
                />
              </div>
            </div>
          </div>
          <div className='text-right'>
            <button className='bg-gray-200 rounded-md py-2 px-4 mx-1'>
              Repor
            </button>
          </div>
        </div>
      </Dialog>
      <Popover className='relative bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <Link to='/'>
                <span className='text-lg font-semibold'> Primeiro Jornal.</span>
              </Link>
            </div>
            <div className='-mr-2 -my-2 md:hidden'>
              <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
            <Popover.Group as='nav' className='hidden md:flex space-x-10'>
              <Link
                to='/ultimas'
                className='text-base font-medium text-gray-500 hover:text-gray-900 px-3 mx-2'
              >
                Últimas
              </Link>
              <Link
                to='/omeufeed'
                className='text-base font-medium text-gray-500 hover:text-gray-900 px-3 mx-2'
              >
                O Meu Feed
              </Link>
            </Popover.Group>
            <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
                    <div className='flex justify-center items-center'>
                      <div>
                        <img
                          src={props.user.photoURL}
                          className='rounded-full mx-auto h-9 mr-2'
                        ></img>
                      </div>
                      <div>{props.user.displayName}</div>
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className='font-semibold px-4 py-2 text-sm hover:cursor-pointer hover:text-gray-900 hover:bg-gray-100'
                            onClick={() => setIsOpen(true)}
                          >
                            <MicrophoneIcon className='h-6 w-6 mr-1 inline' />
                            Definições de Voz
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/guardadas'
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "font-semibold text-gray-500 hover:text-gray-900 block px-4 py-2 text-sm"
                            )}
                          >
                            <BookmarkAltIcon className='h-6 w-6 mr-1 inline' />
                            Notícias Guardadas
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href=''
                            onClick={() => {
                              terminarSessao();
                              navegar("/");
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm border-t-2"
                            )}
                          >
                            <LogoutIcon className='h-6 w-6 mr-1 inline' />
                            Terminar Sessão
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
}

export default NavBar;
