const express = require('express')


class Server {
    constructor() {
        require('./db/database.config')
        this.port = 3000
        this.app = express()
        this.routes()
    }


    routes = () => {
        this.app.use(require('./routes/index.routes'))
    }


    init = () => {
        this.app.listen(this.port, () => {
            console.log(``)
            console.log(`=========================================================`)
            console.log(`Server running at http://localhost:${this.port}`)
            console.log(`=========================================================`)
            console.log(``)
        })
    }
}


const server = new Server()
server.init()