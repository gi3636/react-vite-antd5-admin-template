/** @format */
import { api } from './api';

export function login(param) {
  return {
    url: 'admin/api/login',
    method: 'post',
    data: param,
  };
}

export function register(param) {
  return api.post('api/auth/register', param);
}
