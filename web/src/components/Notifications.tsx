import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import Friend from './Friend'
import Notification from './Notification'

const Container = styled.div`
    min-height: 420px;
    height: calc(100vh - 60px);
`

const SearchBar = styled.div`
    height: 50px;
    padding: 10px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ccc;

    h3 {
        font-family: var(--RW);
    }
`

const FriendsList = styled.div`
    width: 100%;
    min-height: 370px;
    height: calc(100vh - 110px);
    overflow: auto;
`

interface INotification {
    status: string
    from: {
        id: number
        name: string
        avatar: string
        description: string | null
    }
}

interface IUser {
    id: number
    name: string
    avatar: string
    description: string
}

interface IFriend {
    friend: IUser
}

interface NotificationsProps {
    notifications: INotification[] | undefined
    setNotifications: Dispatch<SetStateAction<INotification[] | undefined>>
    setFriends: Dispatch<SetStateAction<IFriend[] | undefined>>
    friends: IFriend[] | undefined
}

const Notifications: FC<NotificationsProps> = ({ notifications, setNotifications, setFriends, friends }) => {

    const renderNotifications = () => {
        return notifications?.map(notification => {
            return <Notification notifications={notifications} setFriends={setFriends}
            setNotifications={setNotifications} {...notification} friends={friends} />
        })
    }

    return (
        <Container>
            <SearchBar>
                <h3>Friend requests:</h3>
            </SearchBar>
            <FriendsList>
                {renderNotifications()}
            </FriendsList>
        </Container>
    )
}

export default Notifications