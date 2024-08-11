const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://prateekdev:prateek%4004@cluster0.87jjzl1.mongodb.net/paytm");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    lastName:{
        type:String,
        required:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:30
    }
});
 const User=mongoose.model("user",userSchema);
const accountschema=mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User},
    balance:{
        type: Number,
        required: true
    }

})

 const Account=mongoose.model("accounts",accountschema);
 module.exports={
    User,Account
 }
