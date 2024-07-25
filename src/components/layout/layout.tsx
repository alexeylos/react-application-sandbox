import { Layout as LayoutBase } from 'antd';
import { LayoutProps } from '@/types/router';
import SiderMenu from '../shared/SiderMenu';
import HamburgerMenu from '../shared/HamburgerMenu';
import { useBreakpoint } from '../../utils/responsive';

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
              {' '}
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
