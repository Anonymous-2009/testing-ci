const express = require('express')

const app = express()
const port = 3030
require('dotenv').config();

app.get('/', (req, res) => {
  const name = process.env.NAMEW
  res.send(`Hello World! hey gitops done where ${name}`)
})

app.get('/gitops', (req, res) => {
  res.send('finally code it and at night impelement this')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// kubectl port-forward service/my-express-app-service  -n testing 2000:80