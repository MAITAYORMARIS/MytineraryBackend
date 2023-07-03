const express = require("express");
const cors= require("cors");

require("dotenv").config();
require("./config/database");

const app = express();


const Routes=require("./routes/routes")

const PORT = process.env.PORT || 5000;
app.use(cors())
app.set("port",PORT);
app.use(express.json())
app.use("/api",Routes)

app.listen(PORT, ()=>{
    console.log("EL SERVIDOR ESTA ACTIVO EN PUERTO:" + app.get("port"))
})
