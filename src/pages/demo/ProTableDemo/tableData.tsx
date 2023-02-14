import { IField } from '@/components/SearchForm/SearchForm';
import { Input, InputNumber } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';

export const columns: ColumnsType = [
  {
    title: '会员ID',
    dataIndex: 'uid',
    width: 10,
  },
  {
    title: '关注度',
    dataIndex: 'attention_name',
    width: 10,
  },
  {
    title: '钻石余额',
    dataIndex: 'money',
    width: 10,
  },
  {
    title: '会员账号',
    dataIndex: 'phone',
    width: 10,
  },
  {
    title: '等级',
    dataIndex: 'gradeName',
    width: 10,
  },
  {
    title: '会员ID',
    dataIndex: 'uid',
    width: 10,
  },
  {
    title: '关注度',
    dataIndex: 'attention_name',
    width: 10,
  },
  {
    title: '钻石余额',
    dataIndex: 'money',
    width: 10,
  },
  {
    title: '会员账号',
    dataIndex: 'phone',
    width: 10,
  },
  {
    title: '等级',
    dataIndex: 'gradeName',
    width: 10,
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
    colon: false,
    name: 'phone',
    label: '会员账号',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    name: 'uid1',
    label: '手机号',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    colon: false,
    name: 'phone1',
    label: '注册IP',
    component: <Input placeholder='placeholder' />,
  },
];
