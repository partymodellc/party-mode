import {Navigate, Outlet} from "react-router-dom"
import {useAuth} from "../context/AuthProvider"
import {useEffect, useState} from "react"
import LoadingAnimation from "../component/general/LoadingAnimation";

export default function AuthRoutes() {
    const {getUser} = useAuth()
    const [user, setUser] = useState<any>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        getUser()
            .then(response => {
                setUser(response.data)
                setLoaded(true)
            })
            .catch(() => {
                setLoaded(true)
            })
    }, [])

    return (
        !loaded ? <LoadingAnimation/> : (user ? <Navigate to={"/"}/> : <Outlet/>)
    )
}