const { timeStamp } = require("console");
const mongoose = require("mongoose");


const ArticleSchema = new mongoose.Schema(

    {
        title:{ type: String, required: true, unique:true},
        desc : { type:String , required:true , unique:true},
        username : {type:String, required:true },
        cat:{type:Array,required:false},
         
    },{timestamps:true}
);

module.exports = mongoose.model("Article",ArticleSchema);