import React from 'react';
import styles from './index.module.scss';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import logo from '@/assets/images/logo.svg';
import { globalConfig } from '@/globalConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '@/store';
import { updateUser } from '@/store/user/slice';
import useRequest from '@/hooks/useRequest';
import { login } from '@/api/auth';
import { USER_INFO } from '@/constant';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, run } = useRequest();
  const onFinish = async (values) => {
    const res = await run(login(values));
    if (res && res?.code == 0) {
      localStorage.setItem('token', res?.data?.token);
      dispatch(updateUser(res.data));
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} width={50} height={50}></img>
      <div className={styles.box}>
        <div className={styles.right}>
          <div className={styles.bg}></div>
        </div>
        <div className={styles.left}>
          <div className={styles.loginContainer}>
            <div className={styles.title}>{globalConfig.projectName}</div>
            <div className={styles.welcome}>欢迎回来!!!</div>
            <div>
              <Form
                className={styles.form}
                onFinish={onFinish}
                initialValues={{
                  name: 'zuohao',
                  password: 'admin123',
                }}>
                <Form.Item
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: '请输入账号',
                    },
                  ]}>
                  <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder='请输入账号' />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}>
                  <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder='请输入密码' />
                </Form.Item>
                <Form.Item>
                  <Button className={styles.submitBtn} type='primary' htmlType='submit' loading={loading}>
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
