import { IField } from '@/components/SearchForm/SearchForm';
import React from 'react';
import { Input, InputNumber, DatePicker, Select, Button, Tag, Modal, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { formatToDateTime } from '@/utils';
import { updateWithdrawRecord } from '@/api/subUser';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

export const getColumns = (handleReload?: any): ColumnsType => {
  return [
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
      title: '代理账号',
      dataIndex: 'aname',
    },
    {
      title: '钱包余额',
      dataIndex: 'balance',
    },
    {
      title: '提款金额',
      dataIndex: 'money',
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
      title: '处理时间',
      dataIndex: 'atime',
      render: (value) => {
        return value ? formatToDateTime(value * 1000) : '-';
      },
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (value, record: any, index) => (
        <>
          <Button
            disabled={record.status !== 0}
            type='link'
            onClick={() => {
              Modal.confirm({
                maskClosable: true,
                title: '确认通过',
                content: '确认通过该提款申请吗？',
                onOk: () => {
                  updateWithdrawRecord({ id: record.id, status: 1 }).then((res) => {
                    if (res.code === 200) {
                      handleReload && handleReload();
                      message.success('操作成功');
                    }
                  });
                },
              });
            }}>
            通过
          </Button>
          <Button
            disabled={record.status !== 0}
            type='link'
            danger
            onClick={() => {
              console.log(value);
              let remark = '';
              Modal.confirm({
                maskClosable: true,
                title: '拒绝',
                content: (
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: 50 }}>备注:</div>

                    <Input.TextArea
                      rows={4}
                      onChange={(e) => {
                        console.log(e.target.value);
                        remark = e.target.value;
                      }}></Input.TextArea>
                  </div>
                ),
                onOk: () => {
                  updateWithdrawRecord({ id: record.id, status: 2, remark }).then((res) => {
                    console.log(res);
                    if (res.code === 200) {
                      handleReload && handleReload();
                      message.success('操作成功');
                    }
                  });
                },
              });
            }}>
            拒绝
          </Button>
        </>
      ),
    },
  ];
};

export const searchSchema: IField[] = [
  {
    col: 6,
    name: 'aid',
    label: '代理ID',
    type: 'InputNumber',
    component: <InputNumber controls={false} />,
  },
  {
    col: 6,
    name: 'phone',
    label: '代理账号',
    type: 'Input',
    component: <Input placeholder='placeholder' />,
  },
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
    col: 6,
    name: 'status',
    type: 'Select',
    label: '提款状态',
    component: (
      <Select
        options={[
          { value: 1, label: '通过' },
          { value: 2, label: '拒绝' },
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
          { value: 2, label: '处理时间' },
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
