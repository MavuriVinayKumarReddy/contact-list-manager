require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors =require("cors");

const app =express();
const PORT=process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>console.log("MongoDB connected")).catch(err=>console.log("MongoDB not connected",err));

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts",contactRoutes);

app.get("/",(req,res)=>{
    res.send("Hello from developer");
})

app.listen(PORT,()=>{
    console.log(`server running at http:localhost:${PORT}`);
})