// Import required modules and libraries
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import authRoutes from './routes/v1/authRoutes';
import propertyRoutes from './routes/v1/propertyRoutes';
import { swaggerUi, specs } from './swagger'
import authenticateAPIKey from './middlewares/authenticateApiKey';
import loggerMiddleware from './middlewares/loggerMiddleware'
import helmet from 'helmet';
import connectToMongoDB from './config/database'
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

Sentry.init({
    dsn: "https://5c67c34101eeed0a761efdf1aeb87300@o4506441767649280.ingest.sentry.io/4506441770598400",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
        new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
})

const PORT = process.env.port || 3001;
const MONGODB_URI: string = process.env.MONGO_URL!;

//setup the logger on dev environment 
if (process.env.NODE_ENV === 'development') {
    app.use(loggerMiddleware)
}

// Middleware setup
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(helmet()) //enhance security headers
app.use(bodyParser.json()) //Parse JSON bodies in requests
app.use(cookieParser())  //Parse cookies in request
app.use(authenticateAPIKey)

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(Sentry.Handlers.errorHandler());

// API routes setup
app.use('/api/auth', authRoutes);
app.use('/api/property', propertyRoutes)

// Default route for testin server conncetion.
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'connected' })
})

app.get('/api/secure', (req, res) => {
    return res.json({ message: 'Secure endpoint accessed successfully' })
});

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.listen(PORT, () => {
    connectToMongoDB(MONGODB_URI)
    console.log("Server listening on port 3000")
})

// Export the Express app for testing
export default app;