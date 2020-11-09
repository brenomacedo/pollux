import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaUserFriends, FaDoorOpen, FaSearch, FaBell } from 'react-icons/fa'
import SearchFriends from '../components/SearchFriends'
import Chats from '../components/Chats'
import Notifications from '../components/Notifications'
import ChatBoxComponent from '../components/ChatBoxComponent'
import UserContext from '../contexts/UserContext'
import { useHistory } from 'react-router-dom'
import { render } from 'nprogress'
import Axios from 'axios'
import api from '../api/api'

const Container = styled.div`
    min-height: 480px;
    height: 100vh;
    min-width: 720px;
    width: 100vw;
    background-color: #e8e8e8;
    display: flex;
    flex-direction: row;
`

const Friends = styled.div`
    width: 350px;
    min-height: 480px;
    height: 100vh;
`

const ChatBox = styled.div`
    flex: 1;
    min-height: 480px;
    height: 100vh;
    border-left: 1px solid #ccc;
`

const UserBar = styled.div`
    background-color: #b1b0ff;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 10px;
    align-items: center;
    position: relative;

    p {
        color: #01004d;
        font-family: var(--RW);
        font-weight: bold;
        margin-left: 15px;
    }

    aside {
        position: absolute;
        right: 20px;
        width: 100px;
        display: flex;
        justify-content: space-between;
    }

    aside * {
        cursor: pointer;
    }
`

const UserProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: white;
    background-image: url('${'http://localhost:3333/files/default-avatar.png'}');
    background-position: center;
    background-size: contain;
    border: 1px solid #ccc;
`

const Chat = () => {

    interface INotification {
        status: string
        from: {
            id: number
            name: string
            avatar: string
            description: string | null
        }
    }
    
    interface IFriend {
        friend: IUser
    }

    interface IUser {
        id: number
        name: string
        avatar: string
        description: string
    }

    const User = useContext(UserContext)

    const [bar, setBar] = useState<'notifications' | 'chats' | 'search'>('chats')
    const [notifications, setNotifications] = useState<INotification[]>()
    const [selectedChat, setSelectedChat] = useState<IUser>()
    const [friends, setFriends] = useState<IFriend[]>()

    useEffect(() => {
        (async () => {
            const notifications = await api.get(`/request/${User.id}`)
            setNotifications(notifications.data)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const friends = await api.get(`/friend/${User.id}`)
            setFriends(friends.data)
        })()
    }, [])

    const { push } = useHistory()

    const logout = () => {
        localStorage.clear()
        User.setIsAuth && User.setIsAuth(false)
        User.setAvatar && User.setAvatar(undefined)
        User.setDescription && User.setDescription(undefined)
        User.setEmail && User.setEmail(undefined)
        User.setId && User.setId(undefined)
        User.setName && User.setName(undefined)
        push('/')
    }

    const toggleBar = (bar: 'notifications' | 'chats' | 'search') => {
        setBar(bar)
    }

    const renderBar = () => {
        if(bar === 'chats')
            return <Chats setSelectedChat={setSelectedChat} friends={friends} />

        if(bar === 'notifications')
            return <Notifications notifications={notifications}
            setNotifications={setNotifications} />

        if(bar === 'search')
            return <SearchFriends />
    }

    return (
        <Container>
            <Friends>
                <UserBar>
                    <UserProfile />
                    <p>{User.name}</p>
                    <aside>
                        <FaUserFriends onClick={() => toggleBar('chats')}
                        size={20} color={bar === 'chats' ? '#fff' : '#01004d'} />
                        <FaBell onClick={() => toggleBar('notifications')}
                        size={20} color={bar === 'notifications' ? '#fff' : '#01004d'} />
                        <FaSearch onClick={() => toggleBar('search')}
                        size={20} color={bar === 'search' ? '#fff' : '#01004d'} />
                        <FaDoorOpen onClick={logout} size={20} color='#01004d' />
                    </aside>
                </UserBar>
                {renderBar()}
            </Friends>
            <ChatBox>
                <ChatBoxComponent user={selectedChat} />
            </ChatBox>
        </Container>
    )
}

export default Chat