import { ReactNode, FC, createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { config } from '../config/Config';

type User = {
    picture: string
    username: string
    email: string
}
type authContextType = {
    user: User
    login: () => void;
    logout: () => void;
    getUserData: () => void;
};
const authContextDefaultValues: authContextType = {
    user: {
        picture: "",
        username: "",
        email: ""
    },
    login: () => {
    },
    logout: () => {
    },
    getUserData: () => {
    }
};

type Props = {
    children: ReactNode;
};

const AuthenticationContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthenticationContext);
}

export function AuthProvider({ children }: Props) {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);

    const getUserData = async () => {
        const headers: HeadersInit = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
        }

        const response = await fetch(`${config.backendBaseUri}/user/me`, {
            method: "GET",
            credentials: "include",
            headers: headers,
        });

        const data = await response.json();
        setUser(data);
    }


    useEffect(() => {
        getUserData();
    }, [])

    const login = async () => {
        await getUserData()
    };

    const logout = async () => {
        const headers: HeadersInit = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
        }

        await fetch(`${config.backendBaseUri}/auth/logout`, {
            method: "GET",
            credentials: "include",
            headers: headers,
        });
        setUser(null)
        navigate("/");
    };

    const value: authContextType = {
        user: user!,
        login: login,
        logout: logout,
        getUserData: getUserData
    };

    return (
        <>
            <AuthenticationContext.Provider value={value}>
                {children}
            </AuthenticationContext.Provider>
        </>
    );
}

