/** @format */
import { TypedUseSelectorHook, useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './user/slice';
import ConfigReducer from './config/slice';
import TabReducer from './tab/slice';
// 合并多个reducer
const rootReducer = combineReducers({
  user: UserReducer,
  config: ConfigReducer,
  tab: TabReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // 可以添加自己的中间件,比如打印日志的
  //middleware: getDefaultMiddleware => [...getDefaultMiddleware()],
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => _useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

// 获取全部store数据类型
export type RootState = ReturnType<typeof store.getState>;

export default store;
