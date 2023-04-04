import { IField } from '@/components/SearchForm/SearchForm';
import React from 'react';
import { DatePicker, Input, InputNumber, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export const columns: ColumnsType = [
  {
    title: '日期',
    dataIndex: 'data_date',
  },
  {
    title: '代理ID',
    dataIndex: 'aid',
  },
  {
    title: '代理账号',
    dataIndex: 'agent_name',
  },
  {
    title: '代理模式',
    dataIndex: 'agent_mode',
    render: (text) => {
      if (text == 1) {
        return <Tag color='green'>CPA</Tag>;
      } else {
        return <Tag color='red'>CPS</Tag>;
      }
    },
  },
  {
    title: '激活返佣',
    dataIndex: 'agent_comm_cpa_amount',
  },
  {
    title: '活跃用户',
    dataIndex: 'active_user_count',
  },
  {
    title: '新增用户',
    dataIndex: 'register_user_count',
  },
  {
    title: '存款人数',
    dataIndex: 'recharge_user_count',
  },
  {
    title: '存款金额',
    dataIndex: 'recharge_amount',
  },
  {
    title: '提款人数',
    dataIndex: 'withdrawal_user_count',
  },
  {
    title: '提款金额',
    dataIndex: 'withdrawal_amount',
  },
  {
    title: '平均在线时长(分)',
    dataIndex: 'avg_online_time',
  },
  {
    title: '钻石兑换',
    dataIndex: 'diamond_buy_amount',
  },
  {
    title: '有效投注',
    dataIndex: 'valid_amount',
  },
  {
    title: '负盈利',
    dataIndex: 'profit_amount',
  },
  {
    title: '我的佣金',
    dataIndex: 'agent_comm_amount',
  },
];

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
    name: 'a_name',
    label: '代理账号',
    type: 'Input',
    component: <Input />,
  },
  {
    col: 8,
    initialValue: [dayjs().add(-7, 'd'), dayjs()],
    name: 'data_time',
    label: '时间',
    type: 'RangePicker',
    component: <RangePicker format='YYYY-MM-DD' />,
  },
];
