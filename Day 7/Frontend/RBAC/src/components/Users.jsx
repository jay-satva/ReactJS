import { useSelector, useDispatch } from "react-redux"
import {
    Table, Button, Typography, Popconfirm,
    Space, Tag, Modal, Form, Input, Select, message
} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { fetchUsers, createUser, updateUser, deleteUser } from "../redux/slices/usersSlice"

const { Title } = Typography

const ROLE_NAMES = {
    1: "Admin",
    2: "HR",
    3: "Manager",
    4: "Supervisor",
}

function useHasPermission(action) {
    const { permissions } = useSelector((state) => state.auth)
    return permissions.some((p) => p.action === action)
}

export default function Users() {
    const dispatch = useDispatch()
    const { users, loading } = useSelector((state) => state.users)

    const canAdd    = useHasPermission("ADD_USER")
    const canEdit   = useHasPermission("EDIT_USER")
    const canDelete = useHasPermission("DELETE_USER")
    const { user: currentUser } = useSelector((state) => state.auth)  

    const [modalOpen, setModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)  
    const [form] = Form.useForm()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const handleDelete = async (id) => {
        const result = await dispatch(deleteUser(id))
        if (deleteUser.fulfilled.match(result)) {
            message.success("User deleted")
        } else {
            message.error(result.payload || "Delete failed")
        }
    }

    const openAdd = () => {
        setEditingUser(null)
        form.resetFields()
        setModalOpen(true)
    }

    const openEdit = (record) => {
        setEditingUser(record)
        form.setFieldsValue({
            name: record.name,
            email: record.email,
            roleID: record.roleID,
            password: "",   
        })
        setModalOpen(true)
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()

            let result
            if (editingUser) {
                if (!values.password) delete values.password
                result = await dispatch(updateUser({ id: editingUser.id, ...values }))
                if (updateUser.fulfilled.match(result)) {
                    message.success("User updated")
                    setModalOpen(false)
                } else {
                    message.error(result.payload || "Update failed")
                }
            } else {
                result = await dispatch(createUser(values))
                if (createUser.fulfilled.match(result)) {
                    message.success("User created")
                    setModalOpen(false)
                } else {
                    message.error(result.payload || "Create failed")
                }
            }
        } catch {
        }
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "roleID",
            key: "roleID",
            render: (roleID) => (
                    ROLE_NAMES[roleID] || "Unknown"
            ),
            filters: Object.entries(ROLE_NAMES).map(([id, name]) => ({
                text: name, value: parseInt(id)
            })),
            onFilter: (value, record) => record.roleID === value,
        },
        ...(canEdit || canDelete ? [{
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    {canEdit && (
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => openEdit(record)}
                        >
                            Edit
                        </Button>
                    )}
                    {canDelete && record.id !== currentUser?.id && (
                        <Popconfirm
                            title="Delete user"
                            description="Are you sure you want to delete this user?"
                            onConfirm={() => handleDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ danger: true }}
                        >
                            <Button danger icon={<DeleteOutlined />} size="small">
                                Delete
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        }] : []),
    ]

    return (
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <Title level={3} style={{ margin: 0 }}>Users</Title>
                {canAdd && (
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                        Add User
                    </Button>
                )}
            </div>

            <Table
                dataSource={users}
                columns={columns}
                rowKey="id"
                bordered
                loading={loading}
                pagination={{ pageSize: 8 }}
            />

            <Modal
                title={editingUser ? "Edit User" : "Add User"}
                open={modalOpen}
                onOk={handleSubmit}
                onCancel={() => setModalOpen(false)}
                okText={editingUser ? "Update" : "Create"}
                destroyOnClose
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item
                        name="name"
                        label="Username"
                        rules={[{ required: true, message: "Please enter a username" }]}
                    >
                        <Input placeholder="e.g. john" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Please enter an email" },
                            { type: "email", message: "Enter a valid email" },
                        ]}
                    >
                        <Input placeholder="john@example.com" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={editingUser ? "New Password (leave blank to keep current)" : "Password"}
                        rules={editingUser ? [] : [{ required: true, message: "Please enter a password" }]}
                    >
                        <Input.Password placeholder={editingUser ? "Leave blank to keep current" : "••••••••"} />
                    </Form.Item>

                    <Form.Item
                        name="roleID"
                        label="Role"
                        rules={[{ required: true, message: "Please select a role" }]}
                    >
                        <Select placeholder="Select a role">
                            {Object.entries(ROLE_NAMES).map(([id, name]) => (
                                <Select.Option key={id} value={parseInt(id)}>
                                    {name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}