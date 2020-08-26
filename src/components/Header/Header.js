import React, { useState } from 'react';
import { useStateValue } from '../../StateProvider';
import './Header.scss';

import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Header = () => {
  const [{ user }] = useStateValue();
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className='header'>
      <div className='header__left'>
        <Avatar
          className='header__avatar'
          // alt='username'
          // src=''
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </div>
      <div className='header__search'>
        <SearchIcon />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) setSearchInput('');
          }}
          placeholder='Search something'
        />
      </div>
      <div className='header__right'>
        <HelpOutlineIcon />
      </div>
    </div>
  );
};

export default Header;
