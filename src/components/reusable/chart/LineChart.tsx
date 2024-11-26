import { IndicatorValue } from '@/types/slaChart';
import { Line } from '@ant-design/plots';

interface LinechartProps {
  data: IndicatorValue[];
}

const LineChart: React.FC<LinechartProps> = ({ data }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: false },
    colorField: 'category',
  };

  return <Line theme="dark" {...config} />;
};

export default LineChart;
