import { Input, Button, Form, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { UserStore } from '../../../entities/user';
import { IUser } from '../../../entities/user/model/UserStore';

const AuthFormModal = observer(() => {
  const { currentUser } = UserStore;
  const params = useParams();

  const onChange = ({ username }: { username: string }) => {
    UserStore.setCurrentUser({
      id: username + '-' + new Date().getTime(),
      name: username,
    });

    const socket = io('ws://localhost:8000', {
      query: {
        roomId: params.id,
      },
    });

    socket.emit('hello', params.id, UserStore.currentUser);

    socket.on('hello', data => {
      UserStore.addUser(data);
    });

    socket.on('user-list', users => {
      (users as IUser[]).forEach(user => {
        UserStore.addUser(user as IUser);
      });
    });
  };

  return (
    <Modal
      open={currentUser === null}
      title={'Представьтесь:'}
      closable={false}
      footer={[
        <Form.Item key="submit">
          <Button type="primary" form={'auth_from'} htmlType="submit">
            Войти
          </Button>
        </Form.Item>,
      ]}>
      <Form layout="vertical" onFinish={onChange} name="auth_from">
        <Form.Item label="Ваше имя:" name="username">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AuthFormModal;
