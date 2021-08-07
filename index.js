import express from 'express'
import { port } from './src/config/index.js'
import server from './src/server.js'

const app = express()

server(app)

app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return process.exit(1)
  }
  console.log(`Server is running on ${port}`)
})

export default app
