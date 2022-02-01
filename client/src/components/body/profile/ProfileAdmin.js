import React, {useState} from 'react'
import './profile.css'
import {Button} from '@material-ui/core/Button'
import axios from 'axios';
import '../auth/auth.css'
import { showSuccessMsg, showErrMsg } from '../../utils/notification/Notification';
import {isEmpty} from '../../utils/validation/Validation';
import {useSelector} from 'react-redux'
import './profile.css'
const initialState = {
    name : '',
    totalAmount: '',
    showedAmount: '',
    err: '',
    success: ''
}
function ProfileAdmin() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const [questionnaire, setQuestionnaire] = useState(initialState);

    const {name, totalAmount, showedAmount, err, success} = questionnaire;

    const handleChangeInput = e => {
        const {name, value} = e.target
        setQuestionnaire({...questionnaire, [name]:value, err: '', success:'' })
    }

    const createQuestionnaire = async e => {
        e.preventDefault()

        if(isEmpty(name)){
            return setQuestionnaire({...questionnaire, err: "Por favor llenar todos los espacios", success:'' })
        }
        try{
            console.log(name, totalAmount, showedAmount)
            const res = await axios.post('/test/add_questionnaires', {
                name, totalAmount, showedAmount
            }, {
                headers: {Authorization: token}
            })
            console.log("Envio exitoso de datos")
            setQuestionnaire({...questionnaire, err: '', success: res.data.message})
            
        }catch(err){
            console.log(err.response.data.message)
            err.response.data.message && setQuestionnaire({...questionnaire, err: err.response.data.message, success: ''})


        }
    }
    console.log(questionnaire)
    const addQuestionnaireToAdmin = async () => {
        const questionnaireId = '61d5a8a6eb78fcf7aa1d6172';
        const userId = '61ce3d57b025d444c98fb0f5'
        try{
            const res = await axios.post('/test/add_questionnaire_to_user', {
                questionnaireId, userId
            },{
                headers: {Authorization: token}
            })
            console.log(res.data.message)
        } catch(err){
            console.log(err.response.data.message)
        }
    }
    // addQuestionnaireToAdmin()

    return (
        <div className="login_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <h2>Nombre de cuestionario</h2>
            <form onSubmit={createQuestionnaire}>
                <div>
                    <label htmlFor="name">Nombre del cuestionario</label>
                    <input type="text" placeholder="Ingrese nombre de cuestionario" id="name"
                    value={name} name="name" onChange={handleChangeInput}></input>
                </div>
                <div>
                    <label htmlFor="totalAmount">Cantidad de total de respuestas (Opcional)</label>
                    <input type="text" placeholder="Ingrese cantidad de respuestas" id="totalAmount"
                    value={totalAmount} name="totalAmount" onChange={handleChangeInput}></input>
                </div>

                <div>
                    <label htmlFor="showedAmount">Cantidad a mostrar (Opcional)</label>
                    <input type="text" placeholder="Ingrese la cantidad a mostras" id="showedAmount"
                    value={showedAmount} name="showedAmount" onChange={handleChangeInput}></input>
                </div>

                <div className="row">
                    <button type="submit">Agregar cuestionario</button>
                    
                </div>
            </form>

        </div>
        
    )
}

export default ProfileAdmin
