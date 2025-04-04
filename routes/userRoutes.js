const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const userModel=require('../models/user.js');

router.get('/',async (req,res)=>{
    let users=await userModel.find({});
    res.json(users);
});
router.post('/login',async (req,res)=>{
    let token=req.cookies?.token;
    if(token){
        try{
            let decoded=jwt.verify(token,process.env.JWT_SECRET);
            if(decoded){return res.json({name:decoded.name,id:decoded.id});return;}
        }catch(err){
            res.clearCookie('token');
            res.json({error:"token expired"});
        }
    }
    let {email,password}=req.body;
    let user=await userModel.findOne({email:email});

    if(!user){res.json({error:"user does not exists"});return;}

    try{
        bcrypt.compare(password,user.password,(err,match)=>{
            if(match){
                let jwtToken=jwt.sign({name:user.name,id:user._id},process.env.JWT_SECRET);
                res.cookie('token',jwtToken, { httpOnly: true });    
                res.json({name:user.name,id:user._id});
            }
            else{
                res.json({error:"either email or password is incorrect"});
            }
        })
    }catch(err){
        res.json({error:"either email or password is incorrect"});
    }
    
})
router.post('/create',async (req,res)=>{
    let {name,email,password}=req.body;

    let duplicateUser=await userModel.findOne({email});
    if(duplicateUser){
        res.json({error:'user already exists',name:undefined,id:undefined});
        return;
    }
    bcrypt.genSalt(10,async (err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            
            let newUser=await userModel.create({
                name,
                email,
                password:hash
            });
            let jwtToken=jwt.sign({name:newUser.name,id:newUser._id},process.env.JWT_SECRET);
            res.cookie('token',jwtToken, { httpOnly: true });
            res.json({name:newUser.name,id:newUser._id});
        })
    });
})
router.get('/logout',async (req,res)=>{
    res.clearCookie('token');
    res.render('home',{name:undefined,id:undefined});
});

module.exports=router;