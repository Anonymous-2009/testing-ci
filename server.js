const express = require('express')
const app = express()
const port = 3030

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// kubectl port-forward service/my-express-app-service  -n testing 2000:80