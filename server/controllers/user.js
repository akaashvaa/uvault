import prisma from '../db/db'
import cookieParser from '../utils/parser'

import { Clerk } from '@clerk/clerk-sdk-node'

const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY })

// In your route handler:
app.get('/sdk', async (req, res) => {
  const sessionToken = req.headers['Authorization'].split(' ')[1]
  const session = await clerk.sessions.verifySession(sessionToken)
  const user = await clerk.users.getUser(session.userId)

  // Now you have access to the user's information
  console.log(user.emailAddresses)
  res.send(user.emailAddresses)
})
