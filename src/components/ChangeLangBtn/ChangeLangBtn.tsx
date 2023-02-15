import React, { useMemo } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { LanguageType } from '@/type';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import useLanguage from '@/hooks/useLanguage';
function ChangeLangBtn(props) {
  const { i18n } = useTranslation();
  const { locale } = useLanguage();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          className={locale === LanguageType.Zh ? styles.active : ''}
          onClick={() => {
            i18n.changeLanguage(LanguageType.Zh);
          }}>
          中文
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          className={locale === LanguageType.En ? styles.active : ''}
          onClick={() => {
            i18n.changeLanguage(LanguageType.En);
          }}>
          English
        </div>
      ),
    },
  ];
  return (
    <div>
      <Dropdown menu={{ items }} placement='bottomRight' arrow>
        <GlobalOutlined className={styles.langBtn} style={{ fontSize: 20 }} />
      </Dropdown>
    </div>
  );
}

export default ChangeLangBtn;
