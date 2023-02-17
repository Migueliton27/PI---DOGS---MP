import React from 'react';
//import {validation} from './validatonForm'
import { useState, useRef, useEffect} from "react"
import stylesForm from "../css/Form.module.css"
import InputSlider from './InputSlider';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { postNewDog, getDogs, setPostDog } from '../redux/actions'
import { useHistory } from 'react-router-dom';
import validation from './validatonForm';



function Form(props) {
    const history = useHistory()
    const temperamentsDB = useSelector((state) => state.temperaments);
    console.log(temperamentsDB)
    const [error, setError] = useState({})
    const [tempers, setTempers] = useState([{ temper: '' }])
    const [image, setImage] = useState('')
    const [inputSlide, setInputSlide] = useState({
        weight: '20 - 80',
        height: '35 - 75',
        lifespan: '10 - 14'
    })
    const [name, setName] = useState('')
    const [success, setSuccess ] = useState('')
    
    //console.log('gonorrea: ', inputSlide)

    const dispatch = useDispatch()
    const DivImg = styled.div`width: 350px;
        height: 300px;
        
        border: 1px solid black;
        background:${error.image ? console.log('paila') : 'url(' + image + ');'
        }
        background-repeat: no-repeat ;
        background-size:cover;
        background-position: center;
        margin: auto;
        margin-top: 150px;`

    //background:${image.length >0? 'url('+image+');':"none;"}
    
    
        const[num, setNum] = useState(0)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const localError = await validation({name, image, tempers})
        setError(localError)
        console.log('Este es el error', localError)
       
        
        
        
        if(Object.keys(localError).length === 0){
            console.log('SE PUDO')
            const dog = {
                name,
                image,
                weight: inputSlide.weight,
                height: inputSlide.height,
                life_span: inputSlide.lifespan,
                tempers: tempers.map((t) => t.temper).join(",")
            }

            dispatch(postNewDog(dog))
            dispatch(getDogs())
            
        }else{
            alert(`Tiene errores los siguientes errores de validacion: 
                ${localError.name? localError.name:""}
                ${localError.image? localError.image:""}
                ${localError.temperaments? localError.temperaments:""}`)
        }

       
        console.log('ACTIVADO')
    }

    const handleInputChangeName = async (e) => {
        const { value } = e.target
        setName(value)
        
        setError(await validation({ image, name: value, tempers }))
        console.log(error.name)
    }

    const addTemper = (e) => {
        //const newTemper = tempers.length + 1

        if (tempers.length + 1 <= 6) {

            setTempers([...tempers, { temper: '' }])
        }
        if (tempers.length === 6) {
            setError({ ...error, tempers: 'La cantidad maxima de temperamentos que puede agregar son 6' })
            setTimeout(() => {
                let err = error
                delete err.tempers
                setError({ ...error, tempers: '' })
            }, 5000)



        }
    }
    const resPost = useSelector(state => state.resPost)
    useEffect(()=>{
        if(resPost.success){
            dispatch(setPostDog())
            history.push('/home')
        }
    },[resPost])
     if(resPost.error){
        alert(resPost.error.error)
        dispatch(setPostDog())
        console.log('mira el error', resPost.error.error)
    }

    //9727825
    
    const handleInputChangeTemper = async(e, index) => {
        const { value } = e.target

        if(value === 'Select') return;
        setTempers(tempers.map((t, i) => {
            //console.log('INDEX MAP',i===index)
            if (i === index) {
                const upT = { temper: value }
                t.temper = value
                return t
            }
            return t
        }))
        
        let validationTemper = tempers
        validationTemper[index].temper = value
        setError(await validation({name, image, tempers: validationTemper}))

    }

    const handleDeletTemper = (e,index) =>{
        if(tempers.length === 1) return
        setTempers(tempers.filter((t,i)=>{
            return i != index
        }))
    }

    //console.log('this is tempers', tempers)
    const handleInputChangeImage = async (e) => {
        const { value } = e.target

        console.log(DivImg)
        setImage(value)
        setError(await validation({ image: value, name, tempers }))


    }

    
    console.log('YO CREO QUE SI',tempers)
    return (
        <div className={stylesForm.containerGlobal}>
            <div className={stylesForm.containerImg}>
                <div></div>
                <DivImg>
                </DivImg>

            </div>
            <form onSubmit={handleSubmit} className={stylesForm.container}>
                <h2>Crea una nueva raza</h2>

                <div className={stylesForm.containerInputs}>
                    <div className={stylesForm.group}>
                        <input type='text' value={name} onChange={handleInputChangeName} className={stylesForm.inpt} placeholder=" " name='name' />
                        <label className={stylesForm.lbl}>Name</label>
                    </div>
                    {error.name ? <h4 className={stylesForm.error}>{error.name}</h4> : null}
                    <div className={stylesForm.group}>

                        <input name='img' value={image} onChange={handleInputChangeImage} className={stylesForm.inpt} placeholder=" " type='text' />
                        <label className={stylesForm.lbl}>Imagen</label>
                    </div>
                    {error.image ? <h4 className={stylesForm.errorImg}>{error.image}</h4> : null}



                </div>

                <h4>Weight</h4>
                <InputSlider type={'weight'} inputSlide={inputSlide} setInputSlide={setInputSlide} min={"3"} max={"99"} minDefault={"20"} maxDefault={"80"} />
                <h4>Height</h4>
                <InputSlider type={'height'} inputSlide={inputSlide} setInputSlide={setInputSlide} min={"20"} max={"90"} minDefault={"35"} maxDefault={"75"} />
                <h4>Life-Span</h4>
                <InputSlider type={'lifespan'} inputSlide={inputSlide} setInputSlide={setInputSlide} min={"8"} max={"16"} minDefault={"10"} maxDefault={"14"} />

                <div className={stylesForm.containerTemps}>
                    {
                        // error.tempers? <div className={stylesForm.msgAlert}>paila</div>:null
                        error.tempers ?
                            <div className={stylesForm.msgAlert}>La cantidad maxima de temperamentos que puede agregar son 6</div> : null
                    }
                    <div className={stylesForm.add} type='none' onClick={addTemper}>+</div>
                    {/* <input type='text' placeholder='Escribe un temperamento'/> */}

                    {
                        tempers.map((t, index) => {
                            return (

                                <div className={stylesForm.temperOption} key={index}>
                                <select value={t.temper}  onChange={(e)=>handleInputChangeTemper(e,index)} name='Select' key={index}>
                                    <option value='Select'>Seleccione</option>
                                    
                                    {temperamentsDB.map((temp, ind) => {
                                        return (
                                            <option value={temp.name} key={ind}>{temp.name}</option>
                                        )
                                    })}

                                </select>
                                    <div className={stylesForm.deleteTemper} onClick={(e)=>handleDeletTemper(e,index)}>X</div>
                                </div>
                                
                            )
                        })
                    }

                </div>





                <button className={stylesForm.btnSubmit} type="submit">Submit</button>

            </form>
        </div>
    );
}



export default Form;