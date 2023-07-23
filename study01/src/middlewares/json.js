export async function useJSONMiddleware(req, res) {
    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = {}
    }

    res.setHeader('Content-Type', 'application/json')
}