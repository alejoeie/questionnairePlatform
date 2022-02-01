import React, {useState, useEffect, useRef} from 'react'
import {dispatchQuestionnaires, dispatchGetQuestionnaires} from '../../../redux/actions/authAction'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './questions.css'
import {TextField, MenuItem, Button} from '@material-ui/core';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import {useParams} from 'react-router-dom'
import {fetchCuestionarios, dispatchCuestionarios} from '../../../redux/actions/authAction'
import Questionnaire from './Questionnaire'
import { showSuccessMsg } from '../../utils/notification/Notification';
import {render} from 'react-dom';
import ReactHtmlParser from 'react-html-parser';

const initialState = {
    questionnaire:[],
    err:'',
    success:''
}
const url = "https://mocki.io/v1/ac139b28-b038-4f20-b5d6-93a7fdd5e947"
function Questions() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
    const navigate = useNavigate()
    console.log(token);
    // const {token} = useParams()

    const [questionnaire, setQuestionnaire] = useState([])
    const [university, setUniversity] = useState('')

    const [test, setTest] = useState([])
    // const questionnaireName = ''
    // const getQuestions = async () => {
        
    //     const res = await axios.get('https://mocki.io/v1/46fa1251-d90a-44ab-83c1-451cc882c5b8')
    //     // setQuestionnaire({...questionnaire, err: '', success:res.data.message})
    //     console.log("Estamos imprimiendo en consola");
    //     console.log(res);
    //     return res
    //     // setQuestionnaire(res);2
        
    //     // console.log(res);
    // }
    // getQuestions()
    const dispatch = useDispatch()
    const [callback, setCallback] = useState(false)
    // console.log(token);
    // useEffect(() => {
    //     fetchCuestionarios().then(res => {
    //         dispatch(dispatchCuestionarios(res))
    //     })
    //     // console.log(res);
    // })
    // console.log(res);
    // console.log(token)
    // const {user, isLogged} = auth
    // useEffect(() => {
    //     if(isLogged){
    //         dispatchQuestionnaires(token).then(res => {
    //             dispatch(dispatchGetQuestionnaires(res))
    //             console.log(res);
    //         })
    
    //     }

    // }, [token, isLogged, dispatch, callback])

   

    // const fetchQuestions = async () => {
    //     const res = axios.get('/test/get_questionnaires', {
    //         headers : {Authorization: token}
    //     })
    //     console.log(res)
    // }
    const [cuestionarios, setCuestionarios] = useState([])
    const [questionnaireId, setQuestionnaireId] = useState('');
    const [preguntas, setPreguntas]=useState(initialState);
    const [clicked, setClicked] = useState(false);
    const [optionId, setOptionId] = useState('');
    const [error, setError] = useState('')

    const radiosWrapper = useRef();
    useEffect(() => {
      const getQuestionnairesUser = async () => {
          
          try{
              const res = await axios.get('test/get_questionnaires',{
                  headers: {Authorization: token}
              })
              setCuestionarios(res.data.questionnaires);
              console.log(res);
          } catch(err){
              console.log("Error");
          }
      }
      getQuestionnairesUser()
  }, [])


  console.log(cuestionarios);
 


    const handleChange = (e) => {
      setQuestionnaireId(e.target.value)
    }

    // const buttonClick = async (e) => {
    //   e.preventDefault();
    //   console.log("funciona");
    //   console.log(token);
    //   console.log(questionnaireId);
    //   var axios = require('axios');
    //   var data = JSON.stringify({
    //     "questionnaireId": questionnaireId
    //   });
      
    //   var config = {
    //     method: 'post',
    //     url: 'http://localhost:5000/test/get_question',
    //     headers: { 
    //       'Authorization': token, 
    //       'Content-Type': 'application/json'
    //     },
    //     data : data
    //   };
      
    //   axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     setPreguntas(JSON.stringify(response.data))
        
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //   setClicked(true);
    // }
    const buttonClick = async (e) => {
      
      e.preventDefault()

      try{

        
        await axios.post('/test/get_question',{questionnaireId},
        { 
          headers: {Authorization: token}
        }).then((response)=>{
          setPreguntas(response.data)
        })
        console.log("Exitos")
        console.log(preguntas)

      }catch(err){
        console.log("Error posteando a API");
      }
      setClicked(true)
    }
    console.log(preguntas.statement);
    
    const changeHandler = (e) => {
      setOptionId(e.target.value);
      console.log(optionId);
      if(error){
        console.log(preguntas.data.message);
          setError('');
      }
  }
  const answerId = preguntas.answerId
  console.log(answerId);

  const [updateAnswer, setUpdateAnswer] = useState('')
  const success = ''
  const setOnClick = async e => {
    try{
      await axios.post('/test/update_answer',{answerId, optionId},{
        headers: {Authorization: token}
      }).then((response) =>{
        setUpdateAnswer(response.data.message)
      })
    }
    
    catch(err){
      console.log(err);
    }
  }
  console.log(updateAnswer);
    const showQuestions = () => {
      return <div className="card">
        {updateAnswer && showSuccessMsg(updateAnswer)}
      <div className="card-content">
          <div className="question-content">
              <div className="mb-5">{ReactHtmlParser(preguntas.statement)}</div> 
              <div className="control" ref={radiosWrapper}>
                 {preguntas.options.map((data, key) => (
                  <label  className="radio has-background-light" key={data._id}>
                      <input type="radio" name="answer" value={data._id} onChange={changeHandler}></input>
                      {data.optionStatement}
                  </label>
                 ))} 
                 

              </div>
              <div className="has-text-danger">{error}</div>
              <button className="button is-link is-medium is-fullwidth mt-4" onClick={setOnClick}>Siguiente</button>
          </div>
      </div>
  </div>
    }
    
  
    console.log(preguntas);
    console.log(clicked);
    return (
        <div className="content">
          <div className="settings_select">
            <h2>Seleccione el cuestionario para el que quiere practicar</h2>
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cuestionarios</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          label="Cuestionarios"
          onChange={handleChange}
        >
            {cuestionarios.map(questionnaire => (
                <MenuItem key={questionnaire.name} value={questionnaire._id}>{questionnaire.name}</MenuItem>
            ))}
          
        </Select>
      </FormControl>
    </Box>
    
                    <Button variant='contained' color="primary" size="large" onClick={buttonClick}>
                        Iniciar Prueba
                    </Button>
              {
                clicked ? showQuestions() : "Vista de seleccion de Cuestionarios"
                
              }
          </div>
          
        </div>
      );
}

export default Questions

