import React, {useEffect, useState} from 'react';

const Profile = (props) => {

  const [imageUrl, setUrl] = useState('');
  const {metadata} = props;
  // const imageUrl = metadata.avatarUrl;
  useEffect(() => {
    if (metadata) {
        // Could do something else here if data already exsisted
        setUrl(metadata.avatarUrl);
        console.log(metadata);
    }
  }, [metadata]);

  return(
    <div>
      Profile
      <img src='https://avatar-cdn.tracker.gg/api/avatar/2/MullyF.png' alt='avatar'>
      </img>
    </div>

  )
};

export default Profile;