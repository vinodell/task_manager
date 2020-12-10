import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import { nanoid } from 'nanoid'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

const taskExample = {
  taskId: '',
  title: '',
  _isDeleted: false,
  _createdAt: 0,
  _deletedAt: 0,
  status: 'new'
}

const toWriteFile = (fileData, category) => {
  writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(fileData), { encoding: 'utf8' })
}

const toReadFile = (category) => {
  return readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf8' }).then((file) =>
    JSON.parse(file)
  )
}

const removeUnderscope = (tasks) => {
  return tasks
    .filter((it) => !it._isDeleted)
    .map((obj) => {
      return Object.keys(obj).reduce((acc, rec) => {
        if (rec[0] !== '_') {
          return { ...acc, [rec]: obj[rec] }
        }
        return acc
      }, {})
    })
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const { title } = req.body
  const newTask = {
    ...taskExample,
    taskId: nanoid(),
    title,
    _createdAt: +new Date()
  }
  const taskList = await toReadFile(category)
    .then((file) => {
      const list = [...file, newTask]
      toWriteFile(list, category)
      return list
    })
    .catch(async () => {
      await toWriteFile([newTask], category)
      return [newTask]
    })
  res.json(taskList)
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params
  const period = {
    day: 86400000,
    week: 604800000,
    month: 2592000000
  }
  const keys = Object.keys(period)
  const index = keys.indexOf(timespan)
  if (index < 0) {
    res.status(404)
    res.end()
  }
  const data = await toReadFile(category)
    .then((file) => {
      return file.filter((task) => {
        return task._createdAt - period[timespan] > +new Date()
      })
    })
    .then((file) => removeUnderscope(file))
    .catch(() => {
      res.status(404)
      res.end()
    })
  res.json(data)
})

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const filterTask = await toReadFile(category)
    .then((file) => removeUnderscope(file))
    .catch(() => {
      res.status(404)
      res.end()
    })
  res.json(filterTask)
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const newList = await toReadFile(category)
    .then((file) =>
      file.map((task) => {
        return task.taskId !== id ? task : { ...task, _isDeleted: true, _deletedAt: +new Date() }
      })
    )
    .catch(() => {
      res.status(404)
      res.end()
    })
  toWriteFile(newList, category)
  res.json(newList)
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const { status } = req.body
  const arrayStatus = ['done', 'new', 'in progress', 'blocked']
  const check = arrayStatus.includes(status)
  if (!check) {
    res.status(501)
    res.json({ status: 'error', message: 'incorrect status' })
    res.end()
  }
  const data = await toReadFile(category)
    .then((file) => {
      return file.map((task) => {
        return task.taskId === id ? { ...task, status } : task
      })
    })
    .catch(() => {
      res.status(404)
      res.end()
    })
  toWriteFile(data, category)
  res.json(data)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
