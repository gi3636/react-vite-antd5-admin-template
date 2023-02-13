import React from 'react';
import styles from '@/components/layout/header/index.module.scss';
import { Dropdown, MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

function ChangeLangBtn(props) {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          中文
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
          English
        </a>
      ),
    },
  ];
  return (
    <div className={styles.langContainer}>
      <Dropdown menu={{ items }} placement='bottomRight' arrow>
        <GlobalOutlined className={styles.langBtn} style={{ fontSize: 20 }} />
      </Dropdown>
    </div>
  );
}

export default ChangeLangBtn;
