import './/styles.less';
import { Card, Flex, Spin } from 'antd';
import { Typography } from 'antd';
import { useDashboardData } from './hooks/useDashboardData';
import Meta from 'antd/es/card/Meta';

const { Title } = Typography;

const App: React.FC = () => {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Flex gap="middle" align="center" vertical>
      <Flex justify="center" align="center">
        <Title>Project X!</Title>
      </Flex>
      <Card
        title="Dashboard"
        style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <Meta
          title={`User Name: ${data?.user_name}`}
          description={`Tickets Sold: ${data?.tickets_sold}`}
        />
      </Card>
    </Flex>
  );
};

export default App;
