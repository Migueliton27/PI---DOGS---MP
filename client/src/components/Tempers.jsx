import React from 'react';
import stylesTempers from '../css/Tempers.module.css'
import stylesNav from '../css/NavBar.module.css'
import { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDog,faDatabase,faGlobe} from "@fortawesome/free-solid-svg-icons";
import {filterByTemperament,setPages,getByApiBD} from '../redux/actions';

function Tempers(props) {
    const [select, setSelect] = useState(false)
    const [inputTemper, setInputTemper] = useState('')
    const [selectTemper, setSelectTemper] = useState(false)
    const [optionTemper, setOptionTemper] = useState('')
    const [temperaments, setTemperaments] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        setTemperaments(props.temperaments)
    },[props.temperaments])

    const show = (e) => {
        select ? setSelect(false) : setSelect(true)
        
    }
    const showTemper = (e) => {
        selectTemper ? setSelectTemper(false) : setSelectTemper(true)
    }

    function handleTemperFilter(e,value){
        setSelect(false)
        showTemper()
        setInputTemper('')
        setTemperaments(props.temperaments)
        setOptionTemper(value)
        dispatch(filterByTemperament(value))
        dispatch(setPages(0))
        dispatch(setPages(1))
    }

    const handleSearch = (e) => {
        const{value} = e.target
        setInputTemper(value)
        setTemperaments(props.temperaments.filter((temp)=> temp.name.toLowerCase().includes(value.toLowerCase()) ))
    }

    const handleApi = (e) =>{
        dispatch(getByApiBD('api'))
        dispatch(setPages(0))
        dispatch(setPages(1))
    }

    const handleBD = (e) =>{
        dispatch(getByApiBD('BD'))
        dispatch(setPages(0))
        dispatch(setPages(1))
    }

    const racesDogs = useSelector(state => state.originalDogs).map((dog)=>dog.name)
    console.log('pieasdlasd', temperaments)
    // console.log('Races-->', racesDogs)
   // console.log('SELECTED IS', optionTemper.trim(),'5')
    console.log('opcion',inputTemper)

    return (
        <div className={`${stylesNav.containerFilter} ${select ?  stylesTempers.active : null} ${select ?  stylesNav.active : null}`}>

            <input type="text" onClick={show}
                className={`${stylesNav.filter} `} placeholder="Filtrar por..." />

            {/* <ul className={stylesNav.options}> */}
            <div className={stylesTempers.optionsContainer}>
                <ul className={stylesTempers.options}>
                    <li >
                    {/* <li className={`${selectTemper ?  stylesTempers.activeTemper : null}`} onClick={showTemper}> */}
                        
                        <FontAwesomeIcon icon={faDog}/>
                        <a onClick={showTemper}>  TEMPERAMENTOS</a>
                        <div className={`${stylesTempers.containerBox} ${stylesTempers.containerTempers}
                        ${selectTemper ?  stylesTempers.activeTemper : null}`} >
                            <div className={stylesTempers.searchTemper}>
                                <input onChange={handleSearch} value={inputTemper} className={stylesTempers.inputSearch} placeholder='Search' name='' />
                            </div>
                            <ul className={stylesNav.optionsListTempers}>
                                {
                                    temperaments.length ?
                                    temperaments.map((temper, index) => {
                                            return (
                                                <li key={index} onClick={(e) => handleTemperFilter(e ,temper.name)}>{temper.name}</li>
                                            )
                                        }) : null
                                }
                            </ul>
                        </div>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faDatabase}/>
                        <a onClick={handleBD}>  RAZA BD</a>
                        
                    </li>
                    <li> 
                        <FontAwesomeIcon icon={faGlobe}/>
                        <a onClick={handleApi}>  RAZA API</a>
                        
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Tempers;

