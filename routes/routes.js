const Router = require("express").Router();

const citiesControllers=require("../controllers/citiesControllers")

const {getAllCities,getOneCity,deleteCity,addCity,addMultiplesCities, modifyCity, deleteManyCities} = citiesControllers

Router.route("/cities")
.get(getAllCities)
// .post(addCity)
.post((req,res)=>{Array.isArray(req.body.data) ? addMultiplesCities(req,res):addCity(req,res)})
.delete(deleteManyCities)

Router.route("/cities/:id")
.get(getOneCity)
.delete(deleteCity)
.put(modifyCity)

module.exports=Router