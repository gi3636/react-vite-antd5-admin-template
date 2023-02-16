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
export interface MenuConfig {
  order: number; // 菜单顺序 数字越小越靠前
  menu: MenuItem;
}

export const getMenus = (t) => {
  return [getHomeMenu(t), getDemoMenu(t), getSystemMenu(t)];
};

/**
 * 生成菜单
 * @param menu
 * @param onClick
 */
export function generateMenu(menu: MenuItem, onClick?: (item: MenuItem) => void) {
  if (!menu) {
    return null;
  }
  let children: any = [];
  if (menu?.children && menu?.children.length > 0) {
    children = menu?.children.map((item) => {
      return generateMenu(item, onClick);
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
  menus.sort((a, b) => {
    return a.order - b.order;
  });
  menus.forEach((item) => {
    let menu = item.menu;
    if (menu?.children && menu?.children.length > 0) {
      handleSortMenu(menu.children);
    }
  });
};

export const findMenu = (menus: MenuConfig[], path: string): MenuItem => {
  let menu: any;
  menus.forEach((item) => {
    if (item.menu.path === path) {
      menu = item.menu;
    }
    if (item.menu?.children && item.menu?.children.length > 0) {
      item.menu?.children.forEach((child) => {
        if (child.path === path) {
          menu = child;
        }
      });
    }
  });
  return menu;
};
