/** @format */
import axios from 'axios';
import { message, Modal } from 'antd';
import { emitter } from '@/utils/app-emitter';

export let api;
api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// 请求拦截器
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = `${token}`;
  }
  config.headers.token = 'XIj3fpdfQWimEBuArWX1IBpgVzAAA4eQBvcnpsQQBadE5YxADfdIU0DJdDOjnOan';
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  function (res) {
    if (res.data?.code != 0) {
      message.error(res.data.message);
    }
    if (res.data.code === 21004) {
      Modal.error({
        title: '重新登录',
        content: 'token已过期，请重新登录',
        onOk() {
          emitter.fire(emitter.type.logout);
        },
      });
    }
    return res.data;
  },
  function (res) {
    console.log('res', res);
    message.warning('网络异常');
    return Promise.reject(res);
  },
);
