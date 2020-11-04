import React from 'react'
import styled from 'styled-components'
import { FaUserFriends, FaDoorOpen } from 'react-icons/fa'
import SearchFriends from '../components/SearchFriends'
import Chats from '../components/Chats'
import Notifications from '../components/Notifications'

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
    background-color: blue;
    min-height: 480px;
    height: 100vh;
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
        cursor: pointer;
        width: 50px;
        display: flex;
        justify-content: space-between;
    }
`

const UserProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: white;
    border: 1px solid #ccc;
`

const Chat = () => {
    return (
        <Container>
            <Friends>
                <UserBar>
                    <UserProfile />
                    <p>Breno Macêdo</p>
                    <aside>
                        <FaUserFriends size={20} color='#01004d' />
                        <FaDoorOpen size={20} color='#01004d' />
                    </aside>
                </UserBar>
                <Notifications />
            </Friends>
            <ChatBox>

            </ChatBox>
        </Container>
    )
}

export default Chat