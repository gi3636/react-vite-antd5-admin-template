import { api } from '@/api/api';

/**
 * 下级用户列表
 * @param param
 */
export function getSubUserList(param) {
  return {
    url: 'agent/v1/user/user/list',
    method: 'post',
    data: param,
  };
}

/**
 * 下级代理提款管理
 * @param param
 */
export function getSubAgentWithdrawList(param) {
  return {
    url: 'agent/v1/withdraw/agent/withdraw',
    method: 'post',
    data: {
      ...param,
      withdraw_type: 2,
    },
  };
}

/**
 * 提款记录
 * @param param
 */
export function getWithdrawRecordList(param) {
  return {
    url: 'agent/v1/withdraw/agent/withdraw',
    method: 'post',
    data: {
      ...param,
      withdraw_type: 1,
    },
  };
}

/**
 * 修改下级提款状态
 * @param param
 */
export function updateWithdrawRecord(param) {
  return api.post('/agent/v1/withdraw/update/withdraw', param);
}

/**
 * 提现地址列表
 * @param param
 */
export function getWithdrawWalletList() {
  return api.post('/agent/v1/withdraw/wallet/list', {});
}
