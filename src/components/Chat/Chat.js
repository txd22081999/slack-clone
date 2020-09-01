import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../actionTypes';
import { useParams } from 'react-router-dom';
import db from '../../firebase';

import './Chat.scss';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from '../Message/Message';
import ChatInput from '../ChatInput/ChatInput';

const Chat = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [state, dispatch] = useStateValue();

  const { search: searchValue } = state;

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomDetails(snapshot.data());
        });

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          setRoomMessages(data);
          dispatch({ type: actionTypes.SET_MESSAGES, payload: data });
        });
    }
  }, [roomId]);

  const handleSearch = () => {};

  const includeString = (str, value) => {
    return str.toLowerCase.includes(value);
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <div className='chat__headerLeft'>
          <h4 className='chat__channelName'>
            <strong># {roomDetails?.name}</strong>
            <StarBorderIcon />
          </h4>
        </div>

        <div className='chat__headerRight'>
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>

      <div className='chat__messages'>
        {roomMessages.map((item, index) => {
          const { message, timestamp, user, userImage } = item;

          // Render all messages when search input is empty
          if (!searchValue) {
            return (
              <Message
                key={index}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          }

          // Render only messages that match search input value
          if (
            searchValue.length > 0 &&
            message?.toLowerCase().includes(searchValue)
          ) {
            return (
              <Message
                key={index}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          }
        })}

        {/* {roomMessages.map((item, index) => {
          const { message, timestamp, user, userImage } = item;
          return (
            <Message
              key={index}
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
            />
          );
        })} */}
      </div>

      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
};

export default Chat;
