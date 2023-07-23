import http from 'node:http'

export const users = []

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/users') {
        return res.setHeader('Content-Type', 'application/json').end(JSON.stringify(users))
    }

    if (req.method === 'POST' && req.url === '/users') {
        const newUser = {
            id: users.length + 1,
            username: `user_${users.length + 1}`
        }
        users.push(newUser)
        return res.setHeader('Content-Type', 'application/json').writeHead(201).end(JSON.stringify(newUser))
    }
    
    return res.writeHead(404).end()
})

server.listen(3333)