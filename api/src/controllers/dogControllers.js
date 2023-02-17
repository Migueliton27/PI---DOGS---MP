const { Race, Temper } = require('../db.js');
const axios = require('axios')
const { Op } = require('sequelize')

const getAllDogs = async()=>{
    let races = await getByBD()
    // let races = await Race.findAll({
    //     include: [{
    //         model: Temper,
    //         through: {attributes: []}
    //     }]
    // })
    
    let apiDogs = await getByApi()
    // let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
    // apiDogs = apiDogs.data


    // const mapDogs = apiDogs.map((el) => {

    //     return {
    //         id: el.id,
    //         name: el.name,
    //         weight: el.weight.metric,
    //         height: el.height.metric,
    //         life_span: el.life_span,
    //         tempers: el.temperament,
    //         image: el.image.url
    //     }
    // })
    
    
    if(!apiDogs && !races) throw new Error('PAILA')
    
    //races.length>0 ? return [...mapDogs,...races] :  return mapDogs
    return [...apiDogs,...races]
};


const getByApi =  async() =>{
    let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
    apiDogs = apiDogs.data


    const mapDogs = apiDogs.map((el) => {

        return {
            id: el.id,
            name: el.name,
            weight: el.weight.metric,
            height: el.height.metric,
            life_span: el.life_span,
            tempers: el.temperament,
            image: el.image.url
        }
    })

    return mapDogs
}

const getByBD = async() => {
    let races = await Race.findAll({
        include: [{
            model: Temper,
            through: {attributes: []}
        }]
    })
    
    return races
}

const postDog = async (dog)=>{
    const { name, tempers, height, weight, life_span, image } = dog
    const dogExistent = await Race.findAll({
        where: {
            name
        }
    })

    if (dogExistent.length === 0) {
        const race = {
            //id,
            name,
            height,
            weight,
            life_span,
            image
        }

        const d = await Race.create(race)
        tempers ?
            tempers.split(',').forEach(async (temper) => {
                const temperDB = await Temper.findAll({
                    where: {
                        name: temper
                    }
                })
                await d.addTemper(temperDB)
            }) : null
        return race
    }else{
        console.log('Ese perro ya existe')
        throw new Error('Ese perro ya existe')
    }
};



const searchById = async (id)=>{
    try
    {
        const UUID_REGEX =  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
        let raceId;
        if(UUID_REGEX.test(id)){
            raceId = await Race.findByPk(id,{
                include: [{
                    model: Temper,
                    through: {attributes: []}
                }]
            })
            console.log('DESDE DOG',raceId)
        }else{
            const d = await getAllDogs()
            raceId = await (await getAllDogs()).find((dog)=> dog.id === Number(id))
            
        }
        return raceId;
    }catch{
        throw new Error(`No existe perro con el id:${id}`)
    }


};

const searchByName = async (name)=>{
        const apiDogs = await getByApi()
        const apiDogs_filter = apiDogs.filter((dog)=> dog.name.toLowerCase().includes(name.toLowerCase()) )
        
        
        const raceFil = await Race.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        
        if(apiDogs_filter.length===0 && raceFil.length===0) throw new Error(`La busqueda de raza por el nombre fallo, ${name} no existe `)


        return [...apiDogs_filter, ...raceFil]
    
}

module.exports = {getAllDogs, searchById, postDog, searchByName, getByApi,getByBD }

        //Search By Name
        /* else if (name) {
            const raceFil = await Race.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })

            return res.status(200).send(raceFil)
        }*/


    