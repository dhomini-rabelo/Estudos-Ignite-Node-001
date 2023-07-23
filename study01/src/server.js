import http from 'node:http'

export const users = []


async function getJSONBody(req) {
    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    try {
        return JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        return {}
    }
}


const server = http.createServer(async (req, res) => {

    if (req.method === 'GET' && req.url === '/users') {
        return res.setHeader('Content-Type', 'application/json').end(JSON.stringify(users))
    }

    if (req.method === 'POST' && req.url === '/users') {
        const body = await getJSONBody(req)
        const newUser = {
            id: users.length + 1,
            username: body.username,
        }
        users.push(newUser)
        return res.setHeader('Content-Type', 'application/json').writeHead(201).end(JSON.stringify(newUser))
    }
    
    return res.writeHead(404).end()
})

server.listen(3333)