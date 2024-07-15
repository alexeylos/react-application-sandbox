import { Card, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { FeatureCardProps } from '@/types/reuseableCardProps';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, buttonLink }) => {
  const renderButton = () => {
    if (buttonLink) {
      return (
        <Button
          className="btn-style"
          type="primary"
          href={buttonLink}
          icon={<LinkOutlined />}
          block={!!buttonLink}
        >
          Go to the Page
        </Button>
      );
    } else {
      return (
        <Button className="btn-style" disabled block>
          Soon
        </Button>
      );
    }
  };

  return (
    <div>
      <Card>
        <div className="feature-card">
          <div className="left-content">{icon}</div>
          <div className="right-content">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            {renderButton()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeatureCard;
