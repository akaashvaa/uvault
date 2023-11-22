import express from 'express'
import { config } from 'dotenv'
import middlewares from './middlewares.js'
import { clerkClient } from '@clerk/clerk-sdk-node'

config()

const app = express()
const port = process.env.PORT || 3001

//middleware
middlewares(app)

app.get('/', async (req, res) => {
  const users = await clerkClient.users.getUserList()

  // // Now you have access to the user's information

  console.log(users[0].username)
  res.send('Hello Client, this is server!')
})

app.post('/api', async (req, res) => {
  const { userId } = req.body

  try {
    const user = await clerkClient.users.getUser(userId)

    if (!user || user.id !== userId) {
      res.status(401).send('Unauthorized')
      return
    }

    res.status(200).send('User verified')
  } catch (error) {
    console.error(error)
    res.status(500).send('Failed to verify user')
  }
})

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`)
})
