import React from 'react';
import { useState , useRef, useEffect} from 'react';
import stylesInput from "../css/InputSlider.module.css"

function InputSlider(props) {
    const min = useRef()
    const max = useRef()
    const progessBar = useRef()
    // console.log(min)

    // useEffect(()=>{
    //     const min = document.querySelector("#min")
    //     console.log(min)
    // },[])

    const [valueMin, setValueMin] = useState(2500)
    const [valueMax, setValueMax] = useState(7500)

    const slideHandler = (e) => {
        const dif = 1000;
        let minrange = parseInt(min.current.value)
        let maxrange = parseInt(max.current.value)
        
        
        if(maxrange - minrange < dif){
            if(e.target.id === "min"){
                setValueMin(maxrange - dif)
                min.current.value = maxrange - dif
            }
            else{
                setValueMax(minrange + dif)
                max.current.value = minrange + dif

            }
        }else{
            setValueMax(maxrange)
            setValueMin(minrange)
            progessBar.current.style.left =  ((minrange-Number(min.current.min)) / (Number(max.current.max) - Number(min.current.min))) *100+'%'
            progessBar.current.style.right = 100- ((maxrange) / min.current.max) *100+'%'
        }
        

    }    

    return (
        
        <div className={stylesInput.container}>
            <div className={stylesInput.containerInput}>
                <label>Min </label>
                <input type="number"  min="0" max="10000" value={valueMin}/>
                <span>-</span>
                <label>Max </label>
                <input type="number"  min="0" max="10000" value={valueMax}/>
            </div>
            <div className={stylesInput.containerSliders} >
                <div ref={progessBar} className={stylesInput.progress} ></div>
                <input ref={min} id="min" className="rannge" type="range"  min="1000" max="10000" defaultValue="2500" onChange={slideHandler}/>
                <input ref={max} className={stylesInput.maxSlider} type="range"  min="1000" max="10000" defaultValue="7500" onChange={slideHandler}/>
            </div>
        </div>
    );
}

export default InputSlider;