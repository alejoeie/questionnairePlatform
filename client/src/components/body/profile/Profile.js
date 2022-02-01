import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { isLength, isMatch } from '../../utils/validation/Validation';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import {fetchUser, dispatchGetUser} from '../../../redux/actions/authAction'
import './profile.css'
import {TextField, MenuItem, Button, Paper} from '@material-ui/core';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router';
import BasicCard from '../../cards/BasicCard';
import PaperCard from './PaperCard';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from "@mui/material/FormControlLabel";

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''

}

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)

    console.log(users)

        const {user, isAdmin, isLogged} = auth
        const [data, setData] = useState(initialState)
        const {name, email, password, cf_password, err, success} = data

        const [avatar, setAvatar] = useState(false)
        const [loading, setLoading] = useState(false)
        const [callback, setCallback] = useState(false)

        const [questionnaire, setQuestionnaire] = useState([]);
        const [questionnaireId, setQuestionnaireId] = useState('')
        const [userId, setUserId] = useState('');
    
        const [getUser, setGetUser] = useState('')
        const [getUsers, setGetUsers] = useState([])

        const dispatch = useDispatch()
        useEffect(() => {
            //Esta parte es solamente para el administrador
            if(isAdmin){
                fetchAllUsers(token).then(res => {
                    dispatch(dispatchGetAllUsers(res))
                    setGetUsers(res.data)
                    console.log(res);
                })
            }
            if(isLogged){
                fetchUser(token).then(res => {
                    dispatch(dispatchGetUser(res))
                    console.log(res.data.user.name)
                    setGetUser(res.data.user)
                })
            }
            
        }, [token, isLogged, isAdmin, dispatch, callback])

        // una prueba con los cuestionarios
        
        // const [questionnaire, setQuestionnaire] = useState([])
        // const {questionId, questionName} = questionnaire
        

        // const fetchQuestionnaires = () => {
        //     // se ha intentado conectar con las apis de preguntas 
        //     try { 
        //         console.log(token);  
        //         // const res = axios.get('/test/get_questionnaires', {
        //         //     headers: {Authorization: token}
        //         // })
        //         if(isLogged){
                    
        //         }
        //         // setQuestionnaire();
        //         console.log(res);

        //     }catch(err){
        //        console.log(err);
        //     }
        // }
        useEffect(() => {
            const getDataQuestionnaire = async () => {
              const res = await axios.get('/test/get_questionnaires',{
                  headers: {Authorization: token}
              }).then(res => {
                setQuestionnaire(res.data.questionnaires)
    
              }).catch(err => {
                  console.log(err)
              })
            }
            getDataQuestionnaire()
    
          }, [])
    
          console.log(questionnaire);

        
        const handleChange = e => {
            //Esta funcion se usa para recoger el target o el dato
            //que se esta introduciendo como input

            const{name, value} = e.target
            setData({...data, [name]:value, err:'', success: ''})
        }
        const questClick = e => {
            setQuestionnaireId(e.target.value)
        }

        const userClick = e => {
            setUserId(e.target.value)
        }

        console.log(questionnaireId);
        console.log(userId);
        const[cuestionario, setCuestionario] = useState('')
        
        
        console.log(cuestionario);
        // if(isLength(password)){
        //     return setData({...data, err: 'La contrasena debe tener al menos 6 caracteres', success: ''})
        // }
        // if(!isMatch(password, cf_password)){
        //     return setData({...data, err: 'Las contrasenas no coinciden', success: ''})

        // }
        //const updateInfo = () => {
            
            //No existe una ruta dentro de la API para este efecto
            //Pero el diseno quedaria mas o menos de la siguiente forma:

            // try{
            //     axios.patch('/user/update', {
            //         name: name ? name : user.name,
            //         avatar: avatar ? avatar : user.avatar
            //     },{
            //         headers: {Authorization: token}
            //     })
                
            //     setData({...data, err:'', success: 'Se actualizo exitosamente la informacion'})

            // }catch (err){
            //     setData({...data, err:err.response.data.message, success: ''})
            // }
        // }

        // const updatePass = () => {
            
            //No existe una ruta dentro de la API para este efecto
            //Pero el diseno quedaria mas o menos de la siguiente forma:

            // try{
            //     axios.patch('/user/reset', {
            //              password
            //         
            //     },{
            //         headers: {Authorization: token}
            //     })
                
            //     setData({...data, err:'', success: 'Se actualizo exitosamente la informacion'})

            // }catch (err){
            //     setData({...data, err:err.response.data.message, success: ''})
            // }
        //}

        // const handleUpdate = () => {
        //     if(name || avatar) updateInfo()
        //     if(password) updatePass()
        // }
        const navigate = useNavigate()

        const handleSubmit = () => {
            navigate('/questions')
        }
        
        const addQuestionnaires = () => {
            navigate('/profile_admin')
        }

        const addQuestions = () => {
            navigate('/add_questions')
        }
        getUsers.map(user => {
            console.log(user.name);
        })
        return (
        <div className="profile_page">
            <div className="col-left">
                <h2>{isAdmin ? "Perfil de administrador": "Perfil de usuario"}</h2>

                <div className="avatar">
                    <img src={getUser.avatar} alt="" />
                    <span>
                    <i className="fas fa-camera"></i>
                    <p>Cambiar</p>
                    <input type="file" name="file" id="file_up"/>
                    </span>

                </div>

                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" id="name" defaultValue={getUser.name}
                    placeholder="Su nombre"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input type="email" name="email" id="email" defaultValue={getUser.email}
                    placeholder="Su email" disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Nueva contraseña</label>
                    <input type="password" name="password" id="password" 
                    placeholder="Su contraseña" value={password}/>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirmar contraseña</label>
                    <input type="password" name="cf_password" id="cf_password" 
                    placeholder="Confirmar contraseña" value={cf_password} />
                </div>
                
                <button disabled={loading}>Actualizar informacion</button>
            </div>
            <div className="col-right">
                
                <Container>
                    <Grid container spacing={3}>

                       {isAdmin ? <PaperCard title="Agregar un cuestionario a la base de datos" description="Agregar cuestionarios" action={addQuestionnaires}/> : <PaperCard title="Solo Administradores pueden accesar" description="Agregar Cuestionarios"/>} 
                       <PaperCard title="Se procede a practicar para las pruebas" description="Practicar" action={handleSubmit}/>
                       {isAdmin ? <PaperCard title="Agrega pregunta a un cuestionario" description="Agregar pregunta" action={addQuestions} /> : <PaperCard title="Solo Administradores pueden accesar" description="Agregar Preguntas" />}
                {/* {isAdmin ? <div className="rowing"><Button variant='contained' color="primary" size="large" onClick={addQuestionnaires}>
                    Agregar cuestionarios
                </Button> 
                
                <Button variant='contained' color="primary" size="large" onClick={handleSubmit}>
                    Ir a practicar
                </Button>
                <Button variant='contained' color="primary" size="large" onClick={addQuestions}>
                    Agregar Preguntas
                </Button></div> : <Button variant='contained' color="primary" size="large" onClick={handleSubmit}>
                    Ir a practicar
                </Button>} */}
                </Grid>
                </Container>
                <h2>{isAdmin ? "Usuarios existentes" : "Vista no disponible"}</h2>
                <table className="customers">
                    
                <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Accion</th>
                            </tr>
                        </thead>

                <tbody>
                    { 
                        getUsers.map(user => (
                            <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {
                                    user.role === 1
                                    ? <i className="fas fa-check" title="Admin"></i>
                                    : <i className="fas fa-times" title="Usuario"></i>
                                }
                            </td>
                            <td>
                                <Link to={`/edit_user/${user._id}`}>
                                <i className="fas fa-times" title="Editar"></i>
                                </Link>
                                <i className="fas fa-trash-alt" title="Remover"></i>
                            </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
                <h2>{isAdmin ? "Cuestionarios existentes" : "Mis cuestionarios"}</h2>
                <table className="customers">
                    
                <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>

                <tbody>
                    { 
                        questionnaire.map(quest => (
                            <tr key={quest._id}>
                            <td>{quest._id}</td>
                            <td>{quest.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

                <h2>{isAdmin ? "Agregar Cuestionario a usuario" : "Vista no disponible"}</h2>
                <h2>{isAdmin ? "Seleccione el Cuestionario" : "Vista no disponible"}</h2>
                <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cuestionarios</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Cuestionarios"
          onChange={questClick}
          defaultValue=""
        >
            {questionnaire.map(questionSt => (
                <MenuItem key={questionSt.name} id={questionSt.name} value={questionSt._id}>{questionSt.name}</MenuItem>
            ))}
          
        </Select>
      </FormControl>
    </Box>
                   <h2>{isAdmin ? "Agregar Cuestionario a usuario" : "Vista no disponible"}</h2>
                
                <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Usuarios</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Cuestionarios"
          onChange={userClick}
          defaultValue=""
        >
            {getUsers.map(userSt => (
                <MenuItem key={userSt.name} id={userSt.name} value={userSt._id}>{userSt.name}</MenuItem>
            ))}
          
        </Select>
      </FormControl>
    </Box>
    
    <Button variant="contained">Agregar cuestionario a usuario</Button>
    
    
            </div>
        </div>
    )
}

export default Profile
