import { GET_CHAR, GET_DOGS, GET_TEMPERAMENTS, FILTER_SEARCH, ORDER, SET_PAGE, FILTER_TEMPERAMENTS,
    FILTER_WEIGHT,POST_DOG,ERROR_DOGS,GET_BY_API_BD} from './action-types';

const initialState = {
    pag: 1,
    allDogs:[],
    temperaments:[],
    charById: {},
    originalDogs:[],
    errorDog:"",
    resPost: {}
}

const reducer = (state = initialState, actions) => {
    switch(actions.type){
        case GET_DOGS:
            var result = [...state.allDogs]
            result = [...result, ...actions.payload]
            //console.log('REDUCER',result)
            return {
                ...state,
                allDogs: actions.payload,
                originalDogs: actions.payload
            }

        case GET_CHAR:
            //console.log('REDUCER',result)
            return {
                ...state,
                charById: actions.payload,
            }
        
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: actions.payload,
            }

        case FILTER_SEARCH:
            const name = actions.payload
            return{
                ...state,
                //allDogs: state.allDogs.filter((dog)=> dog.name.includes(name) )
                allDogs: actions.payload
            }
        
        case SET_PAGE:    
            const newNum = actions.payload
            return{
                ...state,
                pag: newNum
            }
        case ORDER:
            console.log(actions.payload)
            //const orderArray = 
            //orderArray.forEach((a)=>console.log(a.name))
            return {
                ...state,
                allDogs: state.allDogs.sort((a,b)=>{
                    if(actions.payload === "ASC") { 
                        return a.name.toLowerCase()>b.name.toLowerCase() ? 1:-1
                    }
                    else if(actions.payload === "DESC"){
                        return a.name.toLowerCase()>b.name.toLowerCase() ? -1:1
                    }
                }),
            }

        case FILTER_TEMPERAMENTS:
            const temperFilter = actions.payload
            // console.log('DESDE REDUCER TEMPERFILTER', temperFilter)


            //const filterTemper = state.originalDogs.filter((dog)=>{
            const filterTemper = state.allDogs.filter((dog)=>{
                const {tempers} = dog
                if(tempers){
                    if(typeof(tempers) === 'string'){
                        return tempers.includes(temperFilter)
                    }else if( Array.isArray(tempers)){
                        console.log('En efceto entro')
                        let flag = false
                        tempers.forEach((t)=> {
                            
                            
                            if(t.name===temperFilter){
                                flag = true
                            }
                        })
                        return flag? dog: null
                    }
                    
                }
                
            })
            
            return {
                ...state,
                allDogs: filterTemper,
            }
        
        case FILTER_WEIGHT: 
            const filterByWeight = state.allDogs.sort((a,b)=>{
                const promA = a.weight.split('-').reduce((acc,next)=> {
                    return Number(acc) + Number(next)
                    
                },0)/ a.weight.split('-').length
                const promB = b.weight.split('-').reduce((acc,next)=> {
                    return Number(acc) + Number(next)
                    
                },0)/ b.weight.split('-').length
                if(actions.payload === "ASC") { 
                    if(promA > promB) return 1
                    if(promA < promB) return -1
                    return 0
                }
                else if(actions.payload === "DESC"){
                    if(promA > promB) return -1
                    if(promA < promB) return 1
                    return 0
                }
                
            })
            return{
                ...state,
                allDogs:filterByWeight
            }
        case POST_DOG:
            return{
                ...state,
                resPost: actions.payload
            }
        
        case GET_BY_API_BD:
            return{
                ...state,
                allDogs: actions.payload
            }
        
        case ERROR_DOGS:
            return{
                ...state,
                errorDog:actions.payload
            }
        

        default:
            return {...state}
    }
};


export default reducer;