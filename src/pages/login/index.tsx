import React from 'react';
import styles from './index.module.scss';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import logo from '@/assets/images/logo.svg';
import { globalConfig } from '@/globalConfig';
import { configConstant } from '@/constant/configConstant';
import { useNavigate } from 'react-router-dom';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { Emitter } from '@/utils/emitter';
import { clearAllTabHistory } from '@/store/tab/slice';
import { useDispatch } from '@/store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    localStorage.setItem(configConstant.USER_INFO, JSON.stringify({ ...values, token: '123' }));
    navigate('/', { replace: true });
    emitter.fire(EmitterType.clearComponentCache);
    dispatch(clearAllTabHistory());
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
