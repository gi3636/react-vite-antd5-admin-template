import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { emitter } from '@/utils/app-emitter';
import { ModalProps } from 'antd/es/modal/Modal';
interface Props extends React.PropsWithChildren, ModalProps {
  modalKey: string; // 弹窗的唯一标识
  modalProps?: ModalProps; //弹窗的参数
  onOK?: (...param) => void; // 点击确定按钮的回调
  onInit?: (...param) => void; // 初始化的时候执行
}
const ProModal: React.FC<Props> = ({ onInit, onOK, modalKey, children, modalProps }) => {
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
    <Modal {...modalProps} open={isModalOpen} onOk={handleOK} onCancel={handleCancel}>
      {children}
    </Modal>
  );
};

export default ProModal;
