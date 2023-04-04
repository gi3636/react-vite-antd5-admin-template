import React, { useRef } from 'react';
import ProModal from '@/components/ProModal/ProModal';
import ProForm from '@/components/ProForm';
import { passwordFormSchema } from './tableData';
import { emitter } from '@/utils/app-emitter';
import { Form, message, Modal } from 'antd';
import useRequest from '@/hooks/useRequest';
import { resetAgentPassword } from '@/api/subAgent';

interface IAddSubAgentModalProps {
  modalKey: string;
  handleReload: () => void;
}

function AddSubAgentModal({ modalKey, handleReload }: IAddSubAgentModalProps) {
  const [form] = Form.useForm();
  const { loading, run } = useRequest();

  let record = useRef<any>();

  const onSubmit = async () => {
    form.validateFields().then(async (values) => {
      let res = await run(resetAgentPassword({ ...values, id: record?.current?.aid }));
      if (res.code == 200) {
        message.success(res.msg);
        handleReload();
        emitter.fire(`${modalKey}CloseModal`);
        Modal.info({
          title: '重置成功',
          content: <p>重置成功，密码为: {res?.data?.password}</p>,
        });
      }
    });
  };

  const onInit = (values) => {
    record.current = values;
    form.resetFields();
  };

  return (
    <ProModal
      modalProps={{ title: '重置密码', confirmLoading: loading }}
      modalKey={modalKey}
      title={'重置密码'}
      onOK={onSubmit}
      onInit={onInit}>
      <ProForm form={form} fields={passwordFormSchema} />
    </ProModal>
  );
}

export default AddSubAgentModal;
