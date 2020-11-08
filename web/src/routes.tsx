import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import api from './api/api'
import UserContext from './contexts/UserContext'
import Chat from './pages/Chat'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterSuccess from './pages/RegisterSuccess'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordSuccess from './pages/ResetPasswordSuccess'

const Routes = () => {

    interface IUser {
        id: number
        name: string
        email: string
        description: string
        avatar: string
    }

    const User = useContext(UserContext)

    useEffect(() => {
        if(localStorage.getItem('token')) {
            api.get<IUser>('/user/verify', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }).then(res => {
                User.setId && User.setId(res.data.id)
                User.setName && User.setName(res.data.name)
                User.setEmail && User.setEmail(res.data.email)
                User.setDescription && User.setDescription(res.data.description)
                User.setAvatar && User.setAvatar(res.data.avatar)
                User.setIsAuth && User.setIsAuth(true)
            }).catch(err => {
                alert('erro')
            })
        } else {
        }
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path='/' exact />
                <Route component={Register} path='/register' exact />
                <Route component={ForgotPassword} path='/forgot-password' exact />
                <Route component={ResetPassword} path='/reset-password' exact />
                <Route component={ResetPasswordSuccess} path='/reset-password/success' exact />
                <Route component={RegisterSuccess} path='/register/success' exact />
                {User.isAuth && (
                    <Route component={Chat} path='/chat' exact />
                )}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes