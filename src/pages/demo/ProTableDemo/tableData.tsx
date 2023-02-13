import { IField } from '@/components/SearchForm/SearchForm';
import { Input } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';

export const columns: ColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '测试dress',
    dataIndex: 'address',
    width: 80,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '测试dress',
    dataIndex: 'address',
    width: 80,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '测试dress',
    dataIndex: 'address',
    width: 80,
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
    rules: [
      {
        required: true,
        message: 'Please input your username!',
      },
    ],
    component: <Input placeholder='placeholder' />,
  },
];
