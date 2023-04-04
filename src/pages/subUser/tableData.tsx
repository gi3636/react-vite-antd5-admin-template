import { IField } from '@/components/SearchForm/SearchForm';
import { DatePicker, Input, InputNumber, Select, Tag } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { formatToDate, formatToDateTime } from '@/utils';
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
    title: '会员ID',
    dataIndex: 'uid',
  },
  {
    title: '会员账号',
    dataIndex: 'phone',
  },
  {
    title: '系统设备',
    dataIndex: 'os',
    render: (text) => {
      if (text === 'android') {
        return <Tag color='green'>{text}</Tag>;
      }
      return <Tag color='red'>{text}</Tag>;
    },
  },
  {
    title: '设备号',
    dataIndex: 'devid',
  },
  {
    title: '注册IP',
    dataIndex: 'loginip',
  },
  {
    title: '注册日期',
    dataIndex: 'regtime',
    width: 200,
    render: (value) => {
      return value ? formatToDateTime(value * 1000) : '-';
    },
  },
  {
    title: '最后登录日期',
    dataIndex: 'logtime',
    width: 200,
    render: (value) => {
      return value ? formatToDateTime(value * 1000) : '-';
    },
  },
  {
    title: '钱包余额',
    dataIndex: 'user_money',
  },
  {
    title: '钻石余额',
    dataIndex: 'user_bean',
  },
  {
    title: '我的佣金',
    dataIndex: 'active_money',
  },
];

export const searchSchema: IField[] = [
  {
    col: 6,
    name: 'uid',
    type: 'InputNumber',
    label: '会员ID',
    component: <InputNumber controls={false} />,
  },
  {
    col: 6,
    name: 'phone',
    type: 'Input',
    label: '会员账号',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    name: 'os',
    type: 'Select',
    label: '系统设备',
    component: (
      <Select
        options={[
          {
            label: 'Android',
            value: 'android',
          },
          {
            label: 'Ios',
            value: 'ios',
          },
        ]}
      />
    ),
  },
  {
    col: 6,
    type: 'Input',
    name: 'devid',
    label: '设备号',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    type: 'Input',
    name: 'regip',
    label: '注册IP',
    component: <Input />,
  },
  {
    col: 6,
    name: 'time_type',
    type: 'Select',
    label: '时间类型',
    initialValue: 1,
    component: (
      <Select
        options={[
          {
            label: '注册时间',
            value: 1,
          },
          {
            label: '最后登录时间',
            value: 2,
          },
        ]}
      />
    ),
  },
  {
    col: 8,
    name: 'time',
    label: '日期',
    type: 'RangePicker',
    component: (
      <RangePicker
        showTime={{ defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')] }}
        format='YYYY-MM-DD HH:mm:ss'
      />
    ),
  },
];
