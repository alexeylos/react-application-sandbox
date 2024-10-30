import { LayoutProps } from '@/types/router';
import { Layout as LayoutBase } from 'antd';
import { useBreakpoint } from '../../lib/responsive';
import HamburgerMenu from '../shared/HamburgerMenu';
import SiderMenu from '../shared/SiderMenu';

const { Content } = LayoutBase;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { lg } = useBreakpoint();
  return (
    <LayoutBase>
      {lg && <SiderMenu></SiderMenu>}
      <LayoutBase>
        <Content className="child-content">
          {!lg && (
            <div className="hamburger">
              <HamburgerMenu></HamburgerMenu>
            </div>
          )}
          {children}
        </Content>
      </LayoutBase>
    </LayoutBase>
  );
};

export default Layout;
