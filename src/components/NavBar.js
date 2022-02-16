/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  LogoutIcon,
  BookmarkAltIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { terminarSessao } from "../firebase";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar(props) {
  const navegar = useNavigate();
  return (
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
                        <div className='px-4 py-2 text-sm'>
                          <div className='font-semibold mb-2'>Voz</div>
                          <div className='grid grid-cols-2 justify-between'>
                            <div className='text-center'>
                              <button className='bg-indigo-600  text-white rounded-md py-2 px-4'>
                                Joaquim
                              </button>
                            </div>
                            <div className='text-center'>
                              <button className='bg-gray-200 rounded-md py-2 px-4'>
                                Joana
                              </button>
                            </div>
                          </div>
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
                          <BookmarkAltIcon className='h-6 w-6 mr-2 inline' />
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
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          <LogoutIcon className='h-6 w-6 mr-2 inline' />
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

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
        >
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                    alt='Workflow'
                  />
                </div>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Política
                </a>

                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Sociedade
                </a>
              </div>
              <button
                onClick={terminarSessao}
                className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
              >
                Terminar Sessão
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default NavBar;
