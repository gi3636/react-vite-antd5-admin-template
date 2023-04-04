/**
 * 下级用户列表
 * @param param
 */
export function getSubAgentList(param) {
  return {
    url: 'agent/v1/user/list',
    method: 'post',
    data: param,
  };
}

/**
 * 创建下级代理
 * @param param
 */
export function addSubAgent(param) {
  return {
    url: 'agent/v1/user/create',
    method: 'post',
    data: param,
  };
}

/**
 * 创建下级代理
 * @param param
 */
export function editSubAgent(param) {
  return {
    url: 'agent/v1/user/update',
    method: 'post',
    data: param,
  };
}

/**
 * 充值代理密码
 * @param param
 */
export function resetAgentPassword(param) {
  return {
    url: 'agent/v1/user/reset/password',
    method: 'post',
    data: param,
  };
}

/**
 * 充值谷歌验证码
 * @param param
 */
export function resetCode(param) {
  return {
    url: 'agent/v1/user/reset/code',
    method: 'post',
    data: param,
  };
}
