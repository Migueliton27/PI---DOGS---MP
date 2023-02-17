import React from 'react';
import {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterSearch,setPages, getDogs} from '../redux/actions'
import stylesSearch from '../css/searchBar.module.css'

function SearchBar(props) {
    const [dog, setDog] = useState('')
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const {value} = e.target
        setDog(value)
        if(value===''){
            dispatch(getDogs())
        }
    }

    const onClick = (e) => {
        dispatch(filterSearch(dog))
        dispatch(setPages(0))
        dispatch(setPages(1))
        
    }

    return (
        <div className={stylesSearch.search}>
            <input type='text' onChange={handleInputChange} value={dog} placeholder='Ingrese el nombre' name='search'/>
            <button className={stylesSearch.buttonSearch} onClick={onClick}>Search</button>
        </div>
    );
}

export default SearchBar;