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
