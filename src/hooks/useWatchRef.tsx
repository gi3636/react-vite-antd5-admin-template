import React, { useEffect, useState } from 'react';

export default function useWatchRef(ref) {
  const [refObj, setRefObj] = useState<any>(null);
  let resize = null as any;
  const getWidthAndHeight = (e) => {
    const { width, height } = e.contentRect;
    if (height === refObj?.height) return;
    console.log('e.contentRect', e.contentRect, width, height);
    setRefObj(e.contentRect);
  };

  useEffect(() => {
    // 监听的函数
    resize = new ResizeObserver((e) => {
      if (!Array.isArray(e) || !e.length) return;
      for (const ent of e) {
        getWidthAndHeight(ent);
      }
    });
    // 传入监听对象
    resize.observe(ref?.current);
    // 及时销毁监听函数（重要!!!）
    return () => {
      if (ref.current) {
        resize.unobserve(ref?.current);
      }
    };
  });

  return {
    refObj,
  };
}
