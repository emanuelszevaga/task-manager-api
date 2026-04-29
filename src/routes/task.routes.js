const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth.middleware')
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controller')

// Todas las rutas requieren token
router.use(verifyToken)

router.get('/', getTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router