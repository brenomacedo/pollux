import React, { FC, useContext } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import api from '../api/api'
import UserContext from '../contexts/UserContext'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

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

    const User = useContext(UserContext)

    const createRequest = async () => {
        try {
            await api.post('/request', {
                userId: User.id,
                userId2: id
            })

            toast.success('Solicitação enviada!')
        } catch(e) {
            const errors = e as AxiosError
            if(!errors.response) {
                return toast.error('Ocorreu um erro ao enviar a solicitação')
            }

            errors.response.data.errors.forEach((err: string) => {
                toast.error(err)
            })
        }
    }

    return (
        <FriendBox>
            <UserProfile avatar={avatar} />
            <UserDescription>
                <h3>{name}</h3>
                <p>{description}</p>
            </UserDescription>
            <section onClick={createRequest}>
                <FiPlus size={25} color='black' />
            </section>
        </FriendBox>
    )
}

export default Friend