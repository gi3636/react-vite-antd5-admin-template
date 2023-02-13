/** @format */
import { api } from './api';

export function getQuestionList(param) {
  return api.get('/question/list/test', param);
}

export function testApi(param) {
  return api.post('/merchant/member/user/list', param);
}
