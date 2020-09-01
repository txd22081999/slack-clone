import React, { useState } from 'react';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../actionTypes';
import './Header.scss';

import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Header = () => {
  const [state, dispatch] = useStateValue();
  const { user } = state;
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className='header'>
      <div className='header__left'>
        <Avatar
          className='header__avatar'
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </div>
      <div className='header__search'>
        <SearchIcon />
        <input
          value={searchInput}
          onChange={(e) => {
            const value = e.target.value;
            dispatch({ type: actionTypes.SET_SEARCH, payload: value });
            setSearchInput(value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setSearchInput('');
              dispatch({ type: actionTypes.SET_SEARCH, payload: '' });
            }
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
