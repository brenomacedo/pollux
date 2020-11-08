import React, { Dispatch, FC, SetStateAction, useContext } from 'react'
import styled from 'styled-components'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'
import api from '../api/api'
import UserContext from '../contexts/UserContext'
import { AxiosError } from 'axios'

const FriendBox = styled.div`
    width: 100%;
    height: 60px;
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    section {
        display: flex;
        margin-left: 80px;
        width: 55px;
        justify-content: space-between;
    }

    section aside {
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

interface INotificationRaw {
    status: string
    from: {
        id: number
        name: string
        avatar: string
        description: string | null
    }
}


interface INotification {
    status: string
    from: {
        id: number
        name: string
        avatar: string
        description: string | null
    }
    setNotifications: Dispatch<SetStateAction<INotificationRaw[] | undefined>>
    notifications: INotificationRaw[]
}

const Notification: FC<INotification> = ({ from, status, setNotifications, notifications }) => {

    const User = useContext(UserContext)

    const acceptReq = async () => {
        try {
            await api.post('/friend', {
                userId: from.id,
                userId2: User.id
            })

            toast.success('Solicitação aceita!')

            const newNotifications = notifications.filter(not => not.from !== from)
            setNotifications(newNotifications)
        } catch(e) {
            const errors = e as AxiosError
            if(!errors.response) {
                return toast.error('Ocorreu um erro ao aceitar')
            }

            errors.response.data.errors.forEach((err: string) => {
                toast.error(err)
            })
        }
    }

    const refuseReq = async () => {
        try {
            await api.delete(`/request/${from.id}/${User.id}`)
            toast.success('Solicitação recusada!')
            const newNotifications = notifications.filter(not => not.from !== from)
            setNotifications(newNotifications)
        } catch(e) {
            const error = e as AxiosError
            if(!error.response) {
                return toast.error('Ocorreu um erro ao recusar')
            }

            error.response.data.errors.forEach((err: string) => {
                return toast.error(err)
            })
        }
    }

    return (
        <FriendBox>
            <UserProfile />
            <UserDescription>
                <h3>{from.name}</h3>
                <p>{from.description}</p>
            </UserDescription>
            <section>
                <aside onClick={acceptReq} >
                    <FiCheckCircle size={25} color='green' />
                </aside>
                <aside onClick={refuseReq}>
                    <FiXCircle size={25} color='red' />
                </aside>
            </section>
        </FriendBox>
    )
}

export default Notification