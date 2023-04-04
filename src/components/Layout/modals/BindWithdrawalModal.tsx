import React, { useEffect, useRef, useState } from 'react';
import ProModal from '@/components/ProModal/ProModal';
import ProForm from '@/components/ProForm';

import { emitter, EmitterType } from '@/utils/app-emitter';
import useRequest from '@/hooks/useRequest';
import { bindWithdrawMethod, getBankList } from '@/api/auth';
import { Form, Input, message, Select } from 'antd';
import { IField } from '@/components/SearchForm/SearchForm';
import { useSelector } from '@/store';

const getBindWithdrawalFields = (bankList: Array<any>[]): IField[] => {
  return [
    {
      type: 'Select',
      col: 6,
      name: 'type',
      label: '提款方式',
      rules: [{ required: true }],
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
      type: 'Select',
      col: 6,
      name: 'bank_name',
      label: '提款类型',
      rules: [{ required: true }],
      showComponent: (values) => {
        return true;
      },
      component: (values) => {
        let options: any =
          values?.type === 1
            ? [
                { value: 'TRC20', label: 'TRC20' },
                { value: 'ERC20', label: 'ERC20' },
              ]
            : bankList;
        return <Select options={options} />;
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
      component: <Input />,
    },
    {
      type: 'Input',
      col: 6,
      name: 'address',
      label: '提款地址',
      showComponent: (values) => {
        return values.type === 1;
      },
      rules: [
        {
          required: true,
        },
      ],
      component: <Input />,
    },
    {
      type: 'Input',
      col: 6,
      name: 'address',
      label: '银行卡号',
      showComponent: (values) => {
        return values.type === 2;
      },
      rules: [
        {
          required: true,
        },
      ],
      component: <Input />,
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
  const [bankList, setBankList] = useState<any>([]);
  const user: any = useSelector((state) => state.user);
  useEffect(() => {
    getBankList().then((res) => {
      if (res.code == 200) {
        setBankList(convertBankList(res.data.bank || []));
      }
    });
  }, []);

  const convertBankList = (bankList: any) => {
    return bankList.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
  };

  const onSubmit = async () => {
    form.validateFields().then(async (values) => {
      let res = await run(bindWithdrawMethod({ ...values, aid: user?.aid }));
      if (res.code == 200) {
        emitter.fire(`${modalKey}CloseModal`);
        message.success('绑定成功');
        emitter.fire(EmitterType.updateWithdrawMethodList);
      }
    });
  };

  const onInit = (values) => {
    record.current = values;
    form.resetFields();
  };

  return (
    <ProModal
      modalProps={{ title: '绑定提款地址', confirmLoading: loading, width: 400 }}
      modalKey={modalKey}
      onOK={onSubmit}
      onInit={onInit}>
      <ProForm form={form} fields={getBindWithdrawalFields(bankList)} />
    </ProModal>
  );
}

export default BindWithdrawalModal;
