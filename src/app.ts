import express, { Request, Response } from 'express'

const app = express()

app.use(express.json())

// app.use('/api/user', userRouter)
// app.use('/api/tour', tourRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

export default app