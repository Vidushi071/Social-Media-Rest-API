const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")



dotenv.config()

// Mongodb Connection  
mongoose.connect(process.env.MONGO_URL, {
    // useUnifiedTopology: true,

})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});


// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/post",postRoutes)

app.listen(8800,()=>{
    console.log("Server is Running at port number 8800")
})