const initialState = {
    allDogs:[],
    temperaments:[]
}

const reducer = (state = initialState, actions) =>{
    switch(actions.type){
        case 'GET_DOGS':
            var result = [...state.allDogs]
            result = [...result, ...actions.payload]
            //console.log('REDUCER',result)
            return {
                ...state,
                allDogs: actions.payload,
            }
            
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: actions.payload,
            }

        default:
            return {...state}
    }
};


export default reducer;