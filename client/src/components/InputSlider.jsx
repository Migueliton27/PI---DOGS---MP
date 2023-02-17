import React from 'react';
import { useState , useRef, useEffect} from 'react';
import stylesInput from "../css/InputSlider.module.css"

function InputSlider({inputSlide,type,setInputSlide,...props}) {
    const min = useRef()
    const max = useRef()
    const minBox = useRef()
    const maxBox = useRef()
    const progessBar = useRef()
    // console.log(min)

    // useEffect(()=>{
    //     const min = document.querySelector("#min")
    //     console.log(min) 
    // },[])

    const [valueMin, setValueMin] = useState(Number(props.minDefault))
    const [valueMax, setValueMax] = useState(Number(props.maxDefault))
    const handlerInput = (name,value) => {
        console.log('FUNCIONANDO')
        //const {value,name} = e
        //const value = name == "min" ? valueMin:valueMax
        let change = ''
        inputSlide[type].includes('-') ? change = inputSlide[type].split(' - ') : change = inputSlide[type]
        console.log('this is name',name)
        if(name === 'min'){
            if(typeof(change) === 'object'){
                value == change[1] ? change.shift() : change[0] = value;
                change = change.join(' - ')
            }
            else{//'10'
                value == change ? change = value : change = `${value} - ${change}` 
            }
        }else if(name === 'max'){
            if(typeof(change) === 'object'){
                if(Number(value)>=Number(change[0])){
                    value == change[0] ? change.pop() : change[1] = value;
                    change = change.join(' - ')  
                 }
                
            }
            else{//'10'
                if(Number(value)>=Number(change)){
                   value == change ? change = value : change = `${change} - ${value}`  
                }
                
            }
        }
        //const change = inputSlide[type].split('-')
        setInputSlide({
            ...inputSlide,
            [type]: change
        })
    }

    const slideHandler = (e) => {
        
        const dif = 0;
        let minrange = parseInt(min.current.value)
        let maxrange = parseInt(max.current.value)
       
        if(maxrange - minrange < dif){
            if(e.target.id === "min"){
                setValueMin(maxrange - dif)
                min.current.value = maxrange - dif
                //handlerInput(e.target.id, maxrange - dif)
            }
            else{
                setValueMax(minrange + dif)
                max.current.value = minrange + dif
                //handlerInput(e.target.id, minrange + dif)
            }
        }else{
            setValueMax(maxrange)
            setValueMin(minrange)
            handlerInput(e.target.id, e.target.id === "min"? minrange:maxrange)            

            progessBar.current.style.left =  ((minrange-Number(min.current.min)) / (Number(max.current.max) - Number(min.current.min))) *100+'%';
            progessBar.current.style.right = 100 - ((maxrange-Number(min.current.min)) / (parseInt(min.current.max) - parseInt(min.current.min))) *100+'%'
            //progessBar.current.style.right = 100 - ((maxrange) / min.current.max) *100+'%'
        }
        //e.target.id === "min" ? handlerInput(minrange, e.target.id): handlerInput(maxBox.current)
        //handlerInput(e.target.id, e.target.id === "min"? minrange:maxrange)
        //handlerInput(e.target.id)
    }    

   
    return (
        
        <div className={stylesInput.container}>
            <div className={stylesInput.containerInput}>
                <label>Min </label>
                <input ref={minBox} type="number" name='min'  min={props.min} max={props.max} value={valueMin} onChange={handlerInput}/>
                <span>-</span>
                <label>Max </label>
                <input ref={maxBox} type="number" name='max'  min={props.min} max={props.max} value={valueMax} onChange={handlerInput}/>
            </div>
            <div className={stylesInput.containerSliders} >
                <div ref={progessBar} className={stylesInput.progress} ></div>
                <input ref={min} id="min" className="rannge" type="range"  min={props.min} max={props.max} defaultValue={props.minDefault} onChange={slideHandler}/>
                <input ref={max} id="max" className={stylesInput.maxSlider} type="range"  min={props.min} max={props.max} defaultValue={props.maxDefault} onChange={slideHandler}/>
            </div>
        </div>
    );
}

export default InputSlider;
/*
<input ref={min} id="min" className="rannge" type="range"  min="1000" max="10000" defaultValue="2500" onChange={slideHandler}/>
<input ref={max} className={stylesInput.maxSlider} type="range"  min="1000" max="10000" defaultValue="7500" onChange={slideHandler}/>
                }*/