const express = require('express')
const apiRoutes = require('./public/routes/apiRoutes')
const htmlRoutes = require('./public/routes/htmlRouter')
const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

app.listen(PORT, () => console.log(`Active listening PORT: ${PORT}`))