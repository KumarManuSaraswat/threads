import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/auth.routes.js';

//loading environment variables from .env file
dotenv.config();

const app = express();

//middleware here--
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
//connection with mongodb--
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("✅ MongoDB Connected Successfully"))
    .catch((err)=>console.error("connection failed",err));
//testing the route--
app.get('/',(req,res)=>{
    res.send('Threads is running!')
});

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
})