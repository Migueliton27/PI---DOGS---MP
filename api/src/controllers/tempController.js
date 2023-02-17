const {Temper} = require('../db')
const axios = require('axios')

const getTemperaments = async () => {
    let temperements = await Temper.findAll()
    if (temperements.length === 0) {
        let id = 0;
        let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
        apiDogs = apiDogs.data

        let mapTempers = []
        let tableTempers = []
        apiDogs.forEach((el) => {
            //const m = el.temperament.split(',')
            //console.log(m)
            //const temperamentDog = el.temperament.split(',')
            el.temperament ?
                el.temperament.split(',').forEach((temper) => {
                    if (!mapTempers.includes(temper.trim())) {
                        mapTempers.push(temper.trim())
                        tableTempers.push({
                            // id: ++id,
                            name: temper.trim()
                        })
                    }
                }) :
                null
        })

        temperements = await Temper.bulkCreate(tableTempers)
    }

    return temperements
}

module.exports = {getTemperaments}