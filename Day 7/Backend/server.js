const jsonServer = require('json-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const SECRET_KEY = "supersecretkey"

server.use(middlewares)
server.use(jsonServer.bodyParser)

//================================================================auth================================
server.use((req, res, next) => {
    if (req.path === '/login') return next()

    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" })
    }
})

//===================================================login===========================================
server.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    //this needs to change
    const db = router.db
    const user = db.get('users').find({ name: username }).value()
    console.log(user)

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
        { id: user.id, roleId: user.roleID }, SECRET_KEY, { expiresIn: '1h' }
    )

    res.json({
        token, user: { id: user.id, name: user.name, roleId: user.roleID }
    })
})

//=======================================================permission=====================================
server.use((req, res, next) => {
  if (req.path === "/login") return next()
  if ((req.path.startsWith("/roles") || req.path.startsWith("/permissions")) && req.method === "GET") return next()
  const db = router.db

  const role = db.get("roles").find({ id: req.user.roleId }).value()
  if (!role) {
    return res.status(403).json({ message: "Role not found" })
  }

  const rolePermissionIds = role.permissions || []

  // we will extract resource from path
  const pathParts = req.path.split("/")
  const resource = pathParts[1]
  if (!resource) return next()

  // then convert plural to singular
  const resourceSingular = resource.endsWith("s") ? resource.slice(0, -1) : resource
  const resourceUpper = resourceSingular.toUpperCase()

  let actionPrefix = ""

  switch (req.method) {
    case "GET":
      actionPrefix = "GET"
      break
    case "POST":
      actionPrefix = "ADD"
      break
    case "PUT":
    case "PATCH":
      actionPrefix = "EDIT"
      break
    case "DELETE":
      actionPrefix = "DELETE"
      break
    default:
      return next()
  }

  const requiredPermission = `${actionPrefix}_${resourceUpper}`

  const permissions = db
    .get("permissions")
    .filter((p) => rolePermissionIds.includes(p.id))
    .value()

  const hasPermission = permissions.some(
    (p) => p.action === requiredPermission,
  )

  if (!hasPermission) {
    return res.status(403).json({
      message: `Access denied: ${requiredPermission}`,
    })
  }

  next()
})

//===================================================user crus ==========================================

server.get('/users', (req, res) => {
    const db = router.db
    const users = db.get('users').value()
    const safeUsers = users.map(u => ({ id: u.id, name: u.name, email: u.email, roleID: u.roleID }))
    res.json(safeUsers)
})

// create
server.post('/users', (req, res) => {
    const { name, email, password, roleID } = req.body
    if (!name || !email || !password || !roleID) return res.status(400).json({ message: "All fields are required" })
    const db = router.db
    const existingUser = db.get('users').find({ email }).value()
    if (existingUser) return res.status(400).json({ message: "Email already exists" })

    const hashedPassword = bcrypt.hashSync(password, 12)
    const newUser = { id: Date.now(), name, email, password: hashedPassword, roleID }
    db.get('users').push(newUser).write()
    res.status(201).json({ id: newUser.id, name, email, roleID })
})

// update
server.put('/users/:id', (req, res) => {
    const { id } = req.params
    const { name, email, password, roleID } = req.body

    const db = router.db
    const user = db.get('users').find({ id: parseInt(id) }).value()
    if (!user) return res.status(404).json({ message: "User not found" })

    const updatedData = { name, email, roleID }
    if (password) updatedData.password = bcrypt.hashSync(password, 12)

    db.get('users').find({ id: parseInt(id) }).assign(updatedData).write()
    res.json({ id: parseInt(id), name, email, roleID })
})

// delete
server.delete('/users/:id', (req, res) => {
    const { id } = req.params
    const db = router.db
    const user = db.get('users').find({ id: parseInt(id) }).value()
    if (!user) return res.status(404).json({ message: "User not found" })

    db.get('users').remove({ id: parseInt(id) }).write()
    res.json({ message: "User deleted successfully" })
})

