const express=require("express");
const app=express();
app.use(express.json());
const router=express.Router();
const zod=require("zod");
const {User}=require("../db");
const json_secret=require("../config");
const authMiddleware=require("./middlewares")
const {Account}=require("../db");
const jwt = require("jsonwebtoken");

const signupbody=zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(3).max(30)
})
router.post("/signup",async (req,res)=>{
  
    const {success}=signupbody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const dbvalidation=await User.findOne({
        username:req.body.username
    });
    if (dbvalidation) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
     const user=await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })
    const userid=user._id
        var jwttoken=jwt.sign({userid},json_secret);
        await Account.create({
            userid:userid,
            balance: Math.floor(Math.random() * 10000)
        })
      return res.json({msg:"User created successfully",
            token:jwttoken});
            
            
   
});
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const signinSchema = zod.object({
        username: zod.string().email(),
        password: zod.string().min(3).max(30)
    });

    const result = signinSchema.safeParse({ username, password });

    if (result.success) {
        const user = await User.findOne({ username:req.body.username });
        if (user) {
            const token = jwt.sign({ userid: user._id }, json_secret);

            return res.json({ token });
        } else {
            return res.status(404).send("User doesn't exist");
        }
    } else {
        return res.status(400).send("Invalid inputs");
    }
});
const updatebody=zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional()
})
router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updatebody.safeParse(req.body)
    if (!success) {
       return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne( req.userid, {$set:req.body})

  return  res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk",async function(req,res){
    const filter=req.query.filter||" ";
    const users=await User.find({
        $or:[{
            firstName:{"$regex":filter}
        },{
            lastName:{"$regex":filter}
        }]})
        res.json({
            Users: users.map( (user)=>
             ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                userid: user._id
            }))
        });
        
}
)
module.exports=router;
