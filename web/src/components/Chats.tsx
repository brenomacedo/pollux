import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import Friend from './Friend'
import ChatFriend from './ChatFriend'

const Container = styled.div`
    min-height: 420px;
    height: calc(100vh - 60px);
`

const SearchBar = styled.div`
    height: 50px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;

    input {
        width: calc(100% - 40px);
        height: 30px;
        border-radius: 15px;
        border: 1px solid #ccc;
        outline: none;
        font-family: var(--RW);
        padding-left: 10px;
    }
    
    button {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #21d5db;
        border: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        outline: none;
    }
`

const FriendsList = styled.div`
    width: 100%;
    min-height: 370px;
    height: calc(100vh - 110px);
    overflow: auto;
`

interface IUser {
    id: number
    name: string
    avatar: string
    description: string
}

interface IFriend {
    friend: IUser
}

interface IChats {
    friends: IFriend[] | undefined
    setSelectedChat: Dispatch<SetStateAction<IUser | undefined>>
}

const Chats: FC<IChats> = ({ friends, setSelectedChat }) => {

    const renderFriends = () => {
        return friends?.map(friend => {
            return (
                <ChatFriend setSelectedChat={setSelectedChat} friend={friend.friend} />
            )
        })
    }

    return (
        <Container>
            <SearchBar>
                <input type="text" placeholder="Search your friends here" />
                <button><FiSearch size={12} color='white' /></button>
            </SearchBar>
            <FriendsList>
                {renderFriends()}
            </FriendsList>
        </Container>
    )
}

export default Chats