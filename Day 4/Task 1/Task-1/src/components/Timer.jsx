import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, setValue } from '../features/counter/counterSlice';
import { Button, Typography, InputNumber, Space, Card, List, message } from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;

function Timer() {
  const dispatch = useDispatch();
  const { value, history } = useSelector((state) => state.counter);
  //useselector will detect changes
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    if (value !== 0 && value % 10 === 0) {
      message.success(`Count reached ${value}`);
    }
  }, [value]);

  return (
    <Card style={{ width: 400, margin: '50px auto', textAlign: 'center' }}>
      <Title level={3}>Global Counter</Title>

      <Title level={2}>{value}</Title>

      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => dispatch(increment())}>
          Increment
        </Button>

        <Button danger onClick={() => dispatch(decrement())}>
          Decrement
        </Button>

        <Button onClick={() => dispatch(reset())}>
          Reset
        </Button>
      </Space>

      <Space>
        <InputNumber
          placeholder="Set value"
          value={inputValue}
          onChange={(val) => setInputValue(val)}
        />
        <Button
          type="dashed"
          onClick={() => {
            if (inputValue !== null) {
              dispatch(setValue(inputValue));
              setInputValue(null);
            }
          }}
        >
          Set
        </Button>
      </Space>

      <Title level={4} style={{ marginTop: 30 }}>
        History
      </Title>

      <List
        bordered
        dataSource={history}
        //by default 'no data' is shown if datasource is empty
        renderItem={(item, index) => (
          <List.Item key={index}>{item}</List.Item>
        )}
        style={{ maxHeight: 200, overflowY: 'auto' }}
      />
    </Card>
  );
}

export default Timer;