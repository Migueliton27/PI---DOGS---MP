import React from 'react'
// import Card from './Card.jsx';
// import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
// import stylesCard from '../css/Card.module.css'
import stylesCards from '../css/Cards.module.css'
// import { connect } from 'react-redux';
// import {ADD,DELETE} from '../redux/actions.js'

const CARDS_PER_PAGE = 8 

export default function Pagination({setPagIndex,numPag,setNumPag,...props}) {
    const [indexButton,setIndexButton] = useState(0)
    const buttonPage = []
    const totalButton = Math.ceil(props.numDogs/CARDS_PER_PAGE)
    //const {numDogs} = props
    //console.log('------->', props.numDogs)
    

    for(let i = 0;i<  totalButton; i++){
        buttonPage.push(i + 1)
    }

    useEffect(()=>{
        validateSetIndex(numPag)
    },[numPag])

    const numHandler = (e)=>{
        const num = e.target.value
        const index = CARDS_PER_PAGE*(num-1)
        setPagIndex(index)
        //sconsole.log(num)
        
        setNumPag(Number(num))
        validateSetIndex(num)

        // if(num >= (indexButton + 4) && Number(num) !== totalButton){
        //     setIndexButton(indexButton + 1)
        // }
        
        
        // if(Number(num) === indexButton + 1  && Number(num) !== 1){
        //     setIndexButton(indexButton - 1)
        // }
        
        
    }

    const validateSetIndex = (num)=>{
        if(num >= (indexButton + 4) && Number(num) !== totalButton){
            setIndexButton(indexButton + 1)
        }
        
        
        if(Number(num) === indexButton + 1  && Number(num) !== 1){
            setIndexButton(indexButton - 1)
        }
    }

    return(
        <div className= {stylesCards.boxButton}>
                <button>Estamos pag {numPag}</button>
                <button onClick={props.prevHandler}>Prev</button>
                
                   { buttonPage.slice(indexButton,indexButton + 4).map((button, index)=>{
                        return (
                            <button
                                key={index}
                                onClick={numHandler}
                                value={button}>
                                    {button}
                            </button>
                        )
                    })}
                
                <button onClick={props.nextHandler}>Next</button>

            </div>
    )
}


