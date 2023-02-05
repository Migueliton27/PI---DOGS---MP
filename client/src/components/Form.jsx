import React from 'react';
import {validation} from './validatonForm'
import {useState} from "react"
import stylesForm from "../css/Form.module.css"
import InputSlider from './InputSlider';

function Form(props) {
    const [error, setError] = useState({})
    console.log("Estamos en form")
    const handleSubmit = (e)=>{
        e.preventDefault()
        // const min = document.querySelectorAll(".rannge")
        // console.log(min)
    }

    return (
        <div className={stylesForm.containerGlobal}>
            <div className={stylesForm.containerImg}></div>
            <form onSubmit={handleSubmit} className={stylesForm.container}>
                <h2>Crea una nueva raza</h2>
                <div className={stylesForm.containerInputs}>
                    <div className={stylesForm.group}>
                        <input type='text' className={stylesForm.inpt} placeholder=" " name = 'name'/>
                        <label  className={stylesForm.lbl}>Name</label>

                        {/* // value = {userData.username}
                        // onChange = {handleInputChange}/> */}
                        {/* {error && <span>{error.username}</span>} */}
                    </div>
                    <div className={stylesForm.group}>
                        
                        <input name='img' className={stylesForm.inpt} placeholder=" " type = 'text' />
                        <label  className={stylesForm.lbl}>Imagen</label>
                        {/* value = {userData.password}
                        onChange = {handleInputChange}/> */}
                    </div>
                    
                    

                </div>
                
                <h4>Height</h4>
                <InputSlider/>
                <h4>Weight</h4>
                <InputSlider/>
                <h4>Life-Span</h4>
                <InputSlider/>
                <button className={stylesForm.btnSubmit} type="submit">Submit</button> 

            </form>
        </div>
    );
}

export default Form;