import React, { FC, useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import Friend from './Friend'
import api from '../api/api'
import UserContext from '../contexts/UserContext'

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

interface ISearch {
    socket: SocketIOClient.Socket
}

const SearchFriends: FC<ISearch> = ({ socket }) => {

    interface IUser {
        id: number
        name: string
        avatar: string
        description: string
    }

    const [search, setSearch] = useState<IUser[]>([])
    const searchRef = useRef<HTMLInputElement>(null)
    const User = useContext(UserContext)

    const handleSearch = async () => {
        if(searchRef.current?.value) {
            const users = await api.get(`/user/search?search=${searchRef.current.value}&id=${User.id}`)
            setSearch(users.data)
        }
    }

    const renderFriends = () => {
        return search.map(user => {
            return <Friend socket={socket} key={user.id} {...user} />
        })
    }

    return (
        <Container>
            <SearchBar>
                <input ref={searchRef} type="text" placeholder="Search profiles here" />
                <button onClick={handleSearch}><FiSearch size={12} color='white' /></button>
            </SearchBar>
            <FriendsList>
                {renderFriends()}
            </FriendsList>
        </Container>
    )
}

export default SearchFriends