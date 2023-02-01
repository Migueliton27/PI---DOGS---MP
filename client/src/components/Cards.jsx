import React from 'react'
import Card from './Card.jsx';
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import stylesCard from '../css/Card.module.css'
import stylesCards from '../css/Cards.module.css'
import { connect } from 'react-redux';
import Pagination from './Pagination'
import {ADD,DELETE} from '../redux/actions.js'

const CARDS_PER_PAGE = 8 

function Cards(props) {
    const [dogs, setDogs] = useState([])
    const [pagIndex, setPagIndex] = useState(0)
    const [numPag, setNumPag] = useState(1)

    useEffect(()=>{
        fetch(`http://localhost:3001/dogs`)
        .then((response) => response.json())
        .then(data =>{
            console.log(data)
            setDogs([...data])
        }).catch((err)=> console.log(err))
    },[])

    const nextHandler = (e)=>{
        if((pagIndex + CARDS_PER_PAGE) <= dogs.length ){
            setPagIndex(pagIndex + CARDS_PER_PAGE)
            setNumPag(numPag++)
        }
        
    }

    const prevHandler = (e)=>{
        if(pagIndex !== 0){
            setPagIndex(pagIndex - CARDS_PER_PAGE)
            setNumPag(numPag--)
        }
        
    }

    console.log(dogs)
    return(
        <>
            <div className={stylesCards.box}>
                {
                    dogs?
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
                nextHandler={nextHandler} 
                prevHandler={prevHandler}
                numDogs={dogs.length}
            />
            
        </>
    )
}

export default Cards;