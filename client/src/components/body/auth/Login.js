import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification';
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}


function Login() {
    const [user, setUser] = useState(initialState)
    const dispacth = useDispatch()
    const {email, password, err, success} = user
    const history = useNavigate();

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success:'' })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.message })
            console.log(res);
            
            localStorage.setItem('firstLogin', true);

            dispacth(dispatchLogin())     
            history("/");
                   
        }catch (err){
            err.response.data.message && setUser({...user, err: err.response.data.message, success: '' })
        }
    }
    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
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

                <div className="row">
                    <button type="submit">Iniciar Sesion</button>
                    <Link to="/forgot_pwd">Olvidaste tu contraseña?</Link>
                </div>
            </form>
            <p> No tienes una cuenta? <Link to="/register">Registrarse</Link></p>

        </div>
    )
}

export default Login
