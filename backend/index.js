const express = require("express");
const app=express();
const mainRouter=require("./routes/index");
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);// whatever request comes to apiv1 it will send to mainrouter which will handle all requests
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


