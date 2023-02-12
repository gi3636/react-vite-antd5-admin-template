import React from 'react';
import styles from './index.module.scss';
import LoginBg from '@/assets/images/login-bg.svg';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Particle from '@/components/particle';
import logo from '@/assets/images/logo.svg';
const Login = () => {
  const onFinish = (values) => {
    alert(JSON.stringify(values));
    console.log('onFinish');
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
            <div className={styles.title}>代理后台</div>
            <div className={styles.welcome}>欢迎回来!!!</div>
            <div>
              <Form className={styles.form} onFinish={onFinish}>
                <Form.Item required={true} name='username'>
                  <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder='请输入账号' />
                </Form.Item>
                <Form.Item name='password'>
                  <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder='请输入密码' />
                </Form.Item>
                <Form.Item>
                  <Button className={styles.submitBtn} type='primary' htmlType='submit'>
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
