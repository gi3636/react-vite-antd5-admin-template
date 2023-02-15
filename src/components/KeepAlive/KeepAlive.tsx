import { memo, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import useForceUpdate from '@/hooks/useForceUpdate';
import { emitter, EmitterType } from '@/utils/app-emitter';

const KeepAlive = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const componentList = useRef(new Map());
  const [activeKey, setActiveKey] = useState<string>('');
  const contentRef = useRef(null);
  const handleForceUpdate = useForceUpdate(); //强制刷新
  const navigate = useNavigate();

  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);

  /**
   * 将当前路由的组件存储到componentList中,主要用在组件刷新
   */
  useEffect(() => {
    if (!componentList.current.has(pathname)) {
      componentList.current.set(pathname, outlet);
      handleForceUpdate();
    }
  });

  /**
   * 刷新当前路由的组件
   */
  const handleReload = () => {
    componentList.current.delete(pathname);
    navigate(pathname);
  };

  /**
   * 监听全局刷新事件
   */
  useEffect(() => {
    emitter.singleton(EmitterType.forceReload, () => {
      handleReload();
    });
  }, [pathname]);

  useEffect(() => {
    emitter.singleton(EmitterType.clearComponentCache, () => {
      componentList.current.clear();
    });
  });

  return (
    <div ref={contentRef}>
      {Array.from(componentList.current).map(([key, component]) => (
        <div key={key}>
          <div style={{ display: key === activeKey ? 'block' : 'none', transition: 'all 0.3s ease' }}>{component}</div>
        </div>
      ))}
    </div>
  );
};

export default memo(KeepAlive);
