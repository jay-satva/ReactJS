import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../features/users/userSlice"
import { Input, List, Card, Spin, Alert, Typography } from "antd";
import { useEffect, useState } from "react"

const { Search } = Input
const { Title } = Typography

function UserSearch() {
  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.user)
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(fetchUser(""))
  }, [])

  const onSearch = (value) => {
    dispatch(fetchUser(value))
  }

  return (
    <div style={{ padding: 30 }}>
      <Title level={3}>User Directory</Title>

      {error && (
        <Alert
          Title="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      <Search
        placeholder="Search users"
        enterButton
        value={search}
        size="large"
        onSearch={onSearch}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 30 }}
      />

      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={users}
          renderItem={(user) => (
            <List.Item>
              <Card title={user.name}>
                <p>Email: {user.email}</p>
                <p>Company: {user.company.name}</p>
                <p>City: {user.address.city}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

export default UserSearch