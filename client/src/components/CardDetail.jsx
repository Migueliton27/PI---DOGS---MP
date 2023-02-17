import React, { useState } from 'react';
import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {getCharById} from '../redux/actions'
import stylesDetail from '../css/CardDetail.module.css'
import img from '../img/slice2.svg'

function CardDetail(props) {
    let {id} = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCharById(id))
    },[])
    let tempers = []

    const race = useSelector( state => state.charById)
    if(typeof(race.tempers) === 'string' && tempers){
       tempers = race.tempers.split(',')
    }else if(Array.isArray(race.tempers)){
        tempers = race.tempers.map((t)=> t.name)
    }
    console.log('CARD DETAIL: ',race)


    return (
        <div className={stylesDetail.container}>
            {/* <h2>Card detail</h2> */}
            <div className={stylesDetail.boxImg}>
                <img src={race.image}/>
                <div className={stylesDetail.curve}>
                {/* <svg className={stylesDetail.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff80" fillOpacity="1" d="M0,64L24,96C48,128,96,192,144,186.7C192,181,240,107,288,101.3C336,96,384,160,432,170.7C480,181,528,139,576,128C624,117,672,139,720,165.3C768,192,816,224,864,213.3C912,203,960,149,1008,106.7C1056,64,1104,32,1152,53.3C1200,75,1248,149,1296,154.7C1344,160,1392,96,1416,64L1440,32L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg> */}
                    <img src={img}/>
                </div>
            </div>
            <div className={stylesDetail.boxInfo}>
                <h1>{race.name}</h1>
                <h4>Temperaments</h4>
                <div className={stylesDetail.boxTempers}>
                    
                    {
                        tempers?
                        tempers.map((t,index)=>{
                            return(
                                <div key={index}>
                                    {t}
                                </div>
                            )
                        }):null
                    }
                </div>
                <div className={stylesDetail.attributes}>
                    <div className={stylesDetail.atr1}>
                        <span>{race.weight}</span>
                        <h5>Weight</h5>
                    </div>
                    <div className={stylesDetail.atr2}>
                        <span>{race.height}</span>
                        <h5>Height</h5>
                    </div>
                    <div className={stylesDetail.atr3}>
                        <span>{race.life_span?race.life_span.replace("years",''):null}</span>
                        <h5>life_span</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDetail;