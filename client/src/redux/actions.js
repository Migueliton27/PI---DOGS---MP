import axios from 'axios'
import { GET_CHAR, GET_DOGS, GET_TEMPERAMENTS, FILTER_SEARCH, ORDER, SET_PAGE, FILTER_TEMPERAMENTS,
  FILTER_WEIGHT, POST_DOG, GET_BY_API_BD,ERROR_DOGS  } from './action-types';

export function getDogs(){
    return async function(dispatch){
        // fetch(`http://localhost:3001/dogs`)
        // .then((response) => response.json())
        // .then(data =>{
        //     //console.log('ACTION_________>',data)
        //     // setDogs([...data])


        //     return dispatch({
        //             type: 'GET_DOGS',
        //             payload: data
        //         })
            
        // }).catch((err)=> console.log(err))
        try {
            let response = await axios.get("http://localhost:3001/dogs");
            return dispatch({
              type: GET_DOGS,
              payload: response.data,
            });
          } catch (error) {
            console.log(error);
          }
    }
}


export function getTemperaments(){
    return async function(dispatch){
        try {
            let response = await axios.get("http://localhost:3001/temperaments");
            return dispatch({
              type: GET_TEMPERAMENTS,
              payload: response.data,
            });
          } catch (error) {
            console.log(error);
          }
    }
}


export function getCharById(id){
  return async function(dispatch){
    try {
        let response = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({
          type: GET_CHAR,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
}
}



export function orderItems(type){
  
  return{
    type: ORDER, 
    payload:type
  }
}

export function setPages(type){
  return{
    type: SET_PAGE,
    payload:type
  }
}

export function filterByTemperament(temperament){
  return{
    type:FILTER_TEMPERAMENTS,
    payload:temperament
  }
}

export function orderByWeight(type){
  return{
    type: FILTER_WEIGHT,
    payload: type
  }
}

export function postNewDog(dog){
  
  return async function(dispatch){
    try {
        let response = await axios.post(`http://localhost:3001/dogs`,dog);
        return dispatch({
          type: POST_DOG,
          payload: {success:response.data},
        });
      } catch (error) {
        // console.log("THIS IS ERROR ", error.response.data);
        return dispatch({
          type: POST_DOG, 
          payload: {error: error.response.data}
        })
      }
}
}

export function setPostDog(){
  return{
    type: POST_DOG,
    payload: ""
  }
}


export function filterSearch(name){
  return (dispatch) => {
    fetch(`http://localhost:3001/dogs?name=${name}`)
      .then((res) => {
        return res.json()
        // res.status !== 400?
        // res.json():
        // res.text().then((error) => {
        //   throw new Error(error);
        // })
      })
      .then((data) => {
        if(data.error) throw new Error(data.error)
        
        return dispatch({ type: FILTER_SEARCH, payload: data });
      })
      .catch((error)=>{
        console.log("THIS IS ERROR ",error  )
        return dispatch({ type: ERROR_DOGS, payload: {error} });
      });
  };
};


export function getByApiBD(origin){
  return (dispatch) => {
    fetch(`http://localhost:3001/dogs?origin=${origin}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('succes',data)
        if(data.length === 0) throw new Error('No se han agregado razas de perros a la base de datos')
        return dispatch({ type: GET_BY_API_BD, payload: data });
      })
      .catch((error)=>{
        console.log("THIS IS ERROR ",error)
        return dispatch({ type: ERROR_DOGS, payload: {error} });
      });
  };
};

export function resetErrorDogs(){
  return{
    type: ERROR_DOGS, 
    payload: '' 
  }
}

