// Import required modules and libraries
import express from 'express';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import authRoutes from './routes/v1/authRoutes';
import propertyRoutes from './routes/v1/propertyRoutes';
import { swaggerUi, specs } from './swagger'
import authenticateAPIKey from './middlewares/authenticateApiKey';
import loggerMiddleware from './middlewares/loggerMiddleware'
import helmet from 'helmet';

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

const PORT = process.env.port || 3001;
const MONGODB_URI: string = process.env.MONGO_URL!;

// function to connect to MONGODB
function connectToDB() {
    try {
        mongoose.connect(MONGODB_URI)
        console.log('connected to mongodb');
    } catch (error: any) {
        console.error('Error connecting to MONGODB', error.message)
    }
}

//setup the logger on dev environment 
if (process.env.NODE_ENV === 'development') {
    app.use(loggerMiddleware)
}

// Middleware setup
app.use(helmet()) //enhance security headers
app.use(bodyParser.json()) //Parse JSON bodies in requests
app.use(cookieParser())  //Parse cookies in request
app.use(authenticateAPIKey)

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// API routes setup
app.use('/api/auth', authRoutes);
app.use('/api/property', propertyRoutes)

// Default route for testin server conncetion.
app.get('/', (req, res) => {
    res.status(200).json({ message: 'connected' })
})

app.get('/api/secure', (req, res) => {
    res.json({ message: 'Secure endpoint accessed successfully' })
})

app.listen(PORT, () => {
    connectToDB()
    console.log("Server listening on port 3000")
})

// Export the Express app for testing
export default app;