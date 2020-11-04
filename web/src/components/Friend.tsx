import React from 'react'
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

const Friend = () => {
    return (
        <FriendBox>
            <UserProfile />
            <UserDescription>
                <h3>Breno Macêdo</h3>
                <p>Descrição do meu perfil</p>
            </UserDescription>
            <section>
                <FiPlus size={25} color='black' />
            </section>
        </FriendBox>
    )
}

export default Friend