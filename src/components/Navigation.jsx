import React, { Fragment, useState } from 'react';
import { TbLayoutDashboard, TbFileLike, TbFiles, TbUser } from 'react-icons/tb';

import { BiMenuAltRight } from 'react-icons/bi';
import { mainNav } from '../constants/nav';
import { UserAuth } from '../context/AuthContext';
import Menu from './Menu';

const Navigation = () => {
  const { selectedNav, setSelectedNav } = UserAuth();

  const selectedStyle =
    'flex items-center bg-primary text-white rounded px-4 py-2 cursor-pointer';

  const idleStyle =
    'flex items-center px-4 py-2 cursor-pointer text-font-primary hover:bg-gray-100 rounded';

  return (
    <div className="flex font-light justify-between">
      <span
        onClick={() => setSelectedNav(mainNav.Dashboard)}
        className={
          selectedNav === mainNav.Dashboard ? selectedStyle : idleStyle
        }
      >
        <TbLayoutDashboard className="mr-2" />
        <span className="text-sm">{mainNav.Dashboard}</span>
      </span>
      <span
        onClick={() => setSelectedNav(mainNav.Apply)}
        className={selectedNav === mainNav.Apply ? selectedStyle : idleStyle}
      >
        <TbFileLike className="mr-2" />
        <span className="text-sm">{mainNav.Apply}</span>
      </span>
      <span
        onClick={() => setSelectedNav(mainNav.Applications)}
        className={
          selectedNav === mainNav.Applications ? selectedStyle : idleStyle
        }
      >
        <TbFiles className="mr-2" />
        <span className="text-sm">{mainNav.Applications}</span>
      </span>
      <span
        onClick={() => setSelectedNav(mainNav.CoverLetter)}
        className={
          selectedNav === mainNav.CoverLetter ? selectedStyle : idleStyle
        }
      >
        <TbFiles className="mr-2" />
        <span className="text-sm">{mainNav.CoverLetter}</span>
      </span>
      <span
        onClick={() => setSelectedNav(mainNav.Profile)}
        className={selectedNav === mainNav.Profile ? selectedStyle : idleStyle}
      >
        <TbUser className="mr-2" />
        <span className="text-sm">{mainNav.Profile}</span>
      </span>
      <span className="flex items-center my-auto px-4 cursor-pointer text-font-primary hover:bg-gray-100 rounded">
        <Menu className="my-auto">
          <BiMenuAltRight className="text-lg" />
        </Menu>
      </span>
    </div>
  );
};

export default Navigation;
