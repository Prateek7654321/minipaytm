const express=require("express");
const router=express.Router();
const userRouter=require("./user");
const accountrouter=require("./account");
router.use("/user",userRouter);
router.use("/account",accountrouter);
module.exports=router

