import { useSelector, useDispatch } from "react-redux"
import {
    Table, Button, Typography, Popconfirm,
    Space, Modal, Form, Input, Select, Tag, message
} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import {
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
} from "../redux/slices/projectsSlice"

const { Title } = Typography

const STATUS_COLORS = {
    active:   "green",
    pending:  "orange",
    complete: "blue",
}

function useHasPermission(action) {
    const { permissions } = useSelector((state) => state.auth)
    return permissions.some((p) => p.action === action)
}
export default function Projects() {
    const dispatch = useDispatch()
    const { projects, loading } = useSelector((state) => state.projects)

    const canAdd    = useHasPermission("ADD_PROJECT")
    const canEdit   = useHasPermission("EDIT_PROJECT")
    const canDelete = useHasPermission("DELETE_PROJECT")

    const [modalOpen, setModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState(null)
    const [form] = Form.useForm()

    useEffect(() => {
        dispatch(fetchProjects())
    }, [dispatch])

    const handleDelete = async (id) => {
        const result = await dispatch(deleteProject(id))
        if (deleteProject.fulfilled.match(result)) {
            message.success("Project deleted")
        } else {
            message.error(result.payload || "Delete failed")
        }
    }

    const openAdd = () => {
        setEditingProject(null)
        form.resetFields()
        setModalOpen(true)
    }

    const openEdit = (record) => {
        setEditingProject(record)
        form.setFieldsValue({
            name: record.name,
            status: record.status,
            description: record.description,
        })
        setModalOpen(true)
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            let result
            if (editingProject) {
                result = await dispatch(updateProject({ id: editingProject.id, ...values }))
                if (updateProject.fulfilled.match(result)) {
                    message.success("Project updated")
                    setModalOpen(false)
                } else {
                    message.error(result.payload || "Update failed")
                }
            } else {
                result = await dispatch(createProject(values))
                if (createProject.fulfilled.match(result)) {
                    message.success("Project created")
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
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={STATUS_COLORS[status] || "default"}>
                    {status?.toUpperCase() || "—"}
                </Tag>
            ),
            filters: [
                { text: "Active",   value: "active" },
                { text: "Pending",  value: "pending" },
                { text: "Complete", value: "complete" },
            ],
            onFilter: (value, record) => record.status === value,
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
                            title="Delete project"
                            description="Are you sure you want to delete this project?"
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
                <Title level={3} style={{ margin: 0 }}>Projects</Title>
                {canAdd && (
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                        Add Project
                    </Button>
                )}
            </div>

            <Table
                dataSource={projects}
                columns={columns}
                rowKey="id"
                bordered
                loading={loading}
                pagination={{ pageSize: 8 }}
            />

            <Modal
                title={editingProject ? "Edit Project" : "Add Project"}
                open={modalOpen}
                onOk={handleSubmit}
                onCancel={() => setModalOpen(false)}
                okText={editingProject ? "Update" : "Create"}
                destroyOnHidden
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item
                        name="name"
                        label="Project Name"
                        rules={[{ required: true, message: "Please enter project name" }]}
                    >
                        <Input placeholder="e.g. Project Alpha" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea rows={3} placeholder="Brief description..." />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select a status" }]}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="complete">Complete</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}