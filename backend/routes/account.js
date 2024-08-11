// backend/routes/account.js
const express = require('express');
const authMiddleware  = require('./middlewares');
const { Account}  = require('../db');
const mongoose = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    console.log(req.userid);
    const account = await Account.findOne({
        userid: req.userid
    });
    console.log(account);
    res.json({
        balance: account.balance
    })
});

 router.post("/transfer",authMiddleware ,async(req,res)=> {
    

        console.log("yes");
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    let senderid=req.userid;
    console.log(senderid);
    
    const account = await Account.findOne({ userid: senderid}).session(session);
    console.log(account);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        console.log("Insufficient balance");
        return;
    }

    const toAccount = await Account.findOne({ userid: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        console.log("Invalid account")
        return;
    }

    // Perform the transfer
    await Account.updateOne({ userid: req.userid }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userid: to }, { $inc: { balance: amount } }).session(session);
  res.json({msg:"done"});

    // Commit the transaction
    await session.commitTransaction();
    console.log("done")
})

// transfer({
//     userid: "669fde96ae4a5173a415df59",
//     body: {
//         amount: 100,
//         to: "669fe2982a04943b9538d69b"
      
//     }
// })
module.exports = router;