import { FC } from 'react';

import { IUser } from '../model/UserStore';

const UserAvatar: FC<IUser> = ({ name }) => {
  const firstLetter = name.slice(0, 1);

  return (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: 'red',
        color: 'black',
        fontWeight: '500',
      }}>
      {firstLetter}
    </div>
  );
};

export default UserAvatar;
