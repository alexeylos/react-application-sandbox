import type { MenuProps } from 'antd';
import { Layout as LayoutBase, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import menuItems from '../../constants/menuItems';
import './SiderMenu.less';
const { Sider } = LayoutBase;

const SiderMenu = () => {
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
