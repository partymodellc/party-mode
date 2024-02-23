import {ReactNode, createContext, useContext, useEffect, useState} from 'react'
import {config} from '../config/Config'
import axios, {AxiosResponse} from "axios"
import {useNavigate} from "react-router-dom"

type Props = {
    children: ReactNode
}

export type IncomingUser = {
    id: string
    username: string
    email: string
    membership: string
    image: string
    likes: string[]
}

export type OutgoingUser = {
    username?: string
    password?: string
}

export type LoginCredentials = {
    email: string
    password: string
}

type authContextType = {
    user?: IncomingUser
    loading: boolean
    createUser: (username: string, email: string, password: string) => Promise<AxiosResponse<any, any>>
    updateUser: (user: OutgoingUser) => Promise<AxiosResponse<any, any>>
    login: (loginCredentials: LoginCredentials) => Promise<AxiosResponse<any, any>>
    logout: () => void
    likeEvent: (eventId: string) => Promise<AxiosResponse<any, any>>
    unlikeEvent: (eventId: string) => Promise<AxiosResponse<any, any>>
}

const authContextDefaultValues: authContextType = {
    user: undefined,
    loading: true,
    createUser: () => {
        return new Promise<any>(() => {
        })
    },
    updateUser: () => {
        return new Promise<any>(() => {
        })
    },
    login: () => {
        return new Promise<any>(() => {
        })
    },
    logout: () => {
    },
    likeEvent: () => {
        return new Promise<any>(() => {
        })
    },
    unlikeEvent: () => {
        return new Promise<any>(() => {
        })
    }
}

const AuthenticationContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
    return useContext(AuthenticationContext)
}

export function AuthProvider({children}: Props) {
    const navigate = useNavigate()
    const [user, setUser] = useState<IncomingUser>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        axios.get(`${config.backendBaseUri}/users/me`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
            .then(response => {
                setUser(response.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [setUser, setLoading])

    const createUser = (username: string, email: string, password: string) => {
        return axios.post(`${config.backendBaseUri}/auth/register`, {
            username: username,
            email: email,
            password: password
        })
    }

    const updateUser = (user: OutgoingUser) => {
        return axios.put(`${config.backendBaseUri}/users/me`, user, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    }

    const login = (loginCredentials: LoginCredentials) => {
        return axios.post(
            `${config.backendBaseUri}/auth/login`,
            JSON.stringify({
                email: loginCredentials.email,
                password: loginCredentials.password
            }),
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        )
    }

    const logout = () => {
        axios.get(`${config.backendBaseUri}/auth/logout`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
            .then(() => {
                navigate("/")
                navigate(0)
            })
    }

    const likeEvent = (eventId: string) => {
        return axios.post(
            `${config.backendBaseUri}/users/me/likes/${eventId}`,
            undefined,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        )
    }

    const unlikeEvent = (eventId: string) => {
        return axios.delete(
            `${config.backendBaseUri}/users/me/likes/${eventId}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        )
    }

    const value: authContextType = {
        user: user,
        loading: loading,
        createUser: createUser,
        updateUser: updateUser,
        login: login,
        logout: logout,
        likeEvent: likeEvent,
        unlikeEvent: unlikeEvent
    }

    return (
        <>
            <AuthenticationContext.Provider value={value}>
                {children}
            </AuthenticationContext.Provider>
        </>
    )
}

