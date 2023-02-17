import { IField } from '@/components/SearchForm/SearchForm';
import { Input, InputNumber } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';

export const columns: ColumnsType = [
  {
    title: '序号',
    dataIndex: '',
    render: ({ key }) => {
      return key + 1;
    },
    width: 70,
  },
  {
    title: '会员ID',
    dataIndex: 'uid',
  },
  {
    title: '会员账号',
    dataIndex: 'phone',
  },
  {
    title: '注册日期',
    dataIndex: 'regtime',
  },
  {
    title: '系统设备',
    dataIndex: 'os',
  },
  {
    title: '设备号',
    dataIndex: 'dev_info',
  },
  {
    title: '注册IP',
    dataIndex: 'loginip',
  },
  {
    title: '累计存款',
    dataIndex: 'pay_all',
  },
  {
    title: '钱包余额',
    dataIndex: 'money',
  },
  {
    title: '钻石余额',
    dataIndex: 'real_bean',
  },
  {
    title: '钻石消费',
    dataIndex: 'uid',
  },
  {
    title: '有效投注',
    dataIndex: 'attention_name',
  },
  {
    title: '总负盈利',
    dataIndex: 'money',
  },
  {
    title: '我的佣金',
    dataIndex: 'phone',
  },
];

export const searchSchema: IField[] = [
  {
    col: 6,
    name: 'uid',
    label: '会员ID',
    component: <InputNumber controls={false} />,
  },
  {
    col: 6,
    name: 'phone',
    label: '会员账号',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    name: 'os',
    label: '系统设备',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    name: 'dev_info',
    label: '设备号',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    name: 'regip',
    label: '注册IP',
    component: <InputNumber controls={false} />,
  },
  {
    col: 6,
    name: 'regtime',
    label: '注册日期',
    component: <Input placeholder='placeholder' />,
  },
];
