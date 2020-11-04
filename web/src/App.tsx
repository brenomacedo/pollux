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

    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-track {
        background: #ccc;
    }
    ::-webkit-scrollbar-thumb {
        background: #888;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
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
