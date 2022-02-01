import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import 'bulma/css/bulma.min.css';
import './questionnaire.css'
const initialState = {
    questionnaire:[],
    err:'',
    success:''
}

function Questionnaire({cuestionarios}) {
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)

    const [pregunta, setPregunta] = useState([])
    const [opcion, setOpcion] = useState([])
    const [error, setError] = useState('')
    const [selected, setSelected] = useState('');
    const [preguntas, setPreguntas] = useState(initialState)
    const radiosWrapper = useRef();
    

    // useEffect(() => {
    //   console.log("funciona");
    //   console.log(token);
    //   var axios = require('axios');
    // //   var data = JSON.stringify({
    // //     "questionnaireId": questionnaireId
    // //   });
      
    //   var config = {
    //     method: 'post',
    //     url: 'http://localhost:5000/test/get_question',
    //     headers: { 
    //       'Authorization': token, 
    //       'Content-Type': 'application/json'
    //     },
    //     // data : data
    //   };
      
    //   axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     setPreguntas(JSON.stringify(response.data))
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //   }, [])

      const changeHandler = (e) => {
        setSelected(e.target.value);
        console.log(selected);
        if(error){
            setError('');
        }
    }

    return (
        // <div>
        //     <h2>{}</h2>
        //     {.map(item => item.optionStatement)}
        // </div>
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h2 className="mb-5">{pregunta.questionStatement}</h2>
                    <div className="control" ref={radiosWrapper}>
                       {opcion.map((data, key) => (
                        <label  className="radio has-background-light" key={data.optionStatement}>
                            <input type="radio" name="answer" value={data._id} onChange={changeHandler}></input>
                            {data.optionStatement}
                        </label>
                       ))} 
                       
    
                    </div>
                    <div className="has-text-danger">{error}</div>
                    <button className="button is-link is-medium is-fullwidth mt-4">Siguiente</button>
                </div>
            </div>
        </div>
    )
}

export default Questionnaire
