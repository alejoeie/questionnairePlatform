import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'

function EditUser() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [editUser, setEditUser] = useState([])

    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id) {
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true: false)
                }
            })
        }else{
            navigate('/profile')
        }
    }, [users, id, navigate])

  

    const handleUpdate = () => {
        try{
            if(num % 2 !== 0) {
            //se llama a una api que setee la nueva configuracion de usuarios
            }

        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }
    }

    const handleCheck= () => {
        setSuccess('')
        setErr('')
        setCheckAdmin(!checkAdmin)
        setNum(num+1)
    }
    return (
        <div className="profile_page edit_user">
            <div className="row">
                <button onClick={() => navigate(-1)} className="go_back">
                <i className="fas fa-long-arrow-alt-left"></i>Ir atras
                </button>
            </div>
             <div className="col-left">
                <h2>Editar Usuario</h2>

                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" defaultValue={editUser.name}
                    placeholder="Su nombre" disabled/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Nombre</label>
                    <input type="email" name="email" defaultValue={editUser.email}
                    placeholder="Su nombre" disabled/>
                </div>
                
              <div className="form-group">
                  <input type="checkbox" id="isAdmin" checked={checkAdmin}
                  onChange={handleCheck} />
                  <label htmlFor="isAdmin">isAdmin</label>

              </div>
                <button onClick={handleUpdate}>Actualizar informacion</button>
            </div>

            {err && showErrMsg(err)}
            {success & showSuccessMsg(success)}
        </div>
    )
}

export default EditUser
