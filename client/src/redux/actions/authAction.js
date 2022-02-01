import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('/user/user_info', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.user.role === 1 ? true : false
        }
    }
}


export const dispatchQuestionnaires = async (token) => {
    const res = await axios.get('/test/get_questionnaires', {
        headers : {Authorization: token}
    })
    return res 
}

export const dispatchGetQuestionnaires = (res) => {
    return {
        type: ACTIONS.GET_QUESTIONNAIRES,
        payload: res.data
    }
}

export const fetchCuestionarios = async () => {
    const res = await axios.get('/test/get_questionnaires')
    return res
}

export const dispatchCuestionarios = (res) => {
    return {
        type: ACTIONS.GET_QUESTIONNAIRES,
        payload: res.data
    }
}