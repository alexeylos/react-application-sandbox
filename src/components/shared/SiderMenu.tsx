import { useState } from 'react';
import { Layout as LayoutBase, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, BookOutlined } from '@ant-design/icons';
import { ROUTES } from '../../constants/common';
import type { MenuProps } from 'antd';

const { Sider } = LayoutBase;

const SiderMenu = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(window.location.pathname);

  const menuItems = [
    { key: ROUTES.HOME, icon: <HomeOutlined />, label: 'Home' },
    { key: ROUTES.BOOKINGS, icon: <BookOutlined />, label: 'Bookings' },
  ];

  const onClick: MenuProps['onClick'] = (event) => {
    navigate(event.key);
    setCurrentLocation(event.key);
  };

  return (
    <div className="custom-sider">
      <Sider>
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
      </Sider>
    </div>
  );
};

export default SiderMenu;
