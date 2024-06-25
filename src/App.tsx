import { Button, Flex } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const App = () => {
  const check = "hello world"
  return (
    <Flex gap="middle" align="center" vertical>
      <Flex justify="center" align="center">
        <Title>Hello World!</Title>
      </Flex>
      <Flex gap="middle" justify="center" align="center">
        <Button type="primary">Primary Button</Button>
        <Button type="dashed">Dashed Button</Button>
      </Flex>
    </Flex>
  );
};

export default App;
