import React from 'react'
import Card from './Card.jsx';
// import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDogs, setPages,resetErrorDogs} from "../redux/actions"
// import stylesCard from '../css/Card.module.css'
import stylesCards from '../css/Cards.module.css'
import Alert from './Alert.jsx';
import Pagination from './Pagination'

const CARDS_PER_PAGE = 8 

function Cards(props) {
   

    const dispatch = useDispatch()
    const dogs = useSelector((state)=> state.allDogs)
    const page = useSelector((state)=> state.pag)
    const errorDog = useSelector((state)=>state.errorDog)
    console.log('este es',Object.keys(errorDog)!==0)
    useEffect(()=>{
        if(errorDog!==""){
            console.log(errorDog)
            alert(errorDog.error)
            dispatch(resetErrorDogs())
            

        }

    },[errorDog])
    
    useEffect(()=>{
         dispatch(getDogs())
        dispatch(setPages(0))
        dispatch(setPages(1))
    },[])

    useEffect(()=>{
        console.log("LOAS")
    },[dispatch])

    
 
    
    
    
  

    const nextHandler = (e)=>{
        if(page<Math.ceil(dogs.length/CARDS_PER_PAGE)){
            dispatch(setPages(page+1))
        }
        
        
        
    }

    const prevHandler = (e)=>{
        if(page !== 1){
            dispatch(setPages(page-1))
        }
        
        
        
    }

    

    console.log('estos son dogs',dogs)
    return(
        <>
            {/* {Object.keys(errorDog)!==0?<Alert message={errorDog.error}></Alert>:null} */}
            <section className={stylesCards.section}>
            </section>

            <div className={stylesCards.box}>
                {
                    dogs.length>0?
                    dogs.slice(CARDS_PER_PAGE*(page-1), page*CARDS_PER_PAGE).map((dog,index)=>{
                        return (
                            
                               <Card 
                                  key={index}
                                  id={dog.id}
                                  name={dog.name}
                                  weight={dog.weight}
                                  height={dog.height}
                                  life_span={dog.life_span}
                                  image={dog.image}
                               />
                            
                         )
                    })
                    : null
                }
                
            </div>
            <Pagination 
                numPag={page}
                nextHandler={nextHandler} 
                prevHandler={prevHandler}
                numDogs={dogs.length} 
            />
            
        </>
    )
}

export default Cards;

//dogs.slice(pagIndex, pagIndex + CARDS_PER_PAGE).map((dog,index)=>{