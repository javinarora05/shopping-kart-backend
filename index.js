const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
require("dotenv").config();
const customerRoutes = require("./routes/customer.routes")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/customers" , customerRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch(() => {
        console.log("try again lil bro!!")
    });


app.get("/" , (req , res) => {
    res.json({
        message: "Shopkart backend is very tuff",
    });
});

const PORT  = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log(`Server is grinding hard on port ${PORT}`);
})