/** @format */
import axios from 'axios';
import { message, Modal } from 'antd';
import { emitter } from '@/utils/app-emitter';

export let api;
let url = import.meta.env.VITE_BASE_URL;
if (!url.startsWith('https://')) {
  url = 'https://' + url;
}

api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = `${token}`;
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  function (res) {
    if (res.data.code == -9998) {
      Modal.error({
        title: '重新登录',
        content: 'token已过期，请重新登录',
        onOk() {
          emitter.fire(emitter.type.logout);
          Modal.destroyAll();
        },
      });
      return Promise.reject(res.data);
    }
    if (res.data?.code != 200) {
      message.error(res.data.msg);
      return Promise.reject(res.data);
    }
    return res.data;
  },
  function (res) {
    message.warning('网络异常');
    return Promise.reject(res);
  },
);
