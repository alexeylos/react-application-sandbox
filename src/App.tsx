import './styles.less';
import { Card, Flex, Spin } from 'antd';
import { Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useDashboardData } from './api/dashboard';

const { Title } = Typography;

const App: React.FC = () => {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return <Spin size="large" data-testid="loading-spinner" />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Flex gap="middle" align="center" vertical>
      <Flex justify="center" align="center">
        <Title>Project X!</Title>
      </Flex>
      <Card title="Dashboard" className="custom-card">
        <Meta
          title={`User Name: ${data?.user_name}`}
          description={`Tickets Sold: ${data?.tickets_sold}`}
        />
      </Card>
    </Flex>
  );
};

export default App;
