import {ReactNode, FC, createContext, useContext, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";

type User = {
    picture: string
    username: string
    email: string
}
type authContextType = {
    user: User
    login: () => void;
    logout: () => void;
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
};

type Props = {
    children: ReactNode;
};

const AuthenticationContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthenticationContext);
}

export function AuthProvider({children}: Props) {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const getUserData = async () => {
            const headers: HeadersInit = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
            }

            const response = await fetch('http://localhost:8000/auth/login/success', {
                method: "GET",
                credentials: "include",
                headers: headers,
            });
            console.log("Response,", response);

            const data = await response.json();
            console.log("After Fetch,", data);
            setUser(data);
        }

        getUserData();

    }, [])

    const login = () => {
        setUser({
            picture: "",
            username: "",
            email: ""
        });

    };

    const logout = async () => {
        const headers: HeadersInit = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
        }

        await fetch('http://localhost:8000/api/users/logout', {
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
    };
    console.log("ALL User Data => ", user)

    return (
        <>
            <AuthenticationContext.Provider value={value}>
                {children}
            </AuthenticationContext.Provider>
        </>
    );
}

