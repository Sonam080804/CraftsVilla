import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

//configure env
dotenv.config(); // adding environment variable (port) in env file .


//databse config (Connecting Database)
connectDB(); 

//rest object

/*
Creating Instance (Object) of expess class to enable use of REST API Methods 

1. Get -> fetch data (providing url , and a callback which take 2 things (req , res) , It manipulate response and send it to front-end using Send method )
2. Post ->
3. Put ->
4. Delete ->
5. Listen -> It is used to listen on some specific port after starting server .

..etc 

*/ 

const app = express(); 


//middelwares

/*
  CORS -> used to enable cross-origin-resource-sharing 
  -> By default browser block cross-origin request.
  -> Make backend server accessible to frontend or any other domain.
*/ 

app.use(cors());
// Parse (json payload of request) of request and attach it to req.body
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);


//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to CraftsVilla</h1>");
  });


//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
  });