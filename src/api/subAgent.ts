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
