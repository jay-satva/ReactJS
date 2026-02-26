import { useSelector, useDispatch } from "react-redux"
import {
    Table, Button, Typography, Popconfirm,
    Space, Modal, Form, Input, message
} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import {
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../redux/slices/employeesSlice"

const { Title } = Typography

function useHasPermission(action) {
    const { permissions } = useSelector((state) => state.auth)
    return permissions.some((p) => p.action === action)
}

export default function Employee() {
    const dispatch = useDispatch()
    const { employees, loading } = useSelector((state) => state.employees)

    const canAdd    = useHasPermission("ADD_EMPLOYEE")
    const canEdit   = useHasPermission("EDIT_EMPLOYEE")
    const canDelete = useHasPermission("DELETE_EMPLOYEE")

    const [modalOpen, setModalOpen] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState(null)
    const [form] = Form.useForm()

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])

    const handleDelete = async (id) => {
        const result = await dispatch(deleteEmployee(id))
        if (deleteEmployee.fulfilled.match(result)) {
            message.success("Employee deleted")
        } else {
            message.error(result.payload || "Delete failed")
        }
    }

    const openAdd = () => {
        setEditingEmployee(null)
        form.resetFields()
        setModalOpen(true)
    }

    const openEdit = (record) => {
        setEditingEmployee(record)
        form.setFieldsValue({
            name: record.name,
            department: record.department,
            email: record.email,
        })
        setModalOpen(true)
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            let result

            if (editingEmployee) {
                result = await dispatch(updateEmployee({ id: editingEmployee.id, ...values }))
                if (updateEmployee.fulfilled.match(result)) {
                    message.success("Employee updated")
                    setModalOpen(false)
                } else {
                    message.error(result.payload || "Update failed")
                }
            } else {
                result = await dispatch(createEmployee(values))
                if (createEmployee.fulfilled.match(result)) {
                    message.success("Employee created")
                    setModalOpen(false)
                } else {
                    message.error(result.payload || "Create failed")
                }
            }
        } catch {
            // form validation errors shown inline
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
            title: "Department",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
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
                    {canDelete && (
                        <Popconfirm
                            title="Delete employee"
                            description="Are you sure you want to delete this employee?"
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
                <Title level={3} style={{ margin: 0 }}>Employees</Title>
                {canAdd && (
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                        Add Employee
                    </Button>
                )}
            </div>

            <Table
                dataSource={employees}
                columns={columns}
                rowKey="id"
                bordered
                loading={loading}
                pagination={{ pageSize: 8 }}
            />

            <Modal
                title={editingEmployee ? "Edit Employee" : "Add Employee"}
                open={modalOpen}
                onOk={handleSubmit}
                onCancel={() => setModalOpen(false)}
                okText={editingEmployee ? "Update" : "Create"}
                destroyOnHidden
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: "Please enter employee name" }]}
                    >
                        <Input placeholder="e.g. Alice Johnson" />
                    </Form.Item>

                    <Form.Item
                        name="department"
                        label="Department"
                        rules={[{ required: true, message: "Please enter department" }]}
                    >
                        <Input placeholder="e.g. Engineering" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Please enter email" },
                            { type: "email", message: "Enter a valid email" },
                        ]}
                    >
                        <Input placeholder="alice@company.com" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}