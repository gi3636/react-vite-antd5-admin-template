import { IField } from '@/components/search-form/SearchForm';
import { Input } from 'antd';
import React from 'react';
import { placeholder } from '@babel/types';
import { ColumnsType } from 'antd/es/table';

export const columns: ColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: '测试dress',
    dataIndex: 'address',
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
