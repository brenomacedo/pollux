import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import animationData from '../animations/star.json'


const Container = styled.div`
    min-height: 100vh;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(45deg, rgba(16,131,93, 0.5) 0%, rgba(16,131,93, 0.5) 5%,transparent 5%, transparent 38%,transparent 38%, transparent 60%,rgba(7,146,92, 0.5) 60%, rgba(7,146,92, 0.5) 100%),linear-gradient(135deg, rgb(1,172,100) 0%, rgb(1,172,100) 14%,rgb(1,189,105) 14%, rgb(1,189,105) 75%,rgb(9,158,100) 75%, rgb(9,158,100) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));

    h2 {
        font-family: var(--RW);
        color: white;
        font-size: 25px;
    }

    p {
        margin-top: 15px;
        color: white;
        font-size: 20px;
        font-family: var(--RW);
    }

    button {
        width: 350px;
        height: 50px;
        background-color: #18d6d6;
        color: white;
        border-radius: 8px;
        border: 0;
        font-family: var(--RW);
        margin-top: 20px;
        outline: 0;
        cursor: pointer;
        transition: 0.5s;
    }

    button:hover {
        background-color: #cfff70;
    }
`

const Success = () => {
    

    return (
        <Container>
            <Lottie options={{
                animationData,
                autoplay: true,
                loop: true
            }} width={400} height={400}/>

            <h2>Success!</h2>

            <p>You account was created!</p>

            <button>Back to login</button>
        </Container>
    )
}

export default Success