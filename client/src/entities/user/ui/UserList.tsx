import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import UserStore from '../model/UserStore';

import UserAvatar from './UserAvatar';

const UserList: FC = observer(() => {
  const { users } = UserStore;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {users.map(props => (
        <UserAvatar {...props} key={props.id} />
      ))}
    </div>
  );
});

export default UserList;
