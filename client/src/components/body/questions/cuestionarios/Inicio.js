import React from 'react'
// import '../App.css';
function Inicio({onStart}) {

    
    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h1>Cuestionario UCR</h1>
                    <p>Buena suerte</p>
                    <button className="button is-info is-medium" onClick={onStart}>Iniciar</button>
                </div>
            </div>
        </div>
    )
}

export default Inicio
