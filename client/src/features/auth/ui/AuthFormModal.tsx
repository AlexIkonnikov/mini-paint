import { Input, Button, Form, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { UserStore } from '../../../entities/user';
import getRandomColor from '../../../shared/lib/getRandomColor';
import Ws from '../../../shared/lib/Socket';

const USE_SERVER = false;

const AuthFormModal = observer(() => {
  const { currentUser } = UserStore;
  const { id } = useParams();

  const onChange = ({ username }: { username: string }) => {
    UserStore.setCurrentUser({
      id: username + '-' + new Date().getTime(),
      name: username,
      color: getRandomColor(),
    });

    USE_SERVER && id && Ws.init(id);
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
