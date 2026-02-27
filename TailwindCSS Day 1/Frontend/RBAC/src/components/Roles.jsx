import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Table, Checkbox, Button, Typography, Tag, Spin, Tooltip } from "antd"
import { SaveOutlined, LockOutlined } from "@ant-design/icons"
import { fetchRoles, updateRolePermissions } from "../redux/slices/rolesSlice"

const { Title, Text } = Typography

const PERMISSION_MODULES = [
    { module: "USER", permissions: [
        { id: 1,  label: "View" },
        { id: 2,  label: "Add" },
        { id: 3,  label: "Edit" },
        { id: 4,  label: "Delete" },
    ]},
    { module: "EMPLOYEE", permissions: [
        { id: 5,  label: "View" },
        { id: 6,  label: "Add" },
        { id: 7,  label: "Edit" },
        { id: 8,  label: "Delete" },
    ]},
    { module: "PROJECT", permissions: [
        { id: 9,  label: "View" },
        { id: 10, label: "Add" },
        { id: 11, label: "Edit" },
        { id: 12, label: "Delete" },
    ]},
    { module: "ROLE", permissions: [
        { id: 13, label: "View" },
        { id: 14, label: "Edit" },
    ]},
]

const VIEW_PERMISSION = { USER: 1, EMPLOYEE: 5, PROJECT: 9, ROLE: 13 }

function userHasPermission(action) {
    const { permissions } = useSelector((state) => state.auth)
    return permissions.some((p) => p.action === action)
}

export default function Roles() {
    const dispatch = useDispatch()
    const { roles, loading, saving } = useSelector((state) => state.roles)
    const canEdit = userHasPermission("EDIT_ROLE")
    const { user } = useSelector((state) => state.auth)
    const myRoleId = user?.roleId

    const [draft, setDraft] = useState({})
    const [dirty, setDirty] = useState({})
    const [statusMsg, setStatusMsg] = useState(null)

    useEffect(() => { dispatch(fetchRoles()) }, [dispatch])
    useEffect(() => {
        if (roles.length > 0) {
            const initial = {}
            roles.forEach(role => {
                initial[role.id] = new Set(role.permissions || [])
            })
            setDraft(initial)
            setDirty({})
        }
    }, [roles])

    const toggle = (roleId, permId, module) => {
        if (!canEdit) return

        const viewId = VIEW_PERMISSION[module]
        const modulePermIds = PERMISSION_MODULES
            .find(m => m.module === module)?.permissions.map(p => p.id) || []

        setDraft(prev => {
            const current = new Set(prev[roleId] || [])

            if (current.has(permId)) {
                if (permId === viewId) {
                    modulePermIds.forEach(id => current.delete(id))
                } else {
                    current.delete(permId)
                }
            } else {
                current.add(permId)
                if (permId !== viewId) current.add(viewId)
            }

            return { ...prev, [roleId]: current }
        })

        setDirty(prev => ({ ...prev, [roleId]: true }))
    }

    const save = async (roleId) => {
        try {
            const permsSet = draft[roleId]
            const permissions = permsSet ? Array.from(permsSet) : []
            const result = await dispatch(updateRolePermissions({ roleId, permissions }))
            if (updateRolePermissions.fulfilled.match(result)) {
                setStatusMsg({ type: "success", text: "Permissions saved!" })
                setDirty(prev => ({ ...prev, [roleId]: false }))
            } else {
                setStatusMsg({ type: "error", text: String(result.payload || "Save failed") })
            }
        } catch (err) {
            setStatusMsg({ type: "error", text: err.message })
        }
        setTimeout(() => setStatusMsg(null), 3000)
    }

    const rows = PERMISSION_MODULES.map(({ module, permissions }) => ({
        key: module, module, permissions,
    }))

    const roleColumns = roles.map(role => {
        const isOwnRole = role.id === myRoleId
        const columnCanEdit = canEdit && !isOwnRole

        return {
            title: (
                <div style={{ textAlign: "center" }}>
                    <Tag style={{ marginBottom: 4 }}>
                        {role.name.toUpperCase()}
                    </Tag>
                    {canEdit && isOwnRole && (
                        <div>
                            <Tag color="warning" style={{ fontSize: 10 }}>
                                <LockOutlined /> Your Role
                            </Tag>
                        </div>
                    )}
                    {columnCanEdit && dirty[role.id] && (
                        <div style={{ marginTop: 4 }}>
                            <Button
                                type="primary" size="small" icon={<SaveOutlined />}
                                loading={saving}
                                onClick={() => save(role.id)}
                                style={{ fontSize: 11 }}
                            >
                                Save
                            </Button>
                        </div>
                    )}
                </div>
            ),
            key: `role_${role.id}`,
            width: 140,
            align: "center",
            render: (_, row) => {
                const rolePerms = draft[role.id] || new Set()
                const viewId = VIEW_PERMISSION[row.module]

                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                        {row.permissions.map(perm => {
                            const checked = rolePerms.has(perm.id)
                            const isView = perm.id === viewId
                            const hasOtherPerms = !isView && [...rolePerms].some(id =>
                                row.permissions.some(p => p.id === id && p.id !== viewId)
                            )
                            const viewForced = isView && hasOtherPerms
                            const tooltipText = isOwnRole
                                ? "You cannot edit your own role's permissions"
                                : viewForced
                                    ? "View is required when other permissions are active"
                                    : !canEdit
                                        ? "You don't have permission to edit"
                                        : ""

                            return (
                                <Tooltip key={perm.id} title={tooltipText}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <Checkbox
                                            checked={checked}
                                            disabled={!columnCanEdit || viewForced}
                                            onChange={() => toggle(role.id, perm.id, row.module)}
                                        />
                                        <Text style={{ fontSize: 12, color: checked ? "inherit" : "#bbb" }}>
                                            {perm.label}
                                        </Text>
                                    </div>
                                </Tooltip>
                            )
                        })}
                    </div>
                )
            }
        }
    })

    const columns = [
        {
            title: "Module", dataIndex: "module", key: "module", width: 120,
            render: (mod) => <Tag style={{ fontWeight: 600, fontSize: 13 }}>{mod}</Tag>
        },
        ...roleColumns,
    ]

    if (loading) return <div style={{ textAlign: "center", padding: 60 }}><Spin size="large" /></div>

    return (
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Title level={3} style={{ margin: 0 }}>Roles & Permissions</Title>
                {!canEdit && <Tag icon={<LockOutlined />} color="warning">View Only</Tag>}
            </div>

            {statusMsg && (
                <div style={{
                    padding: "8px 16px", marginBottom: 12, borderRadius: 6,
                    background: statusMsg.type === "success" ? "#f6ffed" : "#fff2f0",
                    border: `1px solid ${statusMsg.type === "success" ? "#b7eb8f" : "#ffccc7"}`,
                    color: statusMsg.type === "success" ? "#389e0d" : "#cf1322"
                }}>
                    {statusMsg.text}
                </div>
            )}

            <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
                {canEdit
                    ? "Manage permissions per role. You cannot edit your own role to prevent accidental lockout."
                    : "View only — you don't have edit permission."}
            </Text>

            <Table
                dataSource={rows} columns={columns}
                pagination={false} bordered rowKey="key" size="middle"
            />
        </div>
    )
}