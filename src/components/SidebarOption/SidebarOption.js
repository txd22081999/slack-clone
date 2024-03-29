import React from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../firebase';

import CloseIcon from '@material-ui/icons/Close';
import './SidebarOption.scss';

const SidebarOption = (props) => {
  const { Icon, id, title, addChannelOption, expand } = props;
  const { toggleChannel, toggleOption } = props;
  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push('title');
    }
  };

  const addChannel = () => {
    const channelName = prompt('Please enter the channel name: ');

    if (channelName) {
      db.collection('rooms').add({
        name: channelName
      });
    }
  };

  const deleteChannel = () => {
    const data = db.collection('rooms').doc(id).delete();
  };

  return (
    <div
      className='sidebarOption'
      onClick={() => {
        if (addChannelOption) {
          addChannel();
        } else {
          selectChannel();
        }

        if (title === 'Channels') {
          toggleChannel();
        }

        if (expand) {
          toggleOption();
        }
      }}
    >
      {Icon && <Icon className='sidebarOption__icon' />}
      {/* If there is no icon then it's a channel */}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <>
          <h3 className='sidebarOption__channel'>
            <span className='sidebarOption__hash'>#</span>
            {title}
          </h3>
          <CloseIcon
            className='sidebarOption__close'
            onClick={() => deleteChannel()}
          />
        </>
      )}
    </div>
  );
};

export default SidebarOption;
