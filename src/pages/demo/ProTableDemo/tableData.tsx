import { IField } from '@/components/SearchForm/SearchForm';
import { Button, Input, InputNumber } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const columns: ColumnsType = [
  {
    title: '会员ID',
    dataIndex: 'uid',
  },
  {
    title: '关注度',
    dataIndex: 'attention_name',
  },
  {
    title: '钻石余额',
    dataIndex: 'money',
  },
  {
    title: '会员账号',
    dataIndex: 'phone',
  },
  {
    title: '等级',
    dataIndex: 'gradeName',
  },
  {
    title: '会员ID',
    dataIndex: 'uid',
  },
  {
    title: '关注度',
    dataIndex: 'attention_name',
  },
  {
    title: '钻石余额',
    dataIndex: 'money',
  },
  {
    title: '会员账号',
    dataIndex: 'phone',
  },
  {
    title: '等级',
    dataIndex: 'gradeName',
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    render: () => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button icon={<EditOutlined />} type='link'>
          编辑
        </Button>
        <Button icon={<DeleteOutlined />} type='link' danger>
          删除
        </Button>
      </div>
    ),
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
    name: 'phone1123123',
    label: '注册IP',
    component: <Input placeholder='placeholder' />,
  },
];
