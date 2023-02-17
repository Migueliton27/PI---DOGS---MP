import React, { useState } from 'react';
import SearchBar from './SearchBar';
import stylesNav from '../css/NavBar.module.css'
import {useDispatch, useSelector} from 'react-redux'
import Tempers from './Tempers';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpAZ,faArrowDownAZ,faArrowUp19,faArrowDown19} from "@fortawesome/free-solid-svg-icons";
import {useRef} from 'react'
import { orderItems, setPages, orderByWeight, getDogs} from '../redux/actions';
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'



function NavBar(props) {
    const [select, setSelect] = useState(false)
    const [order, setOrder] = useState('')
    const [orderWeight, setOrderWeight] = useState('')
    const dispatch = useDispatch()
    const page = useSelector(state => state.pag)
    const location = useLocation()
    console.log('location', location.pathname)
    const downUp = useRef()
    const show = (e)=>{
        console.log(downUp)
        // downUp.current.classList.toggle('active')
        select ? setSelect(false) : setSelect(true)
    }

    const handleOrder = (e)=>{
        //console.log(e.target.id)
        
        setSelect(false)

        if(e.target.id === 'order'){
             if(order === '' || order==='DESC'){
                setOrder('ASC')
                dispatch(orderItems('ASC'))
             }
             else if(order === 'ASC'){
                setOrder('DESC')
                dispatch(orderItems('DESC'))
             }
            dispatch(setPages(0))
            dispatch(setPages(1))
        }
    }

    const handleWeight = (e) =>{
        setSelect(false)
        if(orderWeight === '' || orderWeight==='DESC'){
            setOrderWeight('ASC')
            dispatch(orderByWeight('ASC'))
            
         }
         else if(orderWeight === 'ASC'){
            setOrderWeight('DESC')
            dispatch(orderByWeight('DESC'))
         }
        dispatch(setPages(0))
        dispatch(setPages(1))
        
        
    }

    const reset = (e) =>{
        dispatch(getDogs())
        dispatch(setPages(0))
        dispatch(setPages(1))
    }



    return (
        <nav className={stylesNav.NavBar}>
            <ul>
                
                {location.pathname ==='/home' && <li>
                    <Tempers temperaments={props.temperaments}/>
                </li>}
                {location.pathname ==='/home' && <li>
                    <div className={`${stylesNav.containerFilter} ${select? stylesNav.active:null}`}>
                        <input ref={downUp} type="text" onClick={show}
                         className={`${stylesNav.filter} `} placeholder="Ordenar por..."/>
                        <div className={stylesNav.options}>
                            <div id='order' onClick={handleOrder}>
                                {order === '' || order==='ASC'?
                                <FontAwesomeIcon icon={faArrowUpAZ}/>:
                                <FontAwesomeIcon icon={faArrowDownAZ}/>}
                                
                               <a> Alfabeticamente</a>
                            </div>
                            <div onClick={handleWeight}>
                            {orderWeight === '' || orderWeight==='ASC'?
                                <FontAwesomeIcon icon={faArrowUp19}/>:
                                <FontAwesomeIcon icon={faArrowDown19}/>}
                                <a>Peso</a>
                            </div>
                        </div>
                       
                    </div>
                </li>}
                
                
                {location.pathname ==='/home' && <li><SearchBar/></li>}
                {location.pathname ==='/home' && <li>
                    <button className={stylesNav.reset} onClick={reset}>RESET</button>
                </li>}

                <div className={stylesNav.cont}>
                    <Link to='/home'><li className={stylesNav.home}><a>Home</a></li></Link>
                    <Link to='/'><li className={stylesNav.land}><a>Landing</a></li></Link>
                    <Link to='/postDog'><li className={stylesNav.land}><a>CREATE</a></li></Link>
                </div>

                {/* <li><a>Filter</a></li> */}
            </ul>
        </nav>
    );
}

export default NavBar;