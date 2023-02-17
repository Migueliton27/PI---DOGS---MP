import React from 'react';
import stylesLanding from '../css/LandingPage.module.css'
import {Link} from 'react-router-dom'

function LandingPage(props) {
    return (
        <section className={stylesLanding.landing}>
            
            <div className={stylesLanding.textBox}>
                <h1>Descubre la variedad y el encanto </h1>
                <h1>Porque mas que mascotas, son <span>amigos</span></h1>
                
                <Link to='/home'>
                    <button>EXPLORAR</button>

                </Link>
            </div>
            <div className={stylesLanding.imgLand}>

            </div>
            <div className={stylesLanding.circle}></div>
            
            <div className={stylesLanding.button}></div>

        </section>
    );
}

export default LandingPage;