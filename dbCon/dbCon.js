const mongoose=require('mongoose');

async function dbCon(){
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.x2u3j.mongodb.net/notes`);
}

module.exports=dbCon;