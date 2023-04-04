/** @format */

import { Emitter } from './emitter';

export enum EmitterType {
  logout,
  forceReload,
  clearComponentCache,
  updateWithdrawMethodList,
  updateMessageList,
  updateWalletInfo,
  updateAgentInfo,
}
class AppEmitter extends Emitter {
  type = EmitterType;
}

export const emitter = new AppEmitter();
