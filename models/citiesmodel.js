const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
    name:{type:String, required:true},
    banner:{type:String,required:true},
    country:{type:String,required:true},
    image:{type:String,required:true},
    info:{type:String,required:true},
    phrase:{type:String,required:true},
    region:{type:String,required:true},
})

// nueva constante que usa el modelado mongoose para crear la coleccion cities segun el modelo citiesSchema
const Cities = mongoose.model("cities", citiesSchema)
module.exports = Cities