import { IndicatorValue } from '@/types/slaChart';
import { Chart, Column } from '@ant-design/plots';

interface BarchartProps {
  data: IndicatorValue[];
}

const Barchart: React.FC<BarchartProps> = ({ data }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    style: {
      fill: '#f5b041',
    },
    onReady: (chart: Chart) => {
      try {
        const { height } = chart._container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];
        chart.on(
          'afterrender',
          () => {
            chart.emit('tooltip:show', {
              data: {
                data: tooltipItem,
              },
              offsetY: height / 2 - 60,
            });
          },
          true,
        );
      } catch (e) {
        console.error(e);
      }
    },
  };

  return <Column theme="dark" className="chart" {...config} />;
};

export default Barchart;
