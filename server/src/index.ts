import express from 'express'
import expressWs from 'express-ws'

const expressApp = express()
const port = 8000

const {app} = expressWs(expressApp);

app.ws('/', (ws, req) => {
  console.log('подключение установлено');
})

app.listen(port, () => console.log('Server has been started'));