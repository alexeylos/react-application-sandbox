import { Card, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { FeatureCardProps } from '@/types/reuseableCardProps';
import { useNavigate } from 'react-router-dom';
import './FeatureCard.less';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, buttonLink }) => {
  const navigate = useNavigate();

  const navigateUrl = (url: string) => {
    navigate(url);
  };
  return (
    <div>
      <Card>
        <div className="feature-card">
          <div className="left-content">{icon}</div>
          <div className="right-content">
            <div className="title">{title}</div>
            <div className="description">{description}</div>

            {buttonLink ? (
              <Button
                onClick={() => navigateUrl(buttonLink)}
                className="btn-style"
                type="primary"
                icon={<LinkOutlined />}
                block={!!buttonLink}
              >
                Go to the Page
              </Button>
            ) : (
              <Button className="btn-style" disabled block>
                Soon
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeatureCard;
