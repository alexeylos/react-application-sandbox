import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Drawer, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import menuItems from '../../constants/menuItems';
import './HamburgerMenu.less';

const HamburgerMenu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  const onClick: MenuProps['onClick'] = (event) => {
    navigate(event.key);
    setCurrentLocation(event.key);
  };

  useEffect(() => {
    if (location.pathname == '/bookings/B1') {
      setCurrentLocation('/bookings');
    } else {
      setCurrentLocation(location.pathname);
    }
  }, [location]);

  return (
    <div className="hamburger-menu">
      <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
      <Drawer className="custom-drawer" placement="left" onClose={onClose} open={visible}>
        <div className="web-logo">
          <img src="https://i.ibb.co/Xbn3Bdm/logo1.png" alt="website logo" />
        </div>
        <Menu
          theme="dark"
          onClick={onClick}
          selectedKeys={[currentLocation]}
          mode="inline"
          items={menuItems}
        />
      </Drawer>
    </div>
  );
};

export default HamburgerMenu;
