/** @format */

import { Emitter } from './emitter';

export enum EmitterType {
  logout,
  forceReload,
  clearComponentCache,
}
class AppEmitter extends Emitter {
  type = EmitterType;
}

export const emitter = new AppEmitter();
