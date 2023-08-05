import { Input, Button, Form, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { UserStore } from '../../../entities/user';

const AuthFormModal = observer(() => {
  const { currentUser } = UserStore;
  const params = useParams();

  const onChange = ({ username }: { username: string }) => {
    UserStore.setCurrentUser({
      id: username + '-' + new Date().getTime(),
      name: username,
    });

    const ws = new WebSocket('ws://localhost:8000/');

    const data = JSON.stringify({
      socket: params.id,
      type: 'hello',
      ...UserStore.currentUser,
    });

    ws.onopen = () => {
      ws.send(data);
    };

    ws.onmessage = ({ data }) => {
      const { type, payload } = JSON.parse(data);
      if (type === 'hello') {
        UserStore.addUser(payload);
      }
    };
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
