/** @format */
import { api } from './api';

export function getHomeData(params) {
  return api.post('/backoffice/v1/report/agent/home', params);
}

/**
 * 代理域名
 * @param param
 */
export function getAgentDomain() {
  return {
    url: 'agent/v1/user/domain',
    method: 'post',
  };
}

/**
 * 代理渠道包
 * @param param
 */
export function getAgentDownload() {
  return {
    url: 'agent/v1/user/download',
    method: 'post',
  };
}

/**
 * 申请渠道包
 * @param param
 */
export function applyDownload() {
  return {
    url: 'agent/v1/user/apply/download',
    method: 'post',
  };
}

/**
 * 站内信列表
 * @param param
 */
export function getMessageList(param) {
  return api.post('agent/v1/message/list', param);
}

/**
 * 读取站内信
 * @param param
 */
export function readMessage(param) {
  return api.post('agent/v1/message/read', param);
}

/**
 * 获取钱包余额
 * @param param
 */
export function getWalletInfo() {
  return api.post('agent/v1/commission/wallet/info', {});
}

/**
 * 获取代理信息
 * @param param
 */
export function getAgentInfo() {
  return api.post('/agent/v1/user/info', {});
}
