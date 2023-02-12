import { IField } from '@/components/search-form/SearchForm';
import { Input } from 'antd';
import React from 'react';
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
  {
    title: 'Name22',
    dataIndex: 'name',
  },
  {
    title: 'Age22',
    dataIndex: 'age',
  },
  {
    title: '测试dress22',
    dataIndex: 'address',
  },
  {
    title: 'Name11',
    dataIndex: 'name',
  },
  {
    title: 'Age11',
    dataIndex: 'age',
  },
  {
    title: '测试dress11',
    dataIndex: 'address',
  },
  {
    title: 'Name11',
    dataIndex: 'name',
  },
  {
    title: 'Age11',
    dataIndex: 'age',
  },
  {
    title: '测试dress11',
    dataIndex: 'address',
  },
  {
    title: 'Name11',
    dataIndex: 'name',
  },
  {
    title: 'Age11',
    dataIndex: 'age',
  },
  {
    title: '测试dress11',
    dataIndex: 'address',
  },
  {
    title: 'Name11',
    dataIndex: 'name',
  },
  {
    title: 'Age11',
    dataIndex: 'age',
  },
  {
    title: '测试dress11',
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
