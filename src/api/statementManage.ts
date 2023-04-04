/**
 * 报表管理-用户报表
 * @param param
 */
export function getUserReport(param) {
  return {
    url: 'backoffice/v1/report/agent/user',
    method: 'post',
    data: param,
  };
}

/**
 * 报表管理-代理报表
 * @param param
 */
export function getAgentReport(param) {
  return {
    url: 'backoffice/v1/report/agent/agent',
    method: 'post',
    data: param,
  };
}
