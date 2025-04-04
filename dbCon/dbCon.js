const mongoose=require('mongoose');

async function dbCon(){
    mongoose.connect(process.env.MONGO_URI);
}

module.exports=dbCon;