import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { findMenu, generateMenu, handleSortMenu, menus } from '@/route/menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTabHistory } from '@/store/tab/slice';
import { useDispatch, useSelector } from '@/store';
import logo from '@/assets/images/logo.svg';
const { Sider } = Layout;

function PageSider({ collapsed }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const [openKeys, setOpenKeys] = useState(['']);
  const [menuList, setMenuList] = useState([]);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  /**
   * 初始化菜单
   */
  useEffect(() => {
    handleSortMenu(menus); // 排序菜单
    const menuList: any = menus.map((menu) => {
      return generateMenu(menu.menu, handleClick);
    });
    setMenuList(menuList);
  }, []);

  /**
   * 初始化选中菜单
   */
  useEffect(() => {
    setOpenKeys(['/' + pathname.split('/')[1]]);
    setCurrent(pathname);
    let menu = findMenu(menus, pathname);
    dispatch(
      addTabHistory({
        id: menu.id,
        path: menu.path,
        name: menu.name,
      }),
    );
  }, []);

  /**
   *  当前路由变化时，更新菜单选中状态
   */
  useEffect(() => {
    let openKey = '/' + pathname.split('/')[1];
    // 如果openKeys中不存在openKey，则添加
    if (openKeys.indexOf(openKey) === -1) {
      openKeys.push(openKey);
    }
    setOpenKeys(openKeys);
    setCurrent(pathname);
  }, [pathname]);

  /**
   * 菜单点击事件
   * @param e
   */
  const handleClick = (e: any) => {
    navigate(e.path);
    setCurrent(e.path);
    dispatch(
      addTabHistory({
        id: e.id,
        path: e.path,
        name: e.name,
      }),
    );
  };

  /**
   * 菜单展开事件
   * @param openKeys
   */
  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      {/*<div className='logo'>*/}
      {/*  <img src={logo} alt='logo' width={30} height={30} />*/}
      {/*  <span style={{ marginLeft: 5, transitionDelay: '1s', visibility: collapsed ? 'hidden' : 'visible' }}>*/}
      {/*    管理后台*/}
      {/*  </span>*/}
      {/*</div>*/}
      <Menu
        theme='dark'
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuList}
        selectedKeys={[current]}
      />
    </Sider>
  );
}

export default PageSider;