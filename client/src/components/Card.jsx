import React from 'react'
import {Link} from 'react-router-dom'
// import {useState,useEffect} from 'react'
// import { connect } from 'react-redux';
// import {ADD,DELETE} from '../redux/actions.js'
import stylesCard from '../css/Card.module.css'

function Card(props) {

    return(
        
            
            <div className={stylesCard.Card}>
                <div className={`${stylesCard.boxFront} ${stylesCard.face} `}>
                    <img  src={props.image} alt="" className={stylesCard.img}/>
                    <h1 className={stylesCard.h1}>{props.name}</h1>
                </div>
                <div className={`${stylesCard.boxBack} ${stylesCard.face} `} >
                    <h2>{props.name}</h2>
                    <h2>{props.height}</h2>
                    <h2>W:{props.weight}</h2>
                    <h2>{props.life_span}</h2>
                    <h1>asd</h1>
                    <Link to={`/detail/${props.id}`}>
                        <h2>View detail</h2>
                    </Link>
                    
                </div>
                
                
            </div>
        
    )
}

export default Card;
