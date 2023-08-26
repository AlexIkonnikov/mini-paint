import { Avatar, Row, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import UserStore from '../model/UserStore';

const UserList: FC = observer(() => {
  const { userList } = UserStore;

  return (
    <Row>
      {userList.map(([id, user]) => (
        <Tooltip key={id} title={user.name}>
          <Avatar
            style={{ marginRight: 5, backgroundColor: user.color }}
            size={'large'}>
            {user.name[0]}
          </Avatar>
        </Tooltip>
      ))}
    </Row>
  );
});

export default UserList;
