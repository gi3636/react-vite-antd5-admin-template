import React, { useEffect, useRef, useState } from 'react';
import ProModal from '@/components/ProModal/ProModal';
import ProForm from '@/components/ProForm';
import { getFormSchema } from '@/pages/subAgent/module/subAgentList/tableData';
import { emitter } from '@/utils/app-emitter';
import { Form, message, Modal } from 'antd';
import useRequest from '@/hooks/useRequest';
import { addSubAgent, editSubAgent } from '@/api/subAgent';

interface IAddSubAgentModalProps {
  modalKey: string;
  handleReload: () => void;
}
function AddSubAgentModal({ modalKey, handleReload }: IAddSubAgentModalProps) {
  const [form] = Form.useForm();
  const { loading, run } = useRequest();
  const [formFields, setFormFields] = useState<any>(getFormSchema);
  const [isEdit, setIsEdit] = useState(false);
  let record = useRef<any>();

  useEffect(() => {
    setFormFields(getFormSchema(isEdit));
  }, [isEdit]);

  const onSubmit = async () => {
    form.validateFields().then(async (values) => {
      // 如果密码为空，则不传
      if (values.password == '') {
        delete values.password;
      }
      let res = await run(isEdit ? editSubAgent({ ...values, id: record?.current?.aid }) : addSubAgent(values));
      if (res.code == 200) {
        handleReload();
        emitter.fire(`${modalKey}CloseModal`);
        message.success(res.msg);

        Modal.success({
          title: '操作成功',
          content: (
            <div>
              <p>账号：{res?.data?.username}</p>
              <p>密码：{res?.data?.password}</p>
              <img src={res.data.url} />
              <p style={{ marginTop: 7 }}>谷歌验证码:{res?.data?.secret}</p>
            </div>
          ),
        });
      }
    });
  };

  const onInit = (values) => {
    form.resetFields();
    if (values) {
      record.current = values;
      setIsEdit(true);
      form.setFieldsValue({ ...values });
    } else {
      setIsEdit(false);
    }
  };

  return (
    <ProModal
      modalProps={{ title: isEdit ? '编辑下级代理' : '添加代理', confirmLoading: loading }}
      modalKey={modalKey}
      title={'添加下级代理'}
      onOK={onSubmit}
      onInit={onInit}>
      <ProForm form={form} fields={formFields} />
    </ProModal>
  );
}

export default AddSubAgentModal;
