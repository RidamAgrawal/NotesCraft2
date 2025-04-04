const express=require('express');
const app=express();
const path=require('path');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
require('dotenv').config();

const dbCon=require('./dbCon/dbCon');
dbCon();
 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine','ejs');


const userRoutes=require('./routes/userRoutes');
const notesRoutes=require('./routes/notesRoutes.js');

const userModel=require('./models/user.js');
const notesModel=require('./models/notes.js');

app.use('/users',userRoutes);
app.use('/notes',notesRoutes);

app.get("/",async (req,res)=>{
    let token=req.cookies?.token;
    if(token){
        let decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded){res.render('home',{name:decoded.name,id:decoded.id});}
        else{res.render('home',{name:undefined,id:undefined});}
    }
    else{
        res.render('home',{name:undefined,id:undefined});
    }
});

app.get('/showNotes',async (req,res)=>{
    let Userid=req.query;
    res.render('notes',{Userid});
});

app.listen('3000',()=>{console.log('server listening');});