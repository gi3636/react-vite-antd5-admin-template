import * as React from 'react';
import { getDemoMenu } from '@/route/menu/modules/demo';
import { getHomeMenu } from '@/route/menu/modules/home';
import { getSystemMenu } from '@/route/menu/modules/system';

export interface MenuItem {
  id: string;
  path: string;
  name: string;
  order?: number;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export const getMenus = (t) => {
  return [getHomeMenu(t), getDemoMenu(t), getSystemMenu(t)];
};

/**
 * 生成菜单
 * @param menu
 * @param onClick
 */
export function convertMenu(menu: MenuItem, onClick?: (item: MenuItem) => void) {
  if (!menu) {
    return null;
  }
  let children: any = [];
  if (menu?.children && menu?.children.length > 0) {
    children = menu?.children.map((item) => {
      return convertMenu(item, onClick);
    });
  }

  let newMenu = {
    key: menu.path,
    icon: menu.icon,
    path: menu.path,
    label: menu.name,
    children: menu?.children ? children : null,
  };
  return {
    ...newMenu,
    onClick: () => {
      if (menu?.children && menu?.children.length > 0) {
        return;
      }
      onClick && onClick(menu);
    },
  };
}

/**
 * 菜单排序
 * @param menus
 */
export const handleSortMenu = (menus) => {
  if (!menus || menus.length === 0) {
    return [];
  }
  menus.forEach((menu) => {
    if (menu?.children && menu?.children.length > 0) {
      handleSortMenu(menu.children);
    }
  });
  return menus.sort((a, b) => {
    return a?.order - b?.order;
  });
};

export const findMenu = (menus: MenuItem[], path: string): MenuItem | null => {
  if (!menus || menus.length === 0) {
    return null;
  }
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];
    if (item.path === path) {
      return item;
    }
    if (item.children && item.children.length > 0) {
      const menu = findMenu(item.children, path);
      if (menu) {
        return menu;
      }
    }
  }
  return null;
};
