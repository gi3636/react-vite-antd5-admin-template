import React from 'react';
import { Button } from 'antd';
import '../../components/Layout/index.less';
import { useTranslation } from 'react-i18next';
import { LanguageType } from '@/types';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Button
        onClick={() => {
          i18n.changeLanguage(LanguageType.Zh);
        }}>
        中文
      </Button>
      <Button
        onClick={() => {
          i18n.changeLanguage(LanguageType.En);
        }}>
        English
      </Button>
      {t('welcome')}

      <div>{t('projectName')}</div>
    </div>
  );
};

export default Home;
