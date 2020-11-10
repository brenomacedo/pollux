import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FiArrowRight } from 'react-icons/fi'
import api from '../api/api'
import UserContext from '../contexts/UserContext'
import { toast } from 'react-toastify'
import { DateTime } from 'luxon'

interface MessageProps {
    sent?: boolean
}

interface UserProfileProps {
    avatar: string
}

const Container = styled.div`
    
    min-height: 480px;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

const ChatBar = styled.div`
    height: 60px;
    background-color: #a1d0ff;
    padding: 10px;
    display: flex;
    align-items: center;

    h3 {
        font-family: var(--RW);
        margin-left: 10px;
    }
`

const ChatProfile = styled.div<UserProfileProps>`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: white;
    background-image: url('http://localhost:3333/files/${props => props.avatar}');
    background-position: center;
    background-size: contain;
`

const ChatMessage = styled.div`
    height: 50px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;

    input {
        height: 30px;
        width: calc(100% - 40px);
        border-radius: 50px;
        border: 1px solid #ccc;
        outline: none;
        font-family: var(--RW);
        padding-left: 10px;
        font-size: 17px;
    }

    button {
        height: 30px;
        width: 30px;
        background-color: #b1b0ff;
        border: 0;
        border-radius: 50px;
        outline: 0;
        cursor: pointer;
    }
`

const ChatBox = styled.div`
    height: calc(100vh - 110px);
    padding: 20px;
    overflow: auto;
`

const Message = styled.div<MessageProps>`
    background-color: ${props => props.sent ? '#00b7ff' : '#42caff'};
    position: relative;
    left: ${props => props.sent ? '30px' : '0'};
    width: calc(100% - 30px);
    padding: 10px;
    border-radius: 5px;
    font-family: var(--RW);
    margin-bottom: 10px;

    p {
        font-size: 10px;
    }
`

const NoChat = styled.div`
    align-self: center;
    margin-top: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
        width: 100px
    }

    h2 {
        margin-top: 25px;
        font-family: var(--RW);
        width: 350px;
        text-align: center;
    }
`

interface IUser {
    id: number
    name: string
    avatar: string
    description: string
}

interface IMessage {
    id: number
    content: string
    type: string
    createdAt: number
    userId: number
    destinataryId: number
}

interface ChatBoxComponent {
    user: IUser | undefined
    messages: IMessage[]
    setMessages: Dispatch<SetStateAction<IMessage[]>>
    socket: SocketIOClient.Socket
}



const ChatBoxComponent: FC<ChatBoxComponent> = ({ user, messages, setMessages, socket }) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const User = useContext(UserContext)

    const sendMessage = async () => {

        if(!inputRef.current?.value) {
            return
        }

        if(!user) {
            return
        }

        try {
            const newMessage = await api.post('/message', {
                type: "MESSAGE",
                content: inputRef.current.value,
                userId: User.id,
                destinataryId: user.id
            })

            setMessages([...messages, newMessage.data])

            inputRef.current.value = ''
            
            socket.emit('newMessage', newMessage.data)
        } catch(e) {
            toast.error('Ocorreu um erro ao enviar sua mensagem!')
        }
    }

    const renderMessages = () => {
        const userMessages = messages.filter(message => {
            return message.userId === user?.id || message.destinataryId === user?.id
        })
        return userMessages.map(message => {

            const date = DateTime.fromMillis(message.createdAt).setZone('America/Sao_Paulo')
            .setLocale('pt-BR').toLocaleString({
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })

            return (
                <Message key={message.id} sent={message.userId === User.id}>
                    <div>{message.content}</div>
                <p>{date.toString()}</p>
                </Message>
            )
        })
    }

    return (
        <Container>
            {user ? (<><ChatBar>
                <ChatProfile avatar={user.avatar} />
                <h3>{user.name}</h3>
            </ChatBar>
            <ChatBox>
                {renderMessages()}
            </ChatBox>
            <ChatMessage>
                <input ref={inputRef} type="text" placeholder="Write an message"/>
                <button onClick={sendMessage}>
                    <FiArrowRight size={12} color='white' />
                </button>
            </ChatMessage></>) : (
                <NoChat>
                    <img src="http://localhost:3333/files/default-avatar.png" alt="logo"/>
                    <h2>Nenhuma conversa selecionada</h2>
                </NoChat>
            )}
            
        </Container>
    )
}

export default ChatBoxComponent