import express from 'express'
import connectDB from './db';
import { errorHandler, notFound } from './middleware/errorMiddleware'
import userRoutes from './routes/userRoutes'

connectDB()

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)



app.use(notFound)
app.use(errorHandler)

const PORT = 5000

app.listen(PORT, () => console.log(`Server running on port${PORT}`))