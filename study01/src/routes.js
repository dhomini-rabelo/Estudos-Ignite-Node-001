import { Router } from './router.js'
import { Database } from './database.js'

const database = new Database()

await database.migrate('createTable', {name: 'users'})

export const router = new Router()

router.add('/users', 'GET', (req, res) => {
    return res.end(JSON.stringify(database.select('users')))
})

router.add('/users', 'POST', (req, res) => {
    return res.writeHead(201).end(JSON.stringify(database.insert('users', req.body)))
})

router.add('/users/:id', 'DELETE', (req, res) => {
    database.delete('users', req.params.id)
    return res.writeHead(204).end()
})