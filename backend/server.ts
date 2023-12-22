import express from 'express';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import authRoutes from './routes/v1/authRoutes';
import propertyRoutes from './routes/v1/propertyRoutes';

dotenv.config();

const app = express();

const PORT = process.env.port || 3001;
const MONGODB_URI: string = process.env.MONGO_URL!;

function connectToDB() {
    try {
        mongoose.connect(MONGODB_URI)
        console.log('connected to mongodb');
    } catch (error: any) {
        console.error('Error connecting to MONGODB', error.message)
    }
}

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes);
app.use('/api/property', propertyRoutes)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'connected' })
})

app.listen(PORT, () => {
    connectToDB()
    console.log("Server listening on port 3000")
})

export default app;