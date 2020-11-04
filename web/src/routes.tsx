import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Chat from './pages/Chat'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterSuccess from './pages/RegisterSuccess'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordSuccess from './pages/ResetPasswordSuccess'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path='/' exact />
                <Route component={Register} path='/register' exact />
                <Route component={ForgotPassword} path='/forgot-password' exact />
                <Route component={ResetPassword} path='/reset-password' exact />
                <Route component={ResetPasswordSuccess} path='/reset-password/success' exact />
                <Route component={RegisterSuccess} path='/register/success' exact />
                <Route component={Chat} path='/chat' exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes