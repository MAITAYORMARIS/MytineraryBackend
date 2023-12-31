const Cities = require("../models/citiesmodel")

const citiesControllers = {
    getAllCities: async (req, res) => {
        let cities
        let error = null

        try {
            cities = await Cities.find()
        }
        catch (err) {
            error = err
        }

        res.json({
            response: error ? "Error" : { cities },
            success: error ? false : true,
            error: error
        })

    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.find({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "Error" : city,
            success: error ? false : true,
            error: error
        })
    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const dataCity = req.body.data

        let city
        let error = null
        try {
            city = await Cities.findOneAndUpdate({ _id: id }, dataCity, { new: true })
            console.log(city)
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : city,
            success: error ? false : true,
            error: error
        })

    },
    addCity: async (req, res) => {
        const { name, banner, country, language, image, info, phrase, region, galUno, galDos, galTres, climate, nationalCoin, coinIcon, flag } = req.body.data

        let city
        let error = null

        try {
            let cityExist = await Cities.find({ name: { $regex: name, $options: "i" } })
            if (cityExist.length == 0) {
                city = await new Cities({
                    name: name,
                    banner: banner,
                    country: country,
                    language: language,
                    image: image,
                    info: info,
                    phrase: phrase,
                    region: region,
                    galUno: galUno,
                    galDos: galDos,
                    galTres: galTres,
                    climate: climate,
                    nationalCoin: nationalCoin,
                    coinIcon: coinIcon,
                    flag: flag
                }).save()
            } else {
                error = "La ciudad ya existe en BD con el id:" + cityExist[0]._id + "ingreso por ADD ONCE CITY"
            }

        } catch (err) { error = err }
        res.json({
            response: error ? "ERROR" : city,
            success: error ? false : true,
            error: error
        })
    },
    addMultiplesCities: async (req, res) => {
        const cities = []
        let error = []

        for (let city of req.body.data) {
            try {
                let cityExist = await Cities.find({ name: { $regex: city.name, $options: "i" } })
                if (cityExist.length == 0) {

                    let dataCity = {
                        name: city.name,
                        banner: city.banner,
                        country: city.country,
                        language: city.language,
                        image: city.image,
                        info: city.info,
                        phrase: city.phrase,
                        region: city.region,
                        galUno: city.galUno,
                        galDos: city.galDos,
                        galTres: city.galTres,
                        climate: city.climate,
                        nationalCoin: city.nationalCoin,
                        coinIcon: city.coinIcon,
                        flag: city.flag
                    }

                    await new Cities({
                        ...dataCity
                    }).save()
                    cities.push(dataCity)

                } else {
                    error.push({
                        name: city.name,
                        result: "La ciudad" + "ya existe en BD con el id" + cityExist[0]._id
                    })
                }
            }
            catch (err) { error.push(err) }
        }
        res.json({
            response: error.length > 0 && cities.length === 0 ? "ERROR" : cities,
            success: error.length > 0 ? (cities.length > 0 ? "warning" : false) : true,
            error: error
        })
    },

    deleteCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.findOneAndDelete({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "Error" : city ? city : "No se encontro el ID a eliminar",
            success: error ? false : city ? true : false,
            error: error
        })
    },

    deleteManyCities: async (req, res) => {
        const id = req.body.id
        citiesDelete = []
        let error = []

        for (let id of data) {
            try {
                let city
                city = await Cities.findOneAndDelete({ _id: id })
                if (city) {
                    citiesDelete.push(city)
                } else {
                    error.push({
                        id: id,
                        error: "no se encontro el ID de la ciudad a eliminar"
                    })
                }
            } catch (err) { error.push(err) }
        }


        res.json({
            response: error.length > 0 && citiesDelete.length === 0 ? "ERROR" : citiesDelete,
            success: error.length > 0 ? (citiesDelete.length > 0 ? "warning" : false) : true,
            error: error
        })
    }

};
module.exports = citiesControllers;