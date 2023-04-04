import React, { useEffect, useRef, useMemo } from 'react';
import ProModal from '@/components/ProModal/ProModal';
import ProForm from '@/components/ProForm';

import { emitter, EmitterType } from '@/utils/app-emitter';
import useRequest from '@/hooks/useRequest';
import { applyWithdraw } from '@/api/auth';
import { Button, Form, Input, InputNumber, message, Select, Space, Tooltip, Typography } from 'antd';
import { IField } from '@/components/SearchForm/SearchForm';
import { useSelector } from '@/store';

const getBindWithdrawalFields = (
  bankList: Array<any>[],
  usdtList: Array<any>[],
  onTypeChange: any,
  onAddressChange: any,
  handleAll: any,
): IField[] => {
  return [
    {
      shouldUpdate: true,
      type: 'Input',
      col: 6,
      name: 'active_money',
      label: '钱包余额',
      component: <Input disabled />,
    },
    {
      type: 'Select',
      col: 6,
      name: 'type',
      label: '提款方式',
      rules: [{ required: true }],
      component: (
        <Select
          onChange={onTypeChange}
          options={[
            { value: 1, label: 'USDT' },
            { value: 2, label: '银行卡' },
          ]}
        />
      ),
    },
    {
      type: 'Select',
      col: 6,
      name: 'wallet_id',
      label: '提款地址',
      rules: [
        {
          required: true,
        },
      ],
      showComponent: (values) => {
        return values.type === 1;
      },
      component: (values) => {
        return <Select onChange={onAddressChange.bind(null, values)} options={usdtList} />;
      },
    },
    {
      type: 'Select',
      col: 6,
      name: 'wallet_id',
      label: '银行卡号',
      rules: [
        {
          required: true,
        },
      ],
      showComponent: (values) => {
        return values.type === 2;
      },
      component: (values) => {
        return <Select onChange={onAddressChange.bind(null, values)} options={bankList} />;
      },
    },
    {
      type: 'Input',
      col: 6,
      name: 'real_name',
      label: '姓名',
      rules: [{ required: true }],
      showComponent: (values) => {
        return values.type === 2;
      },
      component: <Input disabled />,
    },
    {
      type: 'Input',
      col: 6,
      name: 'money',
      label: '提款金额',
      help: <span style={{ color: 'red' }}>*单笔最大金额:¥140000</span>,
      rules: [
        {
          required: true,
        },
      ],
      showComponent: (values) => {
        return values.type === 1;
      },
      component: (values) => {
        return (
          <Space>
            <Form.Item name='money' noStyle rules={[{ required: true }]}>
              <InputNumber min={1} placeholder='请输入提款金额' max={+values?.active_money} />
            </Form.Item>
            <Button onClick={handleAll} type='link'>
              全部
            </Button>
          </Space>
        );
      },
    },
    {
      type: 'Input',
      col: 6,
      name: 'money',
      label: '提款金额',
      help: <span style={{ color: 'red' }}>*单笔最大金额:¥50000</span>,
      rules: [{ required: true }],
      showComponent: (values) => {
        return values.type === 2;
      },
      component: (values) => {
        return (
          <Space>
            <Form.Item name='money' noStyle rules={[{ required: true }]}>
              <InputNumber min={1} placeholder='请输入提款金额' max={+values?.active_money} />
            </Form.Item>
            <Button onClick={handleAll} type='link'>
              全部
            </Button>
          </Space>
        );
      },
    },
    {
      type: 'Input',
      col: 6,
      name: 'code',
      label: '谷歌验证码',
      rules: [{ required: true }],
      component: <Input />,
    },
  ];
};

interface Props {
  modalKey: string;
}

function BindWithdrawalModal({ modalKey }: Props) {
  const [form] = Form.useForm();
  const { loading, run } = useRequest();
  let record = useRef<any>();

  const user: any = useSelector((state) => state.user);

  const withdrawalMethodList = user?.withdrawalMethodList;

  const bankList: any[] = useMemo(() => {
    if (Array.isArray(withdrawalMethodList)) {
      const _arr = withdrawalMethodList.filter((ele) => ele.type === 2);
      return _arr && _arr.length
        ? _arr.map((ele) => {
            return {
              label: `${ele.bank_name}(${ele.address})`,
              value: ele.id,
            };
          })
        : [];
    }
    return [];
  }, [withdrawalMethodList]);

  const usdtList: any[] = useMemo(() => {
    if (Array.isArray(withdrawalMethodList)) {
      const _arr = withdrawalMethodList.filter((ele) => ele.type === 1);
      return _arr && _arr.length
        ? _arr.map((ele) => {
            return {
              label: `${ele.bank_name}(${ele.address})`,
              value: ele.id,
            };
          })
        : [];
    }
    return [];
  }, [withdrawalMethodList]);

  const onSubmit = async () => {
    form.validateFields().then(async (values) => {
      let res = await run(
        applyWithdraw({ money: parseInt(values.money), wallet_id: values.wallet_id, code: values.code }),
      );
      if (res.code == 200) {
        emitter.fire(`${modalKey}CloseModal`);
        message.success('提款成功');
        emitter.fire(EmitterType.updateWalletInfo);
      }
    });
  };

  const onInit = (values) => {
    record.current = values;
    form.resetFields();
    form.setFieldValue('active_money', user?.money);
  };

  const onTypeChange = () => {
    form.setFieldValue('wallet_id', null);
    form.setFieldValue('real_name', '');
  };
  const onAddressChange = (item, value) => {
    if (item.type === 2) {
      const ele = withdrawalMethodList.find((ele) => ele.id === value);
      if (ele && ele.real_name) {
        form.setFieldValue('real_name', ele.real_name);
      } else {
        form.setFieldValue('real_name', '');
      }
    } else {
      form.setFieldValue('real_name', '');
    }
  };

  const handleAll = () => {
    let values = form.getFieldsValue();
    let limit = values.type === 1 ? 50000 : 140000;
    if (user.money > limit) {
      form.setFieldValue('money', limit);
    } else {
      form.setFieldValue('money', user.money);
    }
  };

  return (
    <ProModal
      modalProps={{ title: '申请提款', confirmLoading: loading, width: 400 }}
      modalKey={modalKey}
      onOK={onSubmit}
      onInit={onInit}>
      <ProForm
        form={form}
        fields={getBindWithdrawalFields(bankList, usdtList, onTypeChange, onAddressChange, handleAll)}
      />
    </ProModal>
  );
}

export default BindWithdrawalModal;
