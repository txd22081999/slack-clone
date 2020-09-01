import React from 'react';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../actionTypes';

import Button from '@material-ui/core/Button';

import './Login.scss';

const Login = () => {
  const [state, dispatch] = useStateValue();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithPopup(provider);
      dispatch({ type: actionTypes.SET_USER, payload: result.user });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
          alt='slack icon'
        />
        <h1>Sign in to Slack clone</h1>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
};

export default Login;
