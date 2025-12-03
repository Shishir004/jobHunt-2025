const express=require('express')
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv')
dotenv.config({});
const cors=require('cors');
const app=express();
app.set('trust proxy', 1);
const db=require('./utils/db');
const userRoutes=require('./routes/user.routes')
const companyRoutes=require('./routes/comapny.routes')
const jobRoute=require('./routes/job.routes');
const applicationRoute=require('./routes/application.route')
const PORT=process.env.PORT || 3000;

const corsOptions={
    origin:['http://localhost:5173',"https://jobhunt-2025-1.onrender.com"],
    credentials:true
}
app.use(cors(corsOptions));

app.use(express.json()); // using it instead of BodyParser.json()
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('helloeeeee');
})
app.use('/api/user',userRoutes);
app.use('/api/company',companyRoutes);
app.use('/api/job',jobRoute)
app.use('/api/application',applicationRoute)

app.listen(PORT,()=>{
    console.log("App is listening on Port",PORT);
})