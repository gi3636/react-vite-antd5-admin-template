import { IField } from '@/components/SearchForm/SearchForm';
import { Button, Input, InputNumber } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined } from '@ant-design/icons';
import { emitter } from '@/utils/app-emitter';

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
    render: (value, record, index) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          icon={<EditOutlined />}
          type='link'
          onClick={() => {
            emitter.fire('testShowModal', record);
          }}>
          编辑
        </Button>
        {/*<Button*/}
        {/*  icon={<DeleteOutlined />}*/}
        {/*  type='link'*/}
        {/*  danger*/}
        {/*  onClick={() => {*/}
        {/*    emitter.fire(EmitterType.cancelModal);*/}
        {/*  }}>*/}
        {/*  删除*/}
        {/*</Button>*/}
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
    name: 'phone',
    label: '会员账号',
    // rules: [
    //   {
    //     required: true,
    //   },
    // ],
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
    name: 'phone1123123',
    label: '注册IP',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    name: 'uid135',
    label: '会员ID',
    component: <InputNumber controls={false} />,
  },
  {
    col: 6,
    name: 'phone1',
    label: '会员账号',
    // rules: [
    //   {
    //     required: true,
    //   },
    // ],
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    name: 'uid13',
    label: '手机号',
    component: <Input placeholder='placeholder' />,
  },
  {
    col: 6,
    name: 'phone11231233',
    label: '注册IP',
    component: <Input placeholder='placeholder' />,
  },
];
