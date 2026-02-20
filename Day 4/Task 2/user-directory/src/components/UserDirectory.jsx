import {useSelector, useDispatch} from 'react-redux';
import {deleteUser} from '../features/user/userSlice'
import {Table, Button, Popconfirm, Typography} from 'antd';

const {Title} = Typography

function UserDirectory(){
    const dispatch = useDispatch()
    const users = useSelector((state)=>state.user.users)
    const columns = [
    {
      title: "Name", dataIndex: 'name', key: "name",
    },
    {
      title: "Email", dataIndex: 'email', key: "email",
    },
    {
      title: "Role", dataIndex: 'role', key: "role",
    },
    {
      title: "Contact", dataIndex: 'contact', key: "contact",
    },
    {
      title: "Action", key: "action",
      render: (_, record) => (
        <Popconfirm title="Delete User" description="Are you sure?" onConfirm={() => dispatch(deleteUser(record.id))} okText="Yes" cancelText="No">
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ width: "900px", margin: "40px auto" }}>
      <Title level={3}>User Directory</Title>
      <Table dataSource={users} columns={columns} rowKey="id" bordered pagination={{ pageSize: 5 }}/>
    </div>
    //the columns is used to display 'what fields to show from each row'
  )
}

export default UserDirectory