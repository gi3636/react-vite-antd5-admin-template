import React from 'react';
import ProForm from '@/components/ProForm';
import { Button, Form, message } from 'antd';
import { passwordFormSchema } from '@/components/Layout/modals/CheckPasswordModal';
import styles from './index.module.scss';
import { resetPassword } from '@/api/auth';
import { emitter, EmitterType } from '@/utils/app-emitter';
import useRequest from '@/hooks/useRequest';

function Reset(props) {
  const form = Form.useForm()[0];
  const { run, loading } = useRequest();

  const handleResetPassword = async () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      let res = await run(resetPassword({ ...values, type: 1 }));
      if (res.code == 200) {
        message.success(res.msg);
        emitter.fire(EmitterType.logout);
      }
    });
  };
  return (
    <div className={styles.container}>
      <ProForm
        form={form}
        fields={passwordFormSchema}
        formItemLayout={{
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        }}
      />
      <Button type='primary' className={styles.submitBtn} onClick={handleResetPassword} loading={loading}>
        重置密码
      </Button>
    </div>
  );
}

export default Reset;
