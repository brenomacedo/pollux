import React, { FC } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'

const FriendBox = styled.div`
    width: 100%;
    height: 60px;
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    section {
        margin-left: 110px;
        cursor: pointer;
    }
`

const UserProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 25px;
    background-color: white;
    border: 1px solid #ccc;
`

const UserDescription = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    font-family: var(--RW);

    h2 {
        font-size: 15px;
    }

    p {
        font-size: 12px;
    }
`

interface IUser {
    id: number
    name: string
    avatar: string
    email: string
    description: string
}

interface ChatFriendProps {
    friend: IUser
}

const ChatFriend: FC<ChatFriendProps> = ({ friend }) => {
    return (
        <FriendBox>
            <UserProfile />
            <UserDescription>
                <h3>{friend.name}</h3>
                <p>{friend.description}</p>
            </UserDescription>
        </FriendBox>
    )
}

export default ChatFriend