import { useRef, useEffect, useReducer, useMemo, memo, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
const KeepAlive = (props: any) => {
  const outlet = useOutlet();
  const { include } = props; // 需要缓存的路由
  const { pathname } = useLocation();
  const componentList = useRef(new Map());
  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
    setActiveKey(pathname);
    componentList.current.forEach(function (value, key) {
      if (!include.includes(key)) {
        this.delete(key);
      }
    });
    if (!componentList.current.has(pathname)) {
      componentList.current.set(pathname, outlet);
    }
  }, [pathname]);

  return (
    <div>
      {Array.from(componentList.current).map(([key, component]) => (
        <div key={key}>
          {key === activeKey ? <div>{component}</div> : <div style={{ display: 'none' }}>{component}</div>}
        </div>
      ))}
    </div>
  );
};

export default memo(KeepAlive);
