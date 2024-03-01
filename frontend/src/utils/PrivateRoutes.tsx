import {Outlet, useLocation, Navigate} from "react-router-dom"
import {useAuth} from "../context/AuthProvider"
import LoadingAnimation from "../component/general/LoadingAnimation"

export default function PrivateRoutes() {
    const {user, loading} = useAuth()
    const location = useLocation()

    return (
        loading ? <LoadingAnimation/> :
            (user ? <Outlet/> : <Navigate to={`login?redirectTo=${encodeURIComponent(location.pathname)}`}/>)
    )
}