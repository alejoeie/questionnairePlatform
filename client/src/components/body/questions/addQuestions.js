import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {TextField, MenuItem, Button} from '@material-ui/core';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import 'bulma/css/bulma.min.css';
import './addQuestion.css'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ReactHtmlParser from 'react-html-parser';
// // Prueba para editor
// import {Editor} from 'react-draft-wysiwyg'
// import {EditorState} from 'draft-js'

// const initialValue = EditorState.createEmpty();
const startState = [{
    optionStatement : '',
    isCorrect : false

}]


function AddQuestions() {

    const [value, setValue] = useState("");
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const [questionnaires, setQuestionnaires] = useState([]);
    const [questionnaireId, setQuestionnaireId] = useState('');
    const [questionStatement, setQuestionStatement] = useState('');
    // const [options, setOptions] = useState(startState);

    // const {optionStatement, isCorrect} = options

   
    console.log(token)
    
    
    const handleChange = e => {
        setQuestionnaireId(e.target.value)
    }

    const handleWrite = e => {
        setQuestionStatement(e.target.value)
    }

    const handleAddOption = e => {
        const {questionStatement, value} = e.target
        setOptions({...options, [questionStatement]:value})
    }
    
    
    useEffect(() => {
        const getQuestionnairesUser = async () => {
            
            try{
                const res = await axios.get('test/get_questionnaires',{
                    headers: {Authorization: token}
                })
                setQuestionnaires(res.data.questionnaires);
                console.log(res);
            } catch(err){
                console.log("Error");
            }
        }
        getQuestionnairesUser()
    }, [])
    console.log(questionnaires)
    // getQuestionnairesUser()
    // console.log(questionnaires)

    // Para el envio de opciones se debe crear el siguiente script
    const [options, setOptions] = useState([]);
    const [opcion, setOption] = useState("");
    const [esCorrecto, setEsCorrecto] = useState(false);
    const handleChangeInput = (e) => {
          //Esta funcion flecha recibe un evento que en este caso
    //es que el usuario escriba el enunciado u opcion
        setOption(e.target.value);
      };

      console.log(options);

    

    const addQuestionForm = async (e) => {
        e.preventDefault()
    //     const options = [{
    //         optionStatement:"4",
    //         isCorrect:true,
    //     },
    //     {
    //         optionStatement:"7",
    //         isCorrect:false
    //     }, 
    //     {
    //         optionStatement:"16",
    //         isCorrect: false
    //     }
    // ]
        try{
            const res = axios.post('/test/add_question',{
                questionnaireId, questionStatement:value, options
            },
            {
                headers: {Authorization: token}
            })
            console.log(res.data);
        }catch(err){
            console.log(err.res.data.message);
        }
    }

    const handleOnChange = (e,editor) => {
      const data = editor.getData();
      setValue(data);
    }
    return (
        <div className="content">
           <div className="settings_select">
            <h2>Seleccione el cuestionario para el que quiere agregar preguntas</h2>
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
            {questionnaires.map(questionnaire => (
                <MenuItem key={questionnaire.name} value={questionnaire._id}>{questionnaire.name}</MenuItem>
            ))}
          
        </Select>
      </FormControl>
    </Box>

    <h2>Ingrese el enunciado de la pregunta</h2>
    <CKEditor 
      editor={ClassicEditor}
      onChange={handleOnChange} />

    {/* <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '46ch' },
      }}
      noValidate
      autoComplete="off"
    >   
    <div>
        <TextField
          required
          id="outlined-required"
          label="Requerido"
          defaultValue=""
          onChange={handleWrite}
        />
    </div>
    </Box>    */}

    <div className="options">

    <h2>Ingrese las opciones</h2>

    
    <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Opcion"
          variant="outlined"
          value={opcion}
          onChange={handleChangeInput}
        />
        
        <FormGroup >
          <FormControlLabel
            className="form_group"
            control={<Checkbox />}
            label="Es correcta"
            checked={esCorrecto}
            onChange={(evt) => {
              setEsCorrecto(!esCorrecto);
            }}
          />
        </FormGroup>
        <Button variant="contained"  onClick={() => {
          setOptions([
            ...options,
            {
              optionStatement: opcion,
              isCorrect: esCorrecto
            }
          ]);
        }}>
        Agregar Opcion
      </Button> 
      </Box>
    </div>
    

      <Box>
          
      </Box>
    
    <div className="submit_button">
        <Button variant="contained" onClick={addQuestionForm} endIcon={<SendIcon />}>Agregar Pregunta</Button>
    </div>
          </div>
        </div>
    )
}

export default AddQuestions
