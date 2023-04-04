import { IField } from '@/components/SearchForm/SearchForm';
import React from 'react';
import { Input, InputNumber, DatePicker, Select, Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { formatToDateTime } from '@/utils';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

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
    title: '姓名',
    dataIndex: 'real_name',
  },
  {
    title: '提款方式',
    dataIndex: 'type',
    render: (value) => {
      return value === 1 ? 'USDT' : '银行卡';
    },
  },
  {
    title: '提款类型',
    dataIndex: 'bank_name',
  },
  {
    title: '提款地址',
    dataIndex: 'address',
  },
  {
    title: '提款金额',
    dataIndex: 'money',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '申请时间',
    dataIndex: 'created_at',
    render: (value) => {
      return value ? formatToDateTime(value * 1000) : '-';
    },
  },
  {
    title: '操作时间',
    dataIndex: 'atime',
    render: (value) => {
      return value ? formatToDateTime(value * 1000) : '-';
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (value) => {
      switch (value) {
        case 0:
          return <Tag>申请中</Tag>;
        case 1:
          return <Tag color='green'>通过</Tag>;
        case 2:
          return <Tag color='red'>拒绝</Tag>;
      }
    },
  },
];

export const searchSchema: IField[] = [
  {
    col: 6,
    name: 'type',
    type: 'Select',
    label: '提款方式',
    component: (
      <Select
        options={[
          { value: 1, label: 'USDT' },
          { value: 2, label: '银行卡' },
        ]}
      />
    ),
  },
  {
    col: 4,
    name: 'time_type',
    type: 'Select',
    label: '时间',
    style: { padding: 0 },
    component: (
      <Select
        options={[
          { value: 1, label: '申请时间' },
          { value: 2, label: '操作时间' },
        ]}
      />
    ),
  },
  {
    col: 8,
    name: 'time',
    label: '',
    colStyle: { padding: 0 },
    type: 'RangePicker',
    component: (
      <RangePicker
        showTime={{ defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')] }}
        format='YYYY-MM-DD HH:mm:ss'
      />
    ),
  },
];
