import axios from 'axios'

export function GET_DOGS(){
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
              type: 'GET_DOGS',
              payload: response.data,
            });
          } catch (error) {
            console.log(error);
          }
    }
}


export function GET_TEMPERAMENTS(){
    return async function(dispatch){
        try {
            let response = await axios.get("http://localhost:3001/temperaments");
            return dispatch({
              type: 'GET_TEMPERAMENTS',
              payload: response.data,
            });
          } catch (error) {
            console.log(error);
          }
    }
}