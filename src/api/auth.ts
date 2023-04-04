/** @format */
import { api } from './api';

export function login(param) {
  return {
    url: 'agent/v1/user/login',
    method: 'post',
    data: param,
  };
}

/**
 * 是否需要重置密码
 * @param param
 */
export function checkPassword() {
  return api.post('agent/v1/user/check/password');
}

/**
 * 修改密码
 * @param param
 */
export function resetPassword(param) {
  return {
    url: 'agent/v1/user/update/password',
    method: 'post',
    data: param,
  };
}

/**
 * 获取银行列表
 */
export function getBankList() {
  return api.post('agent/v1/withdraw/bank/list', {});
}

/**
 * 绑定提款地址
 */
export function bindWithdrawMethod(param) {
  return {
    url: 'agent/v1/withdraw/bind/wallet',
    method: 'post',
    data: param,
  };
}

/**
 * 申请提款
 */
export function applyWithdraw(param) {
  return {
    url: 'agent/v1/withdraw/apply/withdraw',
    method: 'post',
    data: param,
  };
}

/**
 * 删除提款地址
 */
export function delWithdrawMethod(param) {
  return api.post('agent/v1/withdraw/remove/wallet', param);
}
