import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification';
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import {isEmail, isEmpty, isLength, isMatch} from '../../utils/validation/Validation';


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password, cf_password, err, success} = user

    const history = useNavigate();

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success:'' })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if(isEmpty(name) || isEmpty(password) || isEmpty(cf_password)){
            return setUser({...user, err: "Por favor llenar todos los espacios", success:'' })
        }
        if(!isEmail(email)){
            return setUser({...user, err: "Correo invalido", success:'' })
        }
        if(isLength(password)){
            return setUser({...user, err: "La contraseña debe contener al menos 6 caracteres", success:'' })
        }
        if(isMatch(password, cf_password)){
            return setUser({...user, err: "Las contraseñas no coinciden", success:'' })
        }
        try{

            const res = await axios.post('user/register', 
            {name, email, password}
            )
            
            setUser({...user, err: '', success: res.data.message})
            // const res = await axios.post('/user/login', {email, password})
            // setUser({...user, err: '', success: res.data.message })
            // console.log(res);

            // localStorage.setItem('firstLogin', true);

            // history("/");       
        }catch (err){
            err.response.data.message && 
            setUser({...user, err: err.response.data.message, success: '' })
        }
    }
    return (
        <div className="login_page">
            <h2>Registro</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre completo</label>
                    <input type="text" placeholder="Ingrese Nombre" id="name"
                    value={name} name="name" onChange={handleChangeInput}></input>
                </div>
                <div>
                    <label htmlFor="email">Dirección de correo</label>
                    <input type="text" placeholder="Ingrese direccion de correo" id="email"
                    value={email} name="email" onChange={handleChangeInput}></input>
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" placeholder="Ingrese su contraseña" id="password"
                    value={password} name="password" onChange={handleChangeInput}></input>
                </div>

                <div>
                    <label htmlFor="cf_password">Confirmar Contraseña</label>
                    <input type="password" placeholder="Confirmar contraseña" id="cf_password"
                    value={cf_password} name="cf_password" onChange={handleChangeInput}></input>
                </div>


                <div className="row">
                    <button type="submit">Registrarse</button>
                </div>
            </form>
            
            <p> Ya tiene una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
        </div>
    )
}

export default Register
