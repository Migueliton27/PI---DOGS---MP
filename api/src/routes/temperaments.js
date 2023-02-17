const { Router } = require('express');
const {Temper} = require('../db')
const axios = require('axios')
const {getTemperaments} = require('../controllers/tempController')
//const { Op, Character, Role } = require('../db');

const router = Router();

router.get('/', async(req,res)=>{
    try {
        let temperements = await getTemperaments()

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