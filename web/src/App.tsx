import React from 'react'
import { createGlobalStyle } from 'styled-components'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Success from './pages/ResetPasswordSuccess'

const GlobalStyle = createGlobalStyle`
    :root {
        --RW: 'Raleway', sans-serif;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`

function App() {
    return (
        <>
            <GlobalStyle />
            <Success />
        </>
    )
}

export default App
