import React, { useEffect, useRef, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useOutlet } from 'react-router';
import { useDispatch, useSelector } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteTabHistory } from '@/store/tab/slice';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

// const defaultPanes = new Array(2).fill(null).map((_, index) => {
//   const id = String(index + 1);
//   return { label: `Tab ${id}`, children: '', key: id };
// });

const TabPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState([]);
  const { pathname } = useLocation();
  const tab = useSelector((state) => state.tab);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);

  useEffect(() => {
    let tabHistory = tab?.tabHistory;
    let newItemList = tabHistory.map((item) => {
      return {
        label: item.name,
        children: '',
        key: item.path,
      };
    }) as any;
    setItems(newItemList);
  }, [tab]);

  const remove = (targetKey: TargetKey) => {
    if (items.length === 1) {
      return;
    }
    let newItems: any = items.filter((item: any) => item.key !== targetKey);
    setItems(newItems);
    setActiveKey(newItems[0].key);
    dispatch(deleteTabHistory(targetKey));
    navigate(newItems[0].key);
  };

  return (
    <Tabs
      hideAdd
      onEdit={(targetKey, action) => {
        if (action === 'remove') {
          remove(targetKey);
        }
      }}
      onChange={onChange}
      activeKey={activeKey}
      type='editable-card'
      items={items}
    />
  );
};

export default TabPage;
