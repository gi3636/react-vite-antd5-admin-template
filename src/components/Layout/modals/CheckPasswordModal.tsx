import React from 'react';
import ProModal from '@/components/ProModal/ProModal';
import ProForm from '@/components/ProForm';

import { emitter, EmitterType } from '@/utils/app-emitter';
import useRequest from '@/hooks/useRequest';
import { resetPassword } from '@/api/auth';
import { Button, Form, Input, message } from 'antd';
import { IField } from '@/components/SearchForm/SearchForm';

export const passwordFormSchema: IField[] = [
  {
    type: 'InputPassword',
    col: 6,
    name: 'password',
    label: '登录密码',
    rules: [{ required: true, message: '请输入登录密码' }],
    component: <Input.Password />,
  },
  {
    type: 'InputPassword',
    col: 6,
    name: 'repassword',
    dependencies: ['password'],
    label: '确认密码',
    rules: [
      {
        required: true,
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('两次密码不一致!'));
        },
      }),
    ],
    component: <Input.Password />,
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

interface CheckPasswordModalModalProps {
  modalKey: string;
}

function CheckPasswordModal({ modalKey }: CheckPasswordModalModalProps) {
  const [form] = Form.useForm();
  const { loading, run } = useRequest();

  const onSubmit = async () => {
    form.validateFields().then(async (values) => {
      if (values.repassword !== values.password) {
        message.error('重复密码和密码不一致！');
        return;
      }
      delete values.repassword;
      let res = await run(resetPassword({ ...values, type: 1 }));
      if (res.code == 200) {
        emitter.fire(`${modalKey}CloseModal`);
        message.success(res.msg);
        emitter.fire(EmitterType.logout);
      }
    });
  };

  return (
    <ProModal
      modalProps={{
        title: '重置密码',
        closable: false,
        maskClosable: false,
        footer: (
          <Button type='primary' onClick={onSubmit} loading={loading}>
            确认
          </Button>
        ),
      }}
      modalKey={modalKey}
      onOK={onSubmit}>
      <ProForm form={form} fields={passwordFormSchema} />
    </ProModal>
  );
}

export default CheckPasswordModal;
