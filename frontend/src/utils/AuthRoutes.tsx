import {Navigate, Outlet} from "react-router-dom"
import {useAuth} from "../context/AuthProvider"
import LoadingAnimation from "../component/general/LoadingAnimation"

export default function AuthRoutes() {
    const {user, loading} = useAuth()

    return loading ? <LoadingAnimation/> : (user ? <Navigate to={"/"}/> : <Outlet/>)
}