import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserAuth } from '../context/AuthContext';

const StatusDropdown = ({ children }) => {
  const { signOut } = UserAuth();

  const handleTwitterClick = () => {
    const newURL = 'https://twitter.com/engrbyhustle';
    chrome.tabs.create({ url: newURL });
  };

  return (
    <Menu as="div" className="relative inline-block text-left -mt-2">
      <Menu.Button>{children}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-3 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleTwitterClick}
                  className={`${
                    active ? 'bg-primary-hover text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Follow on Twitter
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={signOut}
                  className={`${
                    active ? 'bg-primary-hover text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default StatusDropdown;
