import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../utils/validation/Validation'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import './auth.css';

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState);
    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, err:'Invalid emails', success: ''})
        try{
            const res = await axios.post('/user/forgot_pwd' , {email})
            return setData({...data, err:'', success:res.data.message})
        }catch(err){
            err.response.data.message && setData({...data, err: err.response.data.message, success:''})
        }
    }
    return (
        <div className="fg_pass">
            <h2>¿Olvidó su contraseña?</h2>
            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Ingrese su correo electronico</label>
                <input type="email" name="email" id="email" value={email}
                onChange={handleChangeInput}></input>
                <button onClick={forgotPassword}>Verifique su email</button>
            </div>
        </div>
    )
}

export default ForgotPassword