//=================================================project crud= =====================================
server.get('/projects', (req, res) => {
    const db = router.db
    const projects = db.get('projects').value()
    const safeProject = projects.map(p => ({ id: p.id, name: p.name}))
    res.json(safeProject)
})

// create
server.post('/projects', (req, res) => {
    const { name } = req.body
    if (!name ) return res.status(400).json({ message: "All fields are required" })
    const db = router.db
    const existingProject = db.get('projects').find({ name }).value()
    if (existingProject) return res.status(400).json({ message: "Project already exists" })

    const newProj = { id: Date.now(), name }
    db.get('projects').push(newProj).write()
    res.status(201).json({ id: newProj.id, name})
})

//update
server.put('/projects/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const db = router.db
    const project = db.get('projects').find({ id: parseInt(id) }).value()
    if (!project) return res.status(404).json({ message: "Project not found" })

    const updatedData = { name }

    db.get('projects').find({ id: parseInt(id) }).assign(updatedData).write()
    res.json({ id: parseInt(id), name })
})

// delete
server.delete('/projects/:id', (req, res) => {
    const { id } = req.params
    const db = router.db
    const project = db.get('projects').find({ id: parseInt(id) }).value()
    if (!project) return res.status(404).json({ message: "project not found" })

    db.get('projects').remove({ id: parseInt(id) }).write()
    res.json({ message: "Project deleted successfully" })
})

//=======================================================employee crus========================
server.get('/employees', (req, res) => {
    const db = router.db
    const employees = db.get('employees').value()
    const safeemp = employees.map(p => ({ id: p.id, name: p.name}))
    res.json(safeemp)
})

// create
server.post('/employees', (req, res) => {
    const { name } = req.body
    if (!name ) return res.status(400).json({ message: "All fields are required" })
    const db = router.db
    const existingEmp = db.get('employees').find({ name }).value()
    if (existingEmp) return res.status(400).json({ message: "Employee already exists" })

    const newEmp = { id: Date.now(), name }
    db.get('employees').push(newEmp).write()
    res.status(201).json({ id: newEmp.id, name})
})

//update
server.put('/employees/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const db = router.db
    const employee = db.get('employees').find({ id: parseInt(id) }).value()
    if (!employee) return res.status(404).json({ message: "Employee not found" })

    const updatedData = { name }

    db.get('employees').find({ id: parseInt(id) }).assign(updatedData).write()
    res.json({ id: parseInt(id), name })
})

// delete
server.delete('/employees/:id', (req, res) => {
    const { id } = req.params
    const db = router.db
    const employee = db.get('employees').find({ id: parseInt(id) }).value()
    if (!employee) return res.status(404).json({ message: "Employee not found" })

    db.get('employees').remove({ id: parseInt(id) }).write()
    res.json({ message: "Employee deleted successfully" })
})

//============================================ read & update permission==========================

server.get('/permissions', (req, res) => {
    const db = router.db
    const permissions = db.get('permissions').value()
    res.json(permissions)
})

server.get('/roles', (req, res) => {
    const db = router.db
    const roles = db.get('roles').value()
    // only return the 4 real roles (filter out junk entries)
    const cleanRoles = roles.filter(r => ['Admin','HR','Manager','Supervisor'].includes(r.name))
    res.json(cleanRoles)
})

server.get('/roles/:id', (req, res) => {
    const db = router.db
    const role = db.get('roles').find({ id: parseInt(req.params.id) }).value()
    if (!role) return res.status(404).json({ message: "Role not found" })
    res.json(role)
})

server.patch('/roles/:id', (req, res) => {
    const { permissions } = req.body
    if (!Array.isArray(permissions)) return res.status(400).json({ message: "permissions must be an array" })

    const db = router.db
    const role = db.get('roles').find({ id: parseInt(req.params.id) }).value()
    if (!role) return res.status(404).json({ message: "Role not found" })

    db.get('roles').find({ id: parseInt(req.params.id) }).assign({ permissions }).write()
    res.json({ ...role, permissions })
})


server.use(router)
server.listen(3000, () => {
  console.log("Server running on port 3000")
})