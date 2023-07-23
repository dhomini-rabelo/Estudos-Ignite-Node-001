import http from 'node:http'

import {useJSONMiddleware} from './middlewares/json.js'

export const users = []


const server = http.createServer(async (req, res) => {
    await useJSONMiddleware(req, res)

    if (req.method === 'GET' && req.url === '/users') {
        return res.end(JSON.stringify(users))
    }

    if (req.method === 'POST' && req.url === '/users') {
        const newUser = {
            id: users.length + 1,
            username: req.body.username,
        }
        users.push(newUser)
        return res.writeHead(201).end(JSON.stringify(newUser))
    }
    
    return res.writeHead(404).end()
})

server.listen(3333)