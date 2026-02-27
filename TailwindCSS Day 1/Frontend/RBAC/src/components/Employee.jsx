import { useSelector, useDispatch } from "react-redux"

import { useEffect, useState } from "react"
import {
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../redux/slices/employeesSlice"


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
    const [formData, setFormData] = useState({
        name: "", department: "", email: ""
    })

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])

    // const handleDelete = async (id) => {
    //     const result = await dispatch(deleteEmployee(id))
    //     if (deleteEmployee.fulfilled.match(result)) {
    //         message.success("Employee deleted")
    //     } else {
    //         message.error(result.payload || "Delete failed")
    //     }
    // }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        )
        if (!confirmDelete) return

        const result = await dispatch(deleteEmployee(id))

        if (deleteEmployee.fulfilled.match(result)) {
            alert("Employee deleted")
        } else {
            alert(result.payload || "Delete failed")
        }
    }
    const openAdd = () => {
        setEditingEmployee(null)
        setFormData({name: "", department: "", email: ""})
        setModalOpen(true)
    }

    const openEdit = (record) => {
        setEditingEmployee(record)
        setFormData({
            name: record.name,
            department: record.department,
            email: record.email
        })
        setModalOpen(true)
    }

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.department || !formData.email) {
            alert("All fields are required")
            return
        }

            let result

            if (editingEmployee) {
                result = await dispatch(updateEmployee({ id: editingEmployee.id, ...values }))
                if (updateEmployee.fulfilled.match(result)) {
                    alert("Employee updated")
                    setModalOpen(false)
                } else {
                    alert(result.payload || "Failed")
                }
            } else {
                result = await dispatch(createEmployee(formData))
                if (createEmployee.fulfilled.match(result)) {
                    alert("Employee created")
                    setModalOpen(false)
                } else {
                    alert(result.payload || "Create failed")
                }
            }
        } catch {
            // form validation errors shown inline
        }
    }


    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}> */}
            <div className="flex justify-between items-center mb-4">
                {/* <Title level={3} style={{ margin: 0 }}>Employees</Title> */}
                <div className="text-3xl font-bold text-gray m-0">Employees</div>
                {canAdd && (
                    // <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                    //     Add Employee
                    // </Button>
                    <button className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg" onClick={openAdd}>Add Employee</button>
                )}
            </div>

            {/* <Table
                dataSource={employees}
                columns={columns}
                rowKey="id"
                bordered
                loading={loading}
                pagination={{ pageSize: 8 }}
            /> */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Department</th>
                            <th className="p-2">Email</th>
                            {(canEdit || canDelete) && (
                                <th className="p-2">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp=>(
                            <tr key={emp.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{emp.name}</td>
                                <td className="px-6 py-4">{emp.department}</td>
                                <td className="px-6 py-4">{emp.email}</td>
                                <td className="px-6 py-4">{canEdit && (
                                    <button
                                    onClick={() => openEdit(emp)}
                                    className="cursor-pointer text-white rounded-lg bg-blue-600 px-5 py-2 text-sm me-2">
                                        Edit
                                    </button>
                                    )}
                                    {canDelete && (
                                    <button
                                        onClick={() => handleDelete(emp.id)}
                                        className="cursor-pointer text-white rounded-lg bg-red-600 px-5 py-2 text-sm"
                                    >
                                        Delete
                                    </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            

            {/* <Modal
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
            </Modal> */}

            {
                modalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">
                                {editingEmployee ? "Edit Employee" : "Add Employee"}
                            </h2>
                            <div className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    value={formData.department}
                                    onChange={(e) =>
                                        setFormData({ ...formData, department: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                        </div>
                            <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 text-sm bg-gray-200 rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                                >
                                {editingEmployee ? "Update" : "Create"}
                            </button>
                        </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}