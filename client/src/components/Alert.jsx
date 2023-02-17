import React from 'react';
import styleAlert from '../css/Alert.module.css'

function Alert(props) {
    return (
        <div className={styleAlert.container}>
            <div>PAILA MANIN
                <button>Cerrar</button>
            </div>
            
        </div>
    );
}

export default Alert;