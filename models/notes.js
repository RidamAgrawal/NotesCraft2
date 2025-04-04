const mongoose=require('mongoose');
const {ObjectId}=require('mongodb');

const notesSchema=mongoose.Schema({
    title:String,
    description:String,
    Userid:ObjectId,
});

const notes=mongoose.model('notes',notesSchema,'notes');

module.exports=notes;