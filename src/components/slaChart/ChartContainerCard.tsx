import { Agreement } from '@/types/slaChart';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip } from 'antd';
import Barchart from '../reusable/chart/Barchart';
import LineChart from '../reusable/chart/LineChart';
import './ChartContainerCard.less';

interface ChartContainerCardProps {
  data: Agreement;
}

const ChartContainerCard: React.FC<ChartContainerCardProps> = ({ data }) => {
  return (
    <div className="card-container">
      <Card title={data.name}>
        <Row gutter={[32, 32]}>
          {data.indicators.map((indicator) => (
            <Col key={indicator.id} xs={24} sm={24} xl={12}>
              <div className="chart-container">
                <div className="inner-card-header">
                  <div className="header-info">
                    <p>{indicator.title}</p>
                    <Tooltip placement="topLeft" title={indicator.description}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>

                  <div className="header-details">
                    {indicator.name == 'uptime' ? (
                      <>
                        <span className="obj-properties">
                          {' '}
                          <span className="uptime-count">
                            {indicator.values.length > 0
                              ? (indicator.values[indicator.values.length - 1].value * 100).toFixed(
                                  2,
                                )
                              : 0}
                            %
                          </span>{' '}
                          Internal object :{' '}
                          <span className="bold">{indicator.internal_objective}% </span> External
                          object : <span className="bold">{indicator.external_objective}% </span>
                        </span>
                      </>
                    ) : (
                      <span className="uptime-count">
                        {indicator.values.length > 0
                          ? indicator.values[indicator.values.length - 1].value.toFixed(2)
                          : 0}{' '}
                        ms
                      </span>
                    )}
                  </div>

                  <div className="chart">
                    {indicator.name == 'uptime' ? (
                      <Barchart data={indicator.values} />
                    ) : (
                      <LineChart data={indicator.values} />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default ChartContainerCard;
