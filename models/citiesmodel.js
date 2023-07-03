const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
    name:{type:String, required:true},
    banner:{type:String,required:true},
    country:{type:String,required:true},
   language:{type:String},
    image:{type:String,required:true},
    info:{type:String,required:true},
    phrase:{type:String,required:true},
    region:{type:String,required:true},
    galUno:{type:String},
    galDos:{type:String},
    galTres:{type:String}

})

// nueva constante que usa el modelado mongoose para crear la coleccion cities segun el modelo citiesSchema
const Cities = mongoose.model("cities", citiesSchema)
module.exports = Cities;