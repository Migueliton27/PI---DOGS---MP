const { Router } = require('express');
const { Op } = require('sequelize')
const axios = require('axios')
const { Race, Temper } = require('../db.js');
const Dog = require('../models/Dog.js');
const {searchById,getAllDogs,searchByName,postDog,getByApi,getByBD} = require('../controllers/dogControllers')


//const { Op, Character, Role } = require('../db');
const router = Router();


router.get('/', async (req, res) => {
    const { name,origin  } = req.query
    try {

        if (!name) {

            if(origin && origin==='api') return res.status(200).send(await getByApi())
           // origin && origin==='api'? res.status(200).send(await getByApi()):null
            if(origin && origin==='BD')return res.status(200).send(await getByBD())
            const dogs = await getAllDogs();
            //races.length>0 ? res.status(200).send([...mapDogs,...races]) :  res.status(200).send(mapDogs)
            res.status(200).send(dogs)

        } else if (name) {
            const filterDogs = await searchByName(name)

            return res.status(200).send(filterDogs)
        }


    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})

router.get('/:id' , async (req, res) => {
    const { id } = req.params
   
    try {
        const raceId = await searchById(id)    
        
        return res.status(200).send(raceId)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})


const checkTemper = async(req,res, next)=>{
    const {tempers} = req.body
    //console.log(tempers,'GONORREA')
    tempers?
    tempers.split(',').forEach(async (temper)=>{
        const temperDB = await Temper.findAll({
            where: {
                name: temper
            }
        })
        
        if(temperDB.length == 0){
            await Temper.create({name:temper})
        }
    }):null

    next();
}

router.post('/' ,async (req, res) => {//INTENTEMOS USAR MIDDLEWARE DESPUES
    // const { name, tempers, height, weight, life_span, image } = req.body
    try {
            
        const race = await postDog(req.body)
        return res.status(200).send(race)
        
    } catch (error) {
        return res.status(400).send({error: error.message} )
    }
})




module.exports = router

/*
[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
[ ] POST /dogs:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos relacionada con sus temperamentos
*/




