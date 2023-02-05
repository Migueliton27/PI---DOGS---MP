import React from 'react'
import Card from './Card.jsx';
// import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {GET_DOGS} from "../redux/actions"
// import stylesCard from '../css/Card.module.css'
import stylesCards from '../css/Cards.module.css'
import Pagination from './Pagination'

const CARDS_PER_PAGE = 8 

function Cards(props) {
   

    const dispatch = useDispatch()
    const dogs = useSelector((state)=> state.allDogs)
    useEffect(()=>{
         dispatch(GET_DOGS())
        //setDogs([...dogsSelect])
    },[])
 
    
    //const  [dogs, setDogs] = useState(dogsSelect)
    
    const [pagIndex, setPagIndex] = useState(0)
    const [numPag, setNumPag] = useState(1)


   

    console.log('CARDS ---> dogs',dogs)
   


    // useEffect(()=>{
    //     dispatch(GET_DOGS())      
    //     setDogs(dogsSelect)
    // },[])

    
  

    const nextHandler = (e)=>{
        if((pagIndex + CARDS_PER_PAGE) <= dogs.length ){
            setPagIndex(pagIndex + CARDS_PER_PAGE)
            setNumPag(numPag+1)
        }
        
    }

    const prevHandler = (e)=>{
        if(pagIndex !== 0){
            setPagIndex(pagIndex - CARDS_PER_PAGE)
            setNumPag(numPag-1)
        }
        
    }

    // let numHandler = (e)=>{
    //     const num = e.target.value
    //     const index = CARDS_PER_PAGE*(num-1)
    //     setPagIndex(index)
        
    //     if(this.indexButton>=4){
    //         console.log('que putas', this.indexButton)
    //     }
        
    // }
   
    //console.log(dogs)
    return(
        <>
            <div className={stylesCards.box}>
                {
                    dogs.length?
                    dogs.slice(pagIndex, pagIndex + CARDS_PER_PAGE).map((dog,index)=>{
                        return (
                            // <div key={index} className={stylesCard.Card}>
                            
                               <Card 
                                  key={index}
                                  id={dog.id}
                                  name={dog.name}
                                  weight={dog.weight}
                                  height={dog.height}
                                  life_span={dog.life_span}
                                  image={dog.image}
                                //   onClose={props.onClose}
                               />
                            
                         )
                    })
                    : null
                }
                
            </div>
            <Pagination 
                numPag={numPag}
                setNumPag={setNumPag}
                nextHandler={nextHandler} 
                prevHandler={prevHandler}
                numDogs={dogs.length} 
                setPagIndex={setPagIndex}
            />
            
        </>
    )
}

export default Cards;