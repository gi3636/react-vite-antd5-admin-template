import { IField } from '@/components/SearchForm/SearchForm';
import { Button, DatePicker, Input, InputNumber, Select, Tag } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { formatToDate } from '@/utils';
import { EditOutlined } from '@ant-design/icons';
import { emitter } from '@/utils/app-emitter';
import { modalKey } from '@/pages/sub-agent/module/sub-agent-list/index';
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
    dataIndex: 'id',
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
      <Button
        icon={<EditOutlined />}
        type='link'
        onClick={() => {
          emitter.fire(`${modalKey}ShowModal`, record);
        }}>
        编辑
      </Button>
    ),
  },
];

export const searchSchema: IField[] = [
  {
    col: 5,
    name: 'id',
    label: '代理ID',
    component: <InputNumber controls={false} />,
  },
  {
    col: 5,
    name: 'username',
    label: '代理账号',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 5,
    name: 'code',
    label: '邀请码',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 9,
    name: 'created_at',
    label: '创建日期',
    type: 'RangePicker',
    component: <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />,
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
          message: '请输入代理账号',
        },
      ],
      component: <Input disabled={isEdit} />,
    },
    {
      col: 6,
      name: 'password',
      label: '代理密码',
      rules: [{ required: !isEdit, message: '请输入代理密码' }],
      component: <Input.Password />,
    },
    {
      col: 6,
      name: 'mode',
      label: '代理模式',
      rules: [{ required: true, message: '请选择代理模式' }],
      component: (
        <Select
          disabled={isEdit}
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
      rules: [{ required: true, message: '请输入激活返佣' }],
      component: <InputNumber addonAfter='元' />,
    },
  ];
};
