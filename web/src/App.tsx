import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'nprogress/nprogress.css'
import Routes from './routes'
import UserContext from './contexts/UserContext'

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

    const [id, setId] = useState<number>()
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [avatar, setAvatar] = useState<string>()
    const [isAuth, setIsAuth] = useState<boolean>()

    return (
        <UserContext.Provider value={{ avatar, description, id, name, setName, email, setAvatar,
        setIsAuth, isAuth, setDescription, setEmail, setId }}>
            <GlobalStyle />
            <ToastContainer />
            <Routes />
        </UserContext.Provider>
    )
}

export default App
