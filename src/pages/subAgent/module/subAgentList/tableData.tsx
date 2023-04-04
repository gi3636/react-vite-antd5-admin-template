import { IField } from '@/components/SearchForm/SearchForm';
import { Button, DatePicker, Input, InputNumber, Select, Tag, Space } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { formatToDate } from '@/utils';
import { EditOutlined } from '@ant-design/icons';
import { emitter } from '@/utils/app-emitter';

import { modalKey, resetPasswordModalKey, resetCodeModalKey } from '@/pages/subAgent/module/subAgentList/index';
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
    title: '代理ID',
    dataIndex: 'aid',
  },
  {
    title: '代理账户',
    dataIndex: 'username',
  },
  {
    title: '代理模式',
    dataIndex: 'mode',
    render: (text) => {
      if (text == 1) {
        return <Tag color='green'>CPA</Tag>;
      } else {
        return <Tag color='red'>CPS</Tag>;
      }
    },
  },
  {
    title: '邀请码',
    dataIndex: 'code',
  },
  {
    title: '激活返佣',
    dataIndex: 'active_money',
  },
  {
    title: '钱包余额',
    dataIndex: 'money',
  },
  {
    title: '创建日期',
    dataIndex: 'created_at',
    width: 200,
    render: (text) => {
      return formatToDate(text * 1000, 'YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    render: (value, record, index) => (
      <Space size={5}>
        <Button
          icon={<EditOutlined />}
          type='link'
          onClick={() => {
            emitter.fire(`${modalKey}ShowModal`, record);
          }}>
          编辑
        </Button>
        <Button
          type='link'
          onClick={() => {
            emitter.fire(`${resetPasswordModalKey}ShowModal`, record);
          }}>
          重置密码
        </Button>
        <Button
          type='link'
          onClick={() => {
            emitter.fire(`${resetCodeModalKey}ShowModal`, record);
          }}>
          重置验证码
        </Button>
      </Space>
    ),
  },
];

export const searchSchema: IField[] = [
  {
    col: 5,
    name: 'id',
    label: '代理ID',
    type: 'InputNumber',
    component: <InputNumber controls={false} />,
  },
  {
    col: 5,
    name: 'username',
    label: '代理账号',
    type: 'Input',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 5,
    name: 'code',
    label: '邀请码',
    type: 'Input',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 9,
    name: 'time',
    label: '创建日期',
    type: 'RangePicker',
    component: (
      <RangePicker
        showTime={{ defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')] }}
        format='YYYY-MM-DD HH:mm:ss'
      />
    ),
  },
];

export const getFormSchema = (isEdit: boolean) => {
  return [
    {
      col: 6,
      name: 'username',
      label: '代理账号',
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      component: <Input disabled={isEdit} />,
    },

    {
      col: 6,
      name: 'mode',
      label: '代理模式',
      initialValue: 1,
      rules: [{ required: true }],
      component: (
        <Select
          disabled={true}
          options={[
            { value: 1, label: 'CPA' },
            { value: 2, label: 'CPS' },
          ]}
        />
      ),
    },
    {
      col: 6,
      name: 'active_money',
      label: '激活返佣',
      rules: [{ required: true }],
      component: <InputNumber addonAfter='元' />,
    },
  ];
};

export const codeFormSchema: IField[] = [
  {
    type: 'Input',
    col: 6,
    name: 'code',
    label: '谷歌验证码',
    rules: [{ required: true }],
    component: <Input />,
  },
];

export const passwordFormSchema: IField[] = [
  {
    type: 'Input',
    col: 6,
    name: 'code',
    label: '谷歌验证码',
    rules: [{ required: true }],
    component: <Input />,
  },
];
