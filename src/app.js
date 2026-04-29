const express = require('express')
const dotenv = require('dotenv')
const { initDB } = require('./config/db')

dotenv.config()

const app = express()
app.use(express.json())

// Rutas (las vamos a crear en los próximos pasos)
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/tasks', require('./routes/task.routes'))

app.get('/', (req, res) => {
    res.json({ message: '🌱 Task Manager API funcionando' })
})

const PORT = process.env.PORT || 3000

const start = async () => {
    await initDB()
    app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    })
}

start()