import { Avatar, Row, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import UserStore from '../model/UserStore';

const UserList: FC = observer(() => {
  const { users } = UserStore;

  return (
    <Row>
      {users.map(props => (
        <Tooltip key={props.id} title={props.name}>
          <Avatar style={{ marginRight: 5 }} size={'large'}>
            {props.name[0]}
          </Avatar>
        </Tooltip>
      ))}
    </Row>
  );
});

export default UserList;
