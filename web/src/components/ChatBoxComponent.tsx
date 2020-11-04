import React from 'react'
import styled from 'styled-components'
import { FiArrowRight } from 'react-icons/fi'

const Container = styled.div`
    min-height: 480px;
    height: 100vh;
`

const ChatBar = styled.div`
    height: 60px;
    background-color: #a1d0ff;
    padding: 10px;
    display: flex;
    align-items: center;

    h3 {
        font-family: var(--RW);
        margin-left: 10px;
    }
`

const ChatProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: white;
`

const ChatMessage = styled.div`
    height: 50px;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    input {
        height: 30px;
        width: calc(100% - 40px);
        border-radius: 50px;
        border: 1px solid #ccc;
        outline: none;
        font-family: var(--RW);
        padding-left: 10px;
        font-size: 17px;
    }

    button {
        height: 30px;
        width: 30px;
        background-color: #b1b0ff;
        border: 0;
        border-radius: 50px;
        outline: 0;
        cursor: pointer;
    }
`

const ChatBox = styled.div`
    height: calc(100vh - 110px);
    background-color: red;
`

const ChatBoxComponent = () => {
    return (
        <Container>
            <ChatBar>
                <ChatProfile />
                <h3>Breno Macêdo</h3>
            </ChatBar>
            <ChatBox>

            </ChatBox>
            <ChatMessage>
                <input type="text" placeholder="Write an message"/>
                <button>
                    <FiArrowRight size={12} color='white' />
                </button>
            </ChatMessage>
        </Container>
    )
}

export default ChatBoxComponent