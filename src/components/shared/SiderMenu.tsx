import { useEffect, useState } from 'react';
import { Layout as LayoutBase, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import './SiderMenu.less';
import menuItems from '../../constants/menuItems';
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
    setCurrentLocation(location.pathname);
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
