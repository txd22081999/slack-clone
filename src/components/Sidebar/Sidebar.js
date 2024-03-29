import React, { useEffect, useState } from 'react';
import './Sidebar.scss';

import SidebarOption from '../SidebarOption/SidebarOption';

import db from '../../firebase';
import { useStateValue } from '../../StateProvider';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

const Sidebar = () => {
  const [{ user }] = useStateValue();
  const [channels, setChannels] = useState([]);
  const [displayChannel, setDisplayChannel] = useState(true);
  const [displayOption, setDisplayOption] = useState(true);

  useEffect(() => {
    db.collection('rooms').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name
      }));
      setChannels(data);
    });
  }, []);

  const toggleChannel = () => {
    setDisplayChannel(!displayChannel);
  };

  const toggleOption = () => {
    setDisplayOption(!displayOption);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__info'>
          <h2>Clone Inc.</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>

        <CreateIcon />
      </div>
      {displayOption && (
        <>
          <SidebarOption Icon={InsertCommentIcon} title='Threads' />
          <SidebarOption Icon={InboxIcon} title='Mention & reactions' />
          <SidebarOption Icon={DraftsIcon} title='Saved items' />
          <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
          <SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
          <SidebarOption Icon={AppsIcon} title='Apps' />
          <SidebarOption Icon={FileCopyIcon} title='Files browser' />
        </>
      )}

      <SidebarOption
        Icon={displayOption ? ExpandLessIcon : ExpandMoreIcon}
        expand={true}
        title={displayOption ? 'Show less' : 'Show more'}
        toggleOption={toggleOption}
      />

      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title='Add channel' />

      <hr />
      <SidebarOption
        Icon={ExpandMoreIcon}
        title='Channels'
        toggleChannel={toggleChannel}
      />

      {displayChannel &&
        channels.map((channel) => (
          <SidebarOption
            key={channel.id}
            title={channel.name}
            id={channel.id}
          />
        ))}
    </div>
  );
};

export default Sidebar;
