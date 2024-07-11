import React from 'react';
import { Layout as LayoutBase } from 'antd';
import { LayoutProps } from '@/types/router';
import SiderMenu from '../shared/SiderMenu';

const { Content } = LayoutBase;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutBase>
      <SiderMenu></SiderMenu>
      <LayoutBase>
        <Content className="child-content">{children}</Content>
      </LayoutBase>
    </LayoutBase>
  );
};

export default Layout;
