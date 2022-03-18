const express = require('express')
const app = express()


const pool = require('./config/database')


app.get('/products', async (req, res) => {
    try {
        const connection = await pool.getConnection()
        const query = 'SELECT * FROM products'
        const rows = await connection.query(query)
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
    }
})


app.listen(3000, () => {
    console.log('Server on port: ', 3000)
})