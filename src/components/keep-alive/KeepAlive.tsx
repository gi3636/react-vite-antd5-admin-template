import { useRef, useEffect, useReducer, useMemo, memo, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
const KeepAlive = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const componentList = useRef(new Map());
  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
    setActiveKey(pathname);
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
