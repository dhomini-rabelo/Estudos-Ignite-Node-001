export class Router {
    #routes = []

    add(path, method, handler) {
        this.#routes.push({
            path, method, handler,
        })
    }

    getHandler(path, method) {
        const route = this.#routes.find(route => route.path === path && route.method === method)
        return route ? route.handler : null
    }
}