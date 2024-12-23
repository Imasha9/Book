const mongoose=require("mongoose");


const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//variables
const reviewSchema=new Schema(
    {
       
        BookTitle:{
            type:String,
            required:true
        },
        Author:{
            type:String,
            required:true
        },
        Rating:{
            type: Number,
            required: true,
            min: 1, // Minimum rating value
            max: 5, // Maximum rating value
        },

        ReviewText:{
            type:String,
            required:true
        },

        DateAdded:{
            type:Date,
            default:Date.now,
        },
        
       
    },
   
);

const BookReview=mongoose.model("BookReview",reviewSchema);
module.exports=BookReview;
