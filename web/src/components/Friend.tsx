import React, { FC } from 'react'
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
    background-position: center;
    background-size: contain;
    background-image: url('http://localhost:3333/files/${props => props.avatar}');
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

const Friend: FC<IUser> = ({ name, avatar, description, id, email }) => {
    return (
        <FriendBox>
            <UserProfile avatar={avatar} />
            <UserDescription>
                <h3>{name}</h3>
                <p>{description}</p>
            </UserDescription>
            <section>
                <FiPlus size={25} color='black' />
            </section>
        </FriendBox>
    )
}

export default Friend