const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute =require("./routes/user");
const articleRoute = require("./routes/article");

mongoose.set("strictQuery", false);

dotenv.config();
app.use(express.json());


mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL,)
    .then(() => console.log("DBconnection successful"))
    .catch((err) => {
        console.log(err);
    });


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/article",articleRoute);

app.listen("5000",()=>{
    console.log("runing at port 5000...");
})