const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const colors=require("colors"); 
const port=3400;

//MONGODB URL
const DB_URL="mongodb+srv://soumyajitghosh:someghosh01@clusterbloggy.vfxvsud.mongodb.net/BLOGAPP?retryWrites=true&w=majority";
//REST object
const app=express();

//routes import
const userRoutes=require('./routes/userRoutes')
const blogRoutes=require('./routes/blogRoutes')

//DBmodel import
const { default: mongoose } = require("mongoose");
//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/user',userRoutes)  
app.use('/api/v1/blog',blogRoutes)        

//MONGO CONNECT
mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>console.log('DB connected'))
.catch((error)=>console.log(error))


app.listen(port,()=>{
    console.log(`app running on localhost ${port}`)
})