import { Spin } from 'antd';
import { useSlaChart } from '../api/slaDetailsApi';
import ChartContainerCard from '../components/slaChart/ChartContainerCard';
import './Sla.less';

const Sla = () => {
  const { data, isLoading, isError } = useSlaChart();

  if (isError) {
    return <div>Error fetching data</div>;
  }
  if (isLoading) return <Spin tip="Loading bookings..." data-testid="loading-spinner" />;

  return (
    <div>
      <div className="sla-heading">
        <h2>SLA </h2>
        <p> Metrics for last 7 days</p>
      </div>

      <div className="">
        {data.map((value) => (
          <ChartContainerCard data={value} key={value.id} />
        ))}
      </div>
    </div>
  );
};

export default Sla;
