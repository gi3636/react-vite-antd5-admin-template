import React, { useEffect, useState } from 'react';
import { Badge, Dropdown, MenuProps, Modal } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { useSelector } from '@/store';
import { formatToDateTime } from '@/utils';
import { readMessage } from '@/api/home';
import { emitter, EmitterType } from '@/utils/app-emitter';

function BellBtn() {
  const user: any = useSelector((state) => state.user);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    let arr =
      user?.messageList?.map((item) => {
        return {
          key: item.id,
          label: (
            <div className={styles.item}>
              <div className={styles.header}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.date}>{formatToDateTime(item?.updated_at * 1000)}</div>
              </div>
              <div className={styles.content}>{item.content}</div>
            </div>
          ),
          onClick: () => {
            readMessage({ id: item.id });
            Modal.info({
              title: item.title,
              content: (
                <div>
                  <div>消息时间：{formatToDateTime(item.created_at * 1000)}</div>
                  <div>消息内容：{item.content}</div>
                </div>
              ),
              onOk() {
                emitter.fire(EmitterType.updateMessageList);
              },
            });
          },
        };
      }) || [];
    setList(arr);
  }, [user]);

  return (
    <div>
      {list?.length > 0 ? (
        <Dropdown menu={{ items: list }} placement='topCenter' arrow>
          <Badge count={list?.length || 0} size={'default'}>
            <BellOutlined className={styles.btn} style={{ fontSize: 20 }} />
          </Badge>
        </Dropdown>
      ) : (
        <BellOutlined
          className={styles.btn}
          style={{ fontSize: 20 }}
          onClick={() => {
            emitter.fire(EmitterType.updateMessageList);
          }}
        />
      )}
    </div>
  );
}

export default BellBtn;
