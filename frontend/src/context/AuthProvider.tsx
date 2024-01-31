import {ReactNode, createContext, useContext} from 'react'
import {config} from '../config/Config'
import axios, {AxiosResponse} from "axios"
import {useNavigate} from "react-router-dom";

type Props = {
    children: ReactNode
}

type authContextType = {
    getUser: () => Promise<AxiosResponse<any, any>>
    login: (email: string, password: string) => Promise<AxiosResponse<any, any>>
    logout: () => void
}

const authContextDefaultValues: authContextType = {
    getUser: () => {
        return new Promise<any>(() => {
        })
    },
    login: () => {
        return new Promise<any>(() => {
        })
    },
    logout: () => {
    }
}

const AuthenticationContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
    return useContext(AuthenticationContext)
}

export function AuthProvider({children}: Props) {
    const navigate = useNavigate()

    const getUser = () => {
        return axios.get(`${config.backendBaseUri}/users/me`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    }

    const login = (email: string, password: string) => {
        return axios.post(`${config.backendBaseUri}/auth/login`, JSON.stringify({email: email, password: password}), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
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

    const value: authContextType = {
        getUser: getUser,
        login: login,
        logout: logout
    }

    return (
        <>
            <AuthenticationContext.Provider value={value}>
                {children}
            </AuthenticationContext.Provider>
        </>
    )
}

