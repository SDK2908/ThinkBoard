import dotenv from "dotenv"
dotenv.config();
import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
const app = express();
//middleware - runs btw request and response - an authentication cross check
app.use(express.json()) 
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(rateLimiter)
app.use("/api/notes", notesRoutes);
connectDB().then( ()=>{
    app.listen(5001,() => {
    console.log("Server started on PORT: 5001");

});
})


