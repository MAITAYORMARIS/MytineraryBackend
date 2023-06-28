const express = require("express");

require("dotenv").config();
require("./config/database");

const app = express();


const Routes=require("./routes/routes")

const PORT = process.env.PORT || 5000;

app.set("port",PORT);
app.use(express.json())
app.use("/api",Routes)


app.listen(PORT, ()=>{
    console.log("EL SERVIDOR ESTA ACTIVO EN PUERTO:" + app.get("port"))
})