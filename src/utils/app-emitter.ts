/** @format */

import { Emitter } from './emitter';

export enum EmitterType {
  logout,
  showModal,
  cancelModal,
}
class AppEmitter extends Emitter {
  type = EmitterType;
}

export const emitter = new AppEmitter();
