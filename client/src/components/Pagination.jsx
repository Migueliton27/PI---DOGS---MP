import React from 'react'
import Card from './Card.jsx';
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import stylesCard from '../css/Card.module.css'
import stylesCards from '../css/Cards.module.css'
import { connect } from 'react-redux';
import {ADD,DELETE} from '../redux/actions.js'

const CARDS_PER_PAGE = 8 

export default function Pagination(props) {

    const buttonPage = []
    const {numDogs} = props
    //console.log('------->', numDogs)
    for(let i = 0; Math.ceil(props.numDogs/CARDS_PER_PAGE) ; i++){
        buttonPage.push(i)
    }

    return(
        <div className= {stylesCards.boxButton}>

                <button onClick={props.prevHandler}>Prev</button>
                {/* {
                    buttonPage.map((button, index)=>{
                        return (
                            <button
                                key={index}>
                                    {button}
                            </button>
                        )
                    })
                } */}
                <button onClick={props.nextHandler}>Next</button>

            </div>
    )
}


