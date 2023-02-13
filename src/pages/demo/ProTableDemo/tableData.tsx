import { IField } from '@/components/SearchForm/SearchForm';
import { Input } from 'antd';
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
    col: 8,
    name: 'field-0',
    label: 'Field 0',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 8,
    colon: false,
    name: 'field-1',
    label: 'Field 1',
    component: <Input placeholder='placeholder' />,
  },
];
