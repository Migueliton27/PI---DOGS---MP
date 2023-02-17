import React from 'react'
// import Card from './Card.jsx';
// import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setPages } from '../redux/actions'
// import stylesCard from '../css/Card.module.css'
import stylesCards from '../css/Cards.module.css'
// import { connect } from 'react-redux';
// import {ADD,DELETE} from '../redux/actions.js'

const CARDS_PER_PAGE = 8 
//{setPagIndex,numPag,setNumPag,...props}
export default function Pagination({setPagIndex,numPag,...props}) {
    const [indexButton,setIndexButton] = useState(0)
    const [active,setActive] = useState(false)
    const buttonPage = []
    const dispatch = useDispatch()
    const totalButton = Math.ceil(props.numDogs/CARDS_PER_PAGE)
    
    

    for(let i = 0;i<  totalButton; i++){
        buttonPage.push(i + 1)
    }

    useEffect(()=>{
        validateSetIndex(numPag)
    },[numPag])

    useEffect(()=>{
        setIndexButton(0)
    },[dispatch])
    
    const numHandler = (e)=>{
        const num = e.target.value
        const index = CARDS_PER_PAGE*(num-1)
        setActive(true)

        // setPagIndex(index)
        //sconsole.log(num)
        
        // setNumPag(Number(num))
        dispatch(setPages(Number(num)))
        validateSetIndex(num)

        
        
        
    }

    const validateSetIndex = (num)=>{
        if(num >= (indexButton + 4) && Number(num) !== totalButton){
            setIndexButton(indexButton + 1)
        }
        
        
        if(Number(num) === indexButton + 1  && Number(num) !== 1){
            setIndexButton(indexButton - 1)
        }

         if(Number(num===1)) setIndexButton(0)

        
    }

    return(
        <div className= {stylesCards.boxButton}>
                {/* <button>Estamos pag {numPag}</button> */}
                <button className={stylesCards.next} onClick={props.prevHandler}>{'<'}</button>
                
                   { buttonPage.slice(indexButton,indexButton + 4).map((button, index)=>{
                        return (
                            <button
                                key={index}
                                onClick={numHandler}
                                value={button}
                                className={`${stylesCards.buttonPag} ${numPag == button?stylesCards.active:null}`}>
                                    {button}
                            </button>
                        )
                    })}
                
                <button className={stylesCards.prev} onClick={props.nextHandler}>{'>'}</button>

            </div>
    )
}


