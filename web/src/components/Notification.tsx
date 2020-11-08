import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'

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
}

const Notification: FC<INotification> = ({ from, status }) => {
    return (
        <FriendBox>
            <UserProfile />
            <UserDescription>
                <h3>{from.name}</h3>
                <p>{from.description}</p>
            </UserDescription>
            <section>
                <aside>
                    <FiCheckCircle size={25} color='green' />
                </aside>
                <aside>
                    <FiXCircle size={25} color='red' />
                </aside>
            </section>
        </FriendBox>
    )
}

export default Notification