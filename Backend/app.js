// Dependencies
const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()



// Routes
const userRoute = require('./routes/userRoute')
const problemRoute = require('./routes/problemRoute')
const recoveryRoute = require('./routes/recoveryRoute')
const taskRoute = require('./routes/taskRoutes')
const patientRoute = require('./routes/patientRoute')

// Port
const PORT = process.env.PORT || 5000


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()) 



const corsOption ={
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsOption))



// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


// Database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Database connection successful")
}).catch((err) => {
    console.log(err)
})


app.use('/api/v1/auth',userRoute)
app.use('/api/v1/problem', problemRoute)
app.use('/api/v1/recovery', recoveryRoute)
app.use('/api/v1/tasks', taskRoute)
app.use('/api/v1/patient', patientRoute)





// Server
app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`)
})