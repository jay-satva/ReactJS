import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, disable } from '../features/counter/counterSlice';
import { Button, Typography, Badge, Switch, Space, Card ,List } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
const { Title } = Typography;

function Timer(){
    const dispatch = useDispatch()
    const {value, history, disabled} = useSelector(state=>state.counter)
    const [isEnabled, setEnabled] = useState(true)

    return(
        <>  
            <Card style={{width: 400, margin: '50px auto', textAlign: 'center'}}>
                <Title level={3}>Counter</Title>
                <Badge level={2}>{value}</Badge><br /><br />
                <Space style={{ marginBottom: 20 }}>
                <Button disabled={disabled} icon={<PlusOutlined></PlusOutlined>} 
                onClick={() => dispatch(increment())}/>

                <Button disabled={disabled} icon={<MinusOutlined></MinusOutlined>} 
                onClick={() => dispatch(decrement())}/>

                <Button onClick={() => dispatch(reset())}>
                Reset
                </Button>
                <Switch
                    checkedChildren="Locked"
                    unCheckedChildren="Unlocked"
                    checked={disabled}
                    onChange={() => dispatch(disable())}
                    style={{ marginRight: 20 }}
                />
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
            
        </>
    )
}
export default Timer