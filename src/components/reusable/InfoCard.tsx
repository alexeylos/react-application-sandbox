import { ReusableCardProps } from '@/types/reuseableCardProps';
import { getDeltaTagColor } from '../../utils/common';
import { Card, Tag } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

const InfoCard: React.FC<ReusableCardProps> = ({ title, value, delta, currency }) => {
  return (
    <div>
      <Card className="custom-card">
        <div className="title">{title}</div>
        <div className="value">
          {currency == 'USD' ? (
            <svg
              width="10"
              height="18"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99902 6.5H11.999C11.999 3.663 9.24402 2.369 6.99902 2.071V0H4.99902V2.071C2.75402 2.369 -0.000976562 3.663 -0.000976562 6.5C-0.000976562 9.206 2.66502 10.613 4.99902 10.93V15.9C3.55102 15.649 1.99902 14.876 1.99902 13.5H-0.000976562C-0.000976562 16.089 2.42402 17.619 4.99902 17.936V20H6.99902V17.93C9.24402 17.632 11.999 16.337 11.999 13.5C11.999 10.663 9.24402 9.369 6.99902 9.071V4.1C8.32902 4.339 9.99902 5.041 9.99902 6.5ZM1.99902 6.5C1.99902 5.041 3.66902 4.339 4.99902 4.1V8.899C3.62802 8.646 1.99902 7.897 1.99902 6.5ZM9.99902 13.5C9.99902 14.959 8.32902 15.661 6.99902 15.9V11.1C8.32902 11.339 9.99902 12.041 9.99902 13.5Z"
                fill="white"
              />
            </svg>
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
