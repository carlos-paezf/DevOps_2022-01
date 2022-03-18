const mariadb = require('mariadb')


const pool = mariadb.createPool({
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: 'password',
    database: 'docker_node_database'
})


const getConnection = async () => {
    try {
        return connection = await pool.getConnection()
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getConnection }