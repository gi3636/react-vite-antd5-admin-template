import React, { useRef } from 'react';
import ProModal from '@/components/ProModal/ProModal';
import ProForm from '@/components/ProForm';
import { codeFormSchema } from './tableData';
import { emitter } from '@/utils/app-emitter';
import { Form, message, Modal } from 'antd';
import useRequest from '@/hooks/useRequest';
import { resetCode } from '@/api/subAgent';
import { getGoogleQrCodeUrl } from '@/utils';

interface IAddSubAgentModalProps {
  modalKey: string;
  handleReload: () => void;
}

function ResetCodeModal({ modalKey, handleReload }: IAddSubAgentModalProps) {
  const [form] = Form.useForm();
  const { loading, run } = useRequest();
  let record = useRef<any>();
  const onSubmit = async () => {
    form.validateFields().then(async (values) => {
      let res = await run(resetCode({ ...values, id: record?.current?.aid }));
      console.log('record', record);
      if (res.code == 200) {
        message.success(res.msg);
        handleReload();
        emitter.fire(`${modalKey}CloseModal`);
        Modal.info({
          title: '重置成功',
          content: (
            <div>
              <img src={getGoogleQrCodeUrl(record?.current?.aid, res.data?.secret)} alt='验证码' />
              <p style={{ marginTop: 6 }}>谷歌验证码: {res?.data?.secret}</p>
            </div>
          ),
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
      modalProps={{ title: '重置验证码', confirmLoading: loading }}
      modalKey={modalKey}
      onOK={onSubmit}
      onInit={onInit}>
      <ProForm form={form} fields={codeFormSchema} />
    </ProModal>
  );
}

export default ResetCodeModal;
