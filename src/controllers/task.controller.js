const { pool } = require('../config/db')

// Obtener todas las tareas del usuario
const getTasks = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.id]
        )
        res.json(result.rows)
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' })
            }
}

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
            [req.params.id, req.user.id]
        )

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' })
    }

    res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Crear tarea
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body

        if (!title) {
            return res.status(400).json({ error: 'El título es requerido' })
        }

        const result = await pool.query(
            'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [req.user.id, title, description]
        )

    res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Editar tarea
const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body

        const validStatuses = ['pending', 'in_progress', 'done']
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Status inválido' })
        }

    const result = await pool.query(
        `UPDATE tasks 
        SET title = COALESCE($1, title),
        description = COALESCE($2, description),
        status = COALESCE($3, status)
        WHERE id = $4 AND user_id = $5
        RETURNING *`,
        [title, description, status, req.params.id, req.user.id]
    )

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' })
    }

    res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Eliminar tarea
const deleteTask = async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
            [req.params.id, req.user.id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' })
        }

        res.json({ message: 'Tarea eliminada correctamente' })
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' })
    }
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask }