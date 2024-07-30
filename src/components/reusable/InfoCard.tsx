import { ReusableCardProps } from '@/types/reuseableCardProps';
import { getDeltaTagColor } from '../../utils/common';
import { Card, Tag } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import './InfoCard.less';

const InfoCard: React.FC<ReusableCardProps> = ({ title, value, delta, currency }) => {
  return (
    <div>
      <Card className="custom-card">
        <div className="title">{title}</div>
        <div className="value">
          {currency === 'USD' ? (
            <img src="../../asset/dollar.svg" alt="Dollar icon" srcSet="" />
          ) : (
            ''
          )}
          <span>{value}</span>
        </div>
        <Tag color={getDeltaTagColor(delta)}>
          <div className="inside-tag">
            <span className={delta > 0 ? 'color-green' : 'color-red'}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
            {delta !== 0 ? <span>{delta > 0 ? <RiseOutlined /> : <FallOutlined />}</span> : ''}
          </div>
        </Tag>
      </Card>
    </div>
  );
};

export default InfoCard;
