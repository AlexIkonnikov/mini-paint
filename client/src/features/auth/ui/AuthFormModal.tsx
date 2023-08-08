import { Input, Button, Form, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { UserStore } from '../../../entities/user';

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
        userId: UserStore.currentUser?.id,
      },
    });

    socket.emit('hello', UserStore.currentUser, socket.id);

    socket.on('hello', (user, id) => {
      UserStore.addUser(user);
      socket.emit('hello-to', UserStore.currentUser, id);
    });

    socket.on('hello-to', user => {
      UserStore.addUser(user);
    });

    socket.on('user-leave', (userId: string) => {
      UserStore.removeUser(userId);
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
