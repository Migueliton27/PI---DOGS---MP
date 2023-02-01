const { Router } = require('express');
const {Temper} = require('../db')
const axios = require('axios')
//const { Op, Character, Role } = require('../db');

const router = Router();

router.get('/', async(req,res)=>{
    try {
        let temperements = await Temper.findAll()
        if(temperements.length===0) {
            let id = 0;
            let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
            apiDogs = apiDogs.data
            //return res.status(200).send(apiDogs)

            let mapTempers= []
            let tableTempers = []
            apiDogs.forEach((el)=>{
                //const m = el.temperament.split(',')
                //console.log(m)
                //const temperamentDog = el.temperament.split(',')
                el.temperament ? 
                el.temperament.split(',').forEach((temper)=>{
                    if(!mapTempers.includes(temper.trim())){
                        mapTempers.push(temper.trim())
                        tableTempers.push({
                            // id: ++id,
                            name: temper.trim()
                        })
                    }
                }): 
                null  
            })

            //console.log(tableTempers)
            temperements = await Temper.bulkCreate(tableTempers) 
            //console.log('paila')
        }
        return res.status(200).send(temperements)
        
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})

module.exports = router
/*
GET /temperaments:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa
 y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/