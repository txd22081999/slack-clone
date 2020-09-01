import React, { useState } from 'react';
import firebase from 'firebase';
import db from '../../firebase.js';
import { useStateValue } from '../../StateProvider';

import './ChatInput.scss';

const ChatInput = (props) => {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  const { channelId } = props;
  // console.log(channelId);

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      // console.log(db.collection('rooms').doc(channelId).collection('messages'));
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL
      });
    }
    setInput('');
  };

  return (
    <div className='chatInput'>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ...`}
        />
        <button type='submit' onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
