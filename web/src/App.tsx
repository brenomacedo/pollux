import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'nprogress/nprogress.css'
import Routes from './routes'

toast.configure({
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
})

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
            <ToastContainer />
            <Routes />
        </>
    )
}

export default App
