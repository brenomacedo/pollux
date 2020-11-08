import React, { FormEvent, useContext, useState } from 'react'
import styled from 'styled-components'
import { FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import Star from '../images/star.svg'
import NProgress from 'nprogress'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import api from '../api/api'
import { AxiosError } from 'axios'
import UserContext from '../contexts/UserContext'

interface MarkerProps {
    active: boolean
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
`

const LeftSide = styled.div`
    min-height: 100vh;
    flex: 1;
    background-color: blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(135deg, transparent 0%, transparent 26%,rgba(19, 135, 203,0.6) 26%, rgba(19, 135, 203,0.6) 72%,transparent 72%, transparent 82%,rgba(6, 156, 244,0.6) 82%, rgba(6, 156, 244,0.6) 100%),linear-gradient(45deg, transparent 0%, transparent 4%,rgb(19, 135, 203) 4%, rgb(19, 135, 203) 22%,rgb(45, 92, 120) 22%, rgb(45, 92, 120) 60%,transparent 60%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));

    img {
        width: 120px;
        height: 120px;
    }

    p {
        font-family: var(--RW);
        font-size: 20px;
        margin-top: 20px;
        color: white;
        font-weight: bold;
    }

    @media (max-width: 600px) {
        display: none;
    }
`

const RightSide = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #e6fbff;

    form {
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    p {
        font-family: var(--RW);
        margin-top: 10px;
        user-select: none;
        cursor: pointer;
    }

    h1 {
        font-family: var(--RW);
    }

    input {
        width: 100%;
        margin-top: 10px;
        height: 50px;
        outline: none;
        font-family: var(--RW);
        border-radius: 8px;
        border: 1px solid #ccc;
        padding-left: 12px;
        font-size: 20px;
    }

    button {
        background-color: #00ffdd;
        outline: none;
        border: 0;
        width: 100%;
        margin-top: 10px;
        height: 50px;
        border-radius: 8px;
        cursor: pointer;
        font-family: var(--RW);
        color: white;
        font-size: 20px;
        user-select: none;
    }

    button:hover {
        background-color: #00ffef;
    }

    @media (max-width: 600px) {
        width: 100vw;
    }
`

const LoginOptions = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--RW);

    p {
        user-select: none;
        cursor: initial;
    }
`

const Marker = styled.div<MarkerProps>`
    background-color: ${props => props.active ? 'lightgreen' : 'white'};
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #ccc;
`

const IPassContainer = styled.div`
    width: 100%;
    position: relative;
`

const Icon = styled.div`
    position: absolute;
    right: 20px;
    top: 26px;
    cursor: pointer;
`

const Login = () => {

    interface IUser {
        id: number
        name: string
        description: string
        avatar: string
        email: string
    }

    interface IResponse {
        user: IUser
        token: string
    }

    const [remember, setRemember] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(false)

    const User = useContext(UserContext)

    const buttonDisabled = (!email || !password) || disabled

    const submit = async (e: FormEvent) => {
        e.preventDefault()

        NProgress.start()
        setDisabled(true)

        try {
            const user = await api.post<IResponse>('/user/auth', {
                email, password
            })

            if(remember) {
                localStorage.setItem('token', `${user.data.token}`)
            }

            

            NProgress.done()
        } catch (e) {
            const error = e as AxiosError
            if(!error.response) {
                return toast.error('Ocorreu um erro inesperado, tente novamente mais tarde')
            }

            error.response.data.errors.forEach((error: string) => {
                toast.error(error)
            })

            NProgress.done()
            setDisabled(false)
        }
    }

    const { push } = useHistory()

    return (
        <Container>
            <LeftSide>
                <img src={Star} alt="logo"/>
                <p>Pollux</p>
            </LeftSide>
            <RightSide>
                <form onSubmit={submit}>
                    <h1>Login</h1>
                    <input value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Your email" type="email"/>
                    <IPassContainer>
                        <input value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="Your password"
                        type={passwordVisible ? "text" : "password"}/>
                        {passwordVisible ? (<Icon onClick={() => setPasswordVisible(false)}>
                            <FiEye size={20} color='black' />
                        </Icon>) : (<Icon onClick={() => setPasswordVisible(true)}>
                            <FiEyeOff size={20} color='black' />
                        </Icon>)}
                    </IPassContainer>
                    <LoginOptions>
                        <Marker active={remember} onClick={() => setRemember(!remember)}
                        ><FiCheck size={15} color='white' /></Marker>
                        <p>Remember-me</p>
                    </LoginOptions>
                    <button style={buttonDisabled ?{
                        backgroundColor: '#ccc',
                        cursor: 'initial'
                    } : {}} disabled={buttonDisabled} type="submit">Login</button>
                    <p onClick={() => push('/forgot-password')}>I forgot my password</p>
                    <p onClick={() => push('/register')}>I don't have an account</p>
                </form>
            </RightSide>
        </Container>
    )    
}

export default Login