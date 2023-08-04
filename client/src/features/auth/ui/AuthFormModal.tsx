import { Input, Button, Form, Modal } from 'antd';
import { observer } from 'mobx-react-lite';

import { UserStore } from '../../../entities/user';

const AuthFormModal = observer(() => {
  const { currentUser } = UserStore;

  const onChange = ({ username }: { username: string }) => {
    UserStore.setCurrentUser({
      id: username + 'id',
      name: username,
    });
  };

  return (
    <Modal
      open={currentUser === null}
      title={'Авторизация:'}
      closable={false}
      footer={[
        <Form.Item key="submit">
          <Button type="primary" form={'auth_from'} htmlType="submit">
            Авторизоваться
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
