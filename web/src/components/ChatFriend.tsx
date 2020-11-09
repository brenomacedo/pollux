import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'

interface UserProfileProps {
    avatar: string
}

const FriendBox = styled.div`
    width: 100%;
    height: 60px;
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    :hover {
        background-color: #cdcdcd;
    }

    section {
        margin-left: 110px;
        cursor: pointer;
    }
`

const UserProfile = styled.div<UserProfileProps>`
    width: 40px;
    height: 40px;
    border-radius: 25px;
    background-color: white;
    border: 1px solid #ccc;
    background-image: url('http://localhost:3333/files/${props => props.avatar}');
    background-position: center;
    background-size: contain;
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
    description: string
}

interface ChatFriendProps {
    friend: IUser
    setSelectedChat: Dispatch<SetStateAction<IUser | undefined>>
}

const ChatFriend: FC<ChatFriendProps> = ({ friend, setSelectedChat }) => {

    const changeSelectedChat = () => {
        setSelectedChat({
            id: friend.id,
            avatar: friend.avatar,
            description: friend.description,
            name: friend.name
        })
    }

    return (
        <FriendBox onClick={changeSelectedChat}>
            <UserProfile avatar={friend.avatar} />
            <UserDescription>
                <h3>{friend.name}</h3>
                <p>{friend.description}</p>
            </UserDescription>
        </FriendBox>
    )
}

export default ChatFriend