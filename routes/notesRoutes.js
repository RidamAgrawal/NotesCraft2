const express=require('express');
const router=express.Router();
const {ObjectId}=require('mongodb');
const notesModel=require('../models/notes.js');

router.get('/',async (req,res)=>{
    let notes=await notesModel.find({});
    res.json(notes);
});
router.post('/getNotes',async (req,res)=>{
    let {Userid}=req.body;
    let items=await notesModel.find({Userid: new ObjectId(Userid)});
    console.log(items);
    res.json(items);
});
router.post('/create',async (req,res)=>{
    let {title,description,Userid}=req.body;
    let notes=await notesModel.create({title,description,Userid: new ObjectId(Userid)});
    res.json(notes);
})
router.post('/delete',async (req,res)=>{
    let {id}=req.body;
    let notes=await notesModel.deleteOne({_id:new ObjectId(id)});
    res.json(notes);
})
router.post('/update',async (req,res)=>{
    let {id,title,description}=req.body;
    let notes=await notesModel.updateOne({_id:new ObjectId(id)},{$set:{title,description}});
    res.json(notes);
})
module.exports=router;