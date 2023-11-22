import express from 'express'
import cors from 'cors'

export default function (app) {
  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))

  // Add other middleware here
  app.use(cors())
}
