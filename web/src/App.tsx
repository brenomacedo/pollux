import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Routes from './routes'

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
            <Routes />
        </>
    )
}

export default App
