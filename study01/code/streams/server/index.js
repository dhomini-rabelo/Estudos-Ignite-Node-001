import { Readable, Writable, Transform } from 'node:stream'



class InvertNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const invertedNumber = parseInt(chunk.toString()) * -1
        console.log({invertedNumber})
        callback(null, Buffer.from(String(invertedNumber)))
    }

}


import http from 'node:http'


const server = http.createServer(async (req, res) => {
    if (req.url === '/complete') {
        const buffers = []
        for await (const chunk of req) {
            buffers.push(chunk)
        }
        return res.end(Buffer.concat(buffers).toString())
    }
    return req.pipe(new InvertNumberStream()).pipe(res)
})

server.listen(3334)

