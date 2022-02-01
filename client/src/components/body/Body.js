import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import ActivationEmail from './auth/ActivationEmail';
import NotFound from '../utils/NotFound/NotFound';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Profile from './profile/Profile';
import {useSelector} from 'react-redux'
import ProfileAdmin from './profile/ProfileAdmin';
import EditUser from './profile/EditUser';
import Questions from './questions/Questions'
import Questionnaire from './questions/Questionnaire';
import TestQuestion from './questions/testQuestion';
import Home from '../home/Home';
import AddQuestions from './questions/addQuestions';

function Body() {

    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={isLogged ? <NotFound /> : <Login />} exact />
                <Route path="/register" element={isLogged ? <NotFound /> : <Register />} exact />
                <Route path="/forgot_pwd" element={isLogged ? <NotFound /> : <ForgotPassword />} exact />
                <Route path="/user/reset/:token" element={isLogged ? <ResetPassword /> : <NotFound /> } exact />
                <Route path="/profile" element={isLogged ? <Profile /> : <NotFound />} exact />
                <Route path="/questions" element={isLogged ? <Questions /> : <NotFound/>} exact />
                <Route path="/edit_user/:id" element={isAdmin ? <EditUser /> : <NotFound />} exact />
                <Route path="/questionnaire" element={isLogged ? <Questionnaire /> : <NotFound />} exact />
                <Route path="/profile_admin" element={isAdmin ? <ProfileAdmin /> : <NotFound />} exact />
                <Route path="/test_question" element={isLogged ? <TestQuestion /> : <NotFound />} exact />
                <Route path="/add_questions" element={isLogged ? <AddQuestions /> : <NotFound />} exact />

                <Route path="/user/activate/:activation_token" element={<ActivationEmail/>} exact /> {/* si falla, es cambiar activation por activate */}

            </Routes>
        </section>
    )
}

export default Body
