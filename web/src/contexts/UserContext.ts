import { createContext, Dispatch, SetStateAction } from 'react'

interface UserContext {
    id: number | undefined
    setId: Dispatch<SetStateAction<number | undefined>> | undefined
    name: string | undefined
    setName: Dispatch<SetStateAction<string | undefined>> | undefined
    email: string | undefined
    setEmail: Dispatch<SetStateAction<string | undefined>> | undefined
    description: string | undefined
    setDescription: Dispatch<SetStateAction<string | undefined>> | undefined
    avatar: string | undefined
    setAvatar: Dispatch<SetStateAction<string | undefined>> | undefined
    isAuth: boolean | undefined
    setIsAuth: Dispatch<SetStateAction<boolean | undefined>> | undefined
}

const UserContext = createContext<UserContext>({
    id: undefined,
    avatar: undefined,
    description: undefined,
    email: undefined,
    isAuth: undefined,
    name: undefined,
    setAvatar: undefined,
    setDescription: undefined,
    setIsAuth: undefined,
    setName: undefined,
    setEmail: undefined,
    setId: undefined
})

export default UserContext