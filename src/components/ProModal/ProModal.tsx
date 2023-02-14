import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { emitter } from '@/utils/app-emitter';

interface Props extends React.PropsWithChildren {
  modalKey: string; // 弹窗的唯一标识
  onOK?: (...param) => void; // 点击确定按钮的回调
  onCancel?: () => void; // 点击取消按钮的回调
  title?: string; // 弹窗标题
  footer?: React.ReactNode | null; // 底部按钮
  onInit?: (...param) => void; // 初始化的时候执行
}
const ProModal: React.FC<Props> = ({ onInit, title, onOK, onCancel, modalKey, footer, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    emitter.singleton(`${modalKey}ShowModal`, (data) => {
      setData(data);
      onInit && onInit(data);
      showModal();
    });

    emitter.singleton(`${modalKey}CloseModal`, () => {
      handleCancel();
    });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOK = () => {
    onOK && onOK(data);
  };

  return (
    <Modal title={title} open={isModalOpen} onOk={handleOK} onCancel={handleCancel} footer={footer}>
      {children}
    </Modal>
  );
};

export default ProModal;
