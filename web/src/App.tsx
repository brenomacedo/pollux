import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Login from './pages/Login'
import Register from './pages/Register'

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
            <Register />
        </>
    )
}

export default App
