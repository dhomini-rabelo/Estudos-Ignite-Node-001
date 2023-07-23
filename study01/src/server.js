import http from 'node:http'
import {Database} from './database.js'
import {useJSONMiddleware} from './middlewares/json.js'


const database = new Database()

await database.migrate('createTable', {name: 'users'})


const server = http.createServer(async (req, res) => {
    await useJSONMiddleware(req, res)

    if (req.method === 'GET' && req.url === '/users') {
        return res.end(JSON.stringify(database.select('users')))
    }

    if (req.method === 'POST' && req.url === '/users') {       
        return res.writeHead(201).end(JSON.stringify(database.insert('users', req.body)))
    }
    
    return res.writeHead(404).end()
})

server.listen(3333)