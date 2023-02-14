import React from 'react';
import { Button } from 'antd';
import '../../components/Layout/index.less';
import { useTranslation } from 'react-i18next';
import { LanguageType } from '@/type';
import { EditOutlined } from '@ant-design/icons';
import { emitter, EmitterType } from '@/utils/app-emitter';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Button
        icon={<EditOutlined />}
        type='link'
        onClick={() => {
          emitter.fire(EmitterType.showModal);
        }}>
        编辑
      </Button>
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
