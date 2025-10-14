import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/user.routes.js';
import employerRouter from './src/routes/employer.routes.js';
import jobRouter from './src/routes/job.routes.js';
import communityPostRouter from './src/routes/communityPost.routes.js'
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser()); //should be before the routes

//for parsing json data
app.use(express.json({
    limit: "16kb"
}))

//for parsing form data
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use("/api/users", userRouter);
app.use("/api/employers", employerRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/community-posts", communityPostRouter);

app.use(express.static('public'));

export default app;