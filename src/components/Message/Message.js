import React from 'react';

import './Message.scss';

const Message = (props) => {
  const { message, timestamp, user, userImage } = props;

  let time = new Date(timestamp?.toDate()).toUTCString();
  return (
    <div className='message'>
      <img src={userImage} alt='user avatar' />
      <div className='message__info'>
        <h4>
          {user} <span className='message__timestamp'>{time}</span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
