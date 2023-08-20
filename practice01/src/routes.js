import { Router } from './router.js'
import { Database } from './database.js'

const database = new Database()

await database.migrate('createTable', {name: 'tasks'})

export const router = new Router()

router.add('/tasks', 'GET', (req, res) => {
    const filters = req.query.search ? {title: req.query.search, description: req.query.search} : {}
    return res.end(JSON.stringify(database.select('tasks', filters)))
})

router.add('/tasks', 'POST', (req, res) => {
    return res.writeHead(201).end(JSON.stringify(database.insert('tasks', {
        ...req.body, completed_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    })))
})

router.add('/tasks/:id', 'PUT', (req, res) => {
    return res.writeHead(200).end(JSON.stringify((database.update('tasks', req.params.id, {
        ...req.body, completed_at: null, updated_at: new Date().toISOString()
    }))))
})

router.add('/tasks/:id/complete', 'PATCH', (req, res) => {
    return res.writeHead(200).end(JSON.stringify((database.update('tasks', req.params.id, {
        completed_at: new Date().toISOString(), updated_at: new Date().toISOString()
    }))))
})

router.add('/tasks/:id', 'DELETE', (req, res) => {
    database.delete('tasks', req.params.id)
    return res.writeHead(204).end()
})