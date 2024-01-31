import {Outlet, useLocation, Navigate} from "react-router-dom"
import {useAuth} from "../context/AuthProvider"
import {useEffect, useState} from "react"
import LoadingAnimation from "../component/general/LoadingAnimation";

export default function PrivateRoutes() {
    const {getUser} = useAuth()
    const location = useLocation()
    const [user, setUser] = useState<any>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        getUser()
            .then(response => {
                setUser(response.data)
                setLoaded(true)
            })
            .catch(error => {
                if (error.response.status == 401) {
                    setLoaded(true)
                }
            })
    }, [setUser, setLoaded])

    return (
        !loaded ? <LoadingAnimation/> : (user ? <Outlet/> :
            <Navigate to={`login?redirectTo=${encodeURIComponent(location.pathname)}`}/>)
    )
}