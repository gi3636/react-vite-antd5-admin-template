import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function useLanguage() {
  const { i18n } = useTranslation();
  const locale = useMemo(() => {
    return i18n.resolvedLanguage;
  }, [i18n.resolvedLanguage]);

  return { locale };
}

export default useLanguage;
