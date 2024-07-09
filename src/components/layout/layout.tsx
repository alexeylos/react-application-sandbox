import React from 'react';
import { Layout as LayoutBase } from 'antd';
import { LayoutProps } from '@/types/router';
import SilderMenu from '../shared/SilderMenu';

const { Content } = LayoutBase;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutBase>
      <SilderMenu></SilderMenu>
      <LayoutBase>
        <Content className="child-content">{children}</Content>
      </LayoutBase>
    </LayoutBase>
  );
};

export default Layout;
