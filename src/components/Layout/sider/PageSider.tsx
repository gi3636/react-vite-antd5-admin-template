import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { convertMenu, findMenu, getMenus, handleSortMenu } from '@/route/menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTabHistory, setTabHistory } from '@/store/tab/slice';
import { useDispatch, useSelector } from '@/store';
import { useTranslation } from 'react-i18next';
import { globalConfig } from '@/globalConfig';
import useLanguage from '@/hooks/useLanguage';

const { Sider } = Layout;

function PageSider({ collapsed }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const [openKeys, setOpenKeys] = useState(['']);
  const [menuList, setMenuList] = useState([]);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const tab = useSelector((state) => state.tab);
  const { t } = useTranslation();
  const { locale } = useLanguage();

  /**
   * 初始化菜单
   */
  useEffect(() => {
    const menus = getMenus(t);
    handleSortMenu(menus); // 排序菜单
    const menuList: any = menus.map((menu) => {
      return convertMenu(menu, handleClick);
    });
    setMenuList(menuList);
    refreshTabHistory(menus);
  }, [locale]);

  /**
   * 刷新tab记录
   * @param menus
   */
  const refreshTabHistory = (menus) => {
    let menuList = [] as any;
    tab.tabHistory.forEach((item) => {
      let menu = findMenu(menus, item.path);
      if (menu) {
        menuList.push({
          id: menu.id,
          path: menu.path,
          name: menu.name,
        });
      }
    });
    dispatch(setTabHistory(menuList));
  };

  /**
   * 初始化选中菜单
   */
  useEffect(() => {
    const menus = getMenus(t);
    setOpenKeys(['/' + pathname.split('/')[1]]);
    setCurrent(pathname);
    let menu = findMenu(menus, pathname);
    if (menu) {
      dispatch(
        addTabHistory({
          id: menu?.id,
          path: menu?.path,
          name: menu?.name,
        }),
      );
    }
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
   * 更换标题
   */
  useEffect(() => {
    const menus = getMenus(t);
    let menu = findMenu(menus, pathname);
    document.title = `${menu?.name || globalConfig.projectName}-茶色代理后台`;
  }, [pathname]);

  /**
   * 菜单展开事件
   * @param openKeys
   */
  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme={globalConfig.initTheme.dark ? 'dark' : 'light'}>
      {/*<div className='logo'>*/}
      {/*  <img src={logo} alt='logo' width={30} height={30} />*/}
      {/*</div>*/}
      <Menu
        theme={globalConfig.initTheme.dark ? 'dark' : 'light'}
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
