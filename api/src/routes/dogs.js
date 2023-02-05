const { Router } = require('express');
const {Op} = require('sequelize')
const axios = require('axios')
const {Race, Temper} = require('../db.js');
const Dog = require('../models/Dog.js');
//const { Op, Character, Role } = require('../db');
const router = Router();


router.get('/', async(req,res)=>{
    const {name} = req.query 
    try {
        
        // let races = await Race.findAll()
        
        //     if(races.length===0) {
        //         let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
        //         apiDogs = apiDogs.data
        //         const mapDogs = apiDogs.map((el)=>{
        //             return{
        //                 id: el.id,
        //                 name:el.name,
        //                 weight:el.weight.metric,
        //                 height: el.height.metric,
        //                 life_span: el.life_span
        //             }
        //         })
        //         races = await Race.bulkCreate(mapDogs) 
        //         return res.status(200).send(races)
        //         //return res.status(200).send(apiDogs)
        //     }
        
      if(!name){
        let races = await Race.findAll()
        if(races.length===0) {
            let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
            apiDogs = apiDogs.data


            const mapDogs = apiDogs.map((el)=>{
                            
                            return{
                                // id: el.id,
                                name:el.name,
                                weight:el.weight.metric,
                                height: el.height.metric,
                                life_span: el.life_span,
                                image:el.image.url
                            }
                        })

            
            
            races = await Race.bulkCreate(mapDogs) 
            
            //console.log(apiDogs)
            //return res.status(200).send(apiDogs)
        }
        return res.status(200).send(races)
      } else if(name) {
        const raceFil = await Race.findAll({
            where: {
                name:{
                    [Op.iLike] : `%${name}%`
                }
            }
        })

        return res.status(200).send(raceFil)
      }
      

    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})

router.get('/:idRaza', async(req,res)=>{
    const{idRaza} = req.params
    try {
        const raceId = await Race.findByPk(idRaza)
        return res.status(200).send(raceId)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})


router.post('/',async(req,res)=>{
    const {id,name,tempers,height,weight,life_span,image} = req.body
    try {
        const dogExistent = await Race.findAll({
            whre: {
                name
            }
        })
        console.log(dogExistent)
        if(dogExistent.length === 0){
            const race= {
                id,
                name,
                height,
                weight,
                life_span,
                 
            }
             
            const d = await Race.create(race)
            tempers?
            tempers.split(',').forEach(async(temper)=>{
                const temperDB = await Temper.findAll({
                    where: {
                        name : temper
                    }
                })
                //Por el momento es sin verficiar si existe el temperamento
                await d.addTemper(temperDB)
            }):null
            return res.status(200).send(race)
        }
        else{
            return res.status(400).send({ErrorMessage: 'Race exists'})
        }
        
        
        
    } catch (error) {
          return res.status(400).send({error:error.message})
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