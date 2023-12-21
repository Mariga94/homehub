import express from 'express';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.listen(3000, () => {
    connectToDB()
    console.log("Server listening on port 3000")
})