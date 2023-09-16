import {lazy, Suspense} from "react"
import {Navigate, Route, Routes, useRoutes} from "react-router-dom"
import EventDescriptions from "./pages/EventDescriptions"
import LoadingAnimation from "./component/General/LoadingAnimation"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import {useAuth} from "./context/AuthProvider"

const Events = lazy(() => import("./pages/Events"))
const Event = lazy(() => import("./component/EventsDashboard/Event"))
const Login = lazy(() => import("./component/Authentication/Login"))
const Signup = lazy(() => import("./component/Authentication/Signup"))
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"))
const SubscriptionAndPricing = lazy(() => import("./pages/SubscriptionAndPricing"))
const ContactUs = lazy(() => import("./pages/ContactUs"))
const HelpSub = lazy(() => import("./pages/HelpSub"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Likes = lazy(() => import("./pages/Likes"))
const Ticket = lazy(() => import("./pages/Ticket"))
const TicketVerifiedEmail = lazy(() => import("./pages/TicketVerifiedEmail"))
const CreatorDashboard = lazy(() => import("./pages/CreatorDashboard"))
const EventsDashboard = lazy(() => import("./pages/EventsDashboard"))
const Orders = lazy(() => import("./component/EventsDashboard/Orders"))
const ReportAnalysis = lazy(() => import("./pages/ReportAnalysis"))
const InvoiceAndBilling = lazy(() => import("./pages/InvoiceAndBilling"))
const Setting = lazy(() => import("./pages/Setting"))
const ProfileEdit = lazy(() => import("./component/Setting/ProfileEdit"))
const InviteTeam = lazy(() => import("./component/Setting/InviteTeam"))
const AppInstallation = lazy(() => import("./component/Setting/AppInstallation"))
const Interests = lazy(() => import("./component/Authentication/Interests"))
const CreateEvent = lazy(() => import("./pages/CreateEvent"))
const BasicInfo = lazy(() => import("./component/CreateEvent/BasicInfo"))
const Detail = lazy(() => import("./component/CreateEvent/Detail"))
const OnlinePageEvent = lazy(() => import("./component/CreateEvent/OnlinePageEvent"))
const CreateTicket = lazy(() => import("./component/CreateEvent/CreateTicket"))
const Publish = lazy(() => import("./component/CreateEvent/Publish"))
const Community = lazy(() => import("./pages/Community"))
const Community2 = lazy(() => import("./pages/Community2"))

function App() {
    const {user} = useAuth()

    let routes = useRoutes([
        {
            path: "/",
            element: user ?
                (
                    <Navigate to="/dashboard"/>
                ) :
                (
                    <Suspense fallback={<LoadingAnimation/>}><Events/></Suspense>
                )
        },
        {
            path: "/event-description/:eventID",
            element: <Suspense fallback={<LoadingAnimation/>}><EventDescriptions/></Suspense>
        },
        {
            path: "/login",
            element: user ?
                (
                    <Navigate to="/dashboard"/>
                ) :
                (
                    <Suspense fallback={<LoadingAnimation/>}><Login/></Suspense>
                )
        },
        {
            path: "/signup",
            element: user ?
                (
                    <Navigate to="/dashboard"/>
                ) :
                (
                    <Suspense fallback={<LoadingAnimation/>}><Signup/></Suspense>
                )
        },
        {
            path: "/payment-success",
            element: user ?
                (
                    <Navigate to="/dashboard"/>
                ) :
                (
                    <Suspense fallback={<LoadingAnimation/>}><PaymentSuccess/></Suspense>
                )
        },
        {
            path: "/interests",
            element: <Suspense fallback={<LoadingAnimation/>}><Interests/></Suspense>
        },
        {
            path: "/subscription-and-pricing",
            element: <Suspense fallback={<LoadingAnimation/>}><SubscriptionAndPricing/></Suspense>
        },
        {
            path: "/contact-us",
            element: <Suspense fallback={<LoadingAnimation/>}><ContactUs/></Suspense>
        },
        {
            path: "/community",
            element: <Suspense fallback={<LoadingAnimation/>}><Community/></Suspense>
        },
        {
            path: "/community-join",
            element: <Suspense fallback={<LoadingAnimation/>}><Community2/></Suspense>
        },
        {
            path: "/help-sub",
            element: <Suspense fallback={<LoadingAnimation/>}><HelpSub/></Suspense>
        },
        {
            path: "/dashboard",
            element: user ?
                (
                    <Suspense fallback={<LoadingAnimation/>}><Dashboard/></Suspense>
                ) :
                (
                    <Navigate to="/"/>
                )
        },
        {
            path: "/likes",
            element: <Suspense fallback={<LoadingAnimation/>}><Likes/></Suspense>
        },
        {
            path: "/ticket",
            element: <Suspense fallback={<LoadingAnimation/>}><Ticket/></Suspense>
        },
        {
            path: "/ticket-verified",
            element: <Suspense fallback={<LoadingAnimation/>}><TicketVerifiedEmail/></Suspense>
        },
        {
            path: "/creator-dashboard",
            element: <Suspense fallback={<LoadingAnimation/>}><CreatorDashboard/></Suspense>
        },
        {
            path: "/event-dashboard",
            element: <Suspense fallback={<LoadingAnimation/>}><EventsDashboard/></Suspense>
        },
        // {
        //     path: "/event-dashboard",
        //     element: <Suspense fallback={<LoadingAnimation/>}><Event/></Suspense>
        // },
        {
            path: "/event-dashboard/order",
            element: <Suspense fallback={<LoadingAnimation/>}><Orders/></Suspense>
        },
        {
            path: "/report-analysis",
            element: <Suspense fallback={<LoadingAnimation/>}><ReportAnalysis/></Suspense>
        },
        {
            path: "/invoice-and-billing",
            element: <Suspense fallback={<LoadingAnimation/>}><InvoiceAndBilling/></Suspense>
        },
        {
            path: "/setting",
            element: <Suspense fallback={<LoadingAnimation/>}><Setting/></Suspense>
        },
        {
            path: "/setting",
            element: <Suspense fallback={<LoadingAnimation/>}><ProfileEdit/></Suspense>
        },
        {
            path: "/setting/invite-team",
            element: <Suspense fallback={<LoadingAnimation/>}><InviteTeam/></Suspense>
        },
        {
            path: "/setting/app-installation",
            element: <Suspense fallback={<LoadingAnimation/>}><AppInstallation/></Suspense>
        },
        {
            path: "/create-event",
            element: <Suspense fallback={<LoadingAnimation/>}><CreateEvent/></Suspense>
        },
        {
            path: "/create-event/basic-info/:eventID",
            element: <Suspense fallback={<LoadingAnimation/>}><BasicInfo/></Suspense>
        },
        {
            path: "/create-event/detail/:eventID",
            element: <Suspense fallback={<LoadingAnimation/>}><Detail/></Suspense>
        },
        {
            path: "/create-event/online-page-event/:eventID",
            element: <Suspense fallback={<LoadingAnimation/>}><OnlinePageEvent/></Suspense>
        },
        {
            path: "/create-event/create-ticket/:eventID",
            element: <Suspense fallback={<LoadingAnimation/>}><CreateTicket/></Suspense>
        },
        {
            path: "/create-event/publish/:eventID",
            element: <Suspense fallback={<LoadingAnimation/>}><Publish/></Suspense>
        }
    ])

    return (
        <main>
            <ToastContainer/>
            {routes}
        </main>
    )
}

export default App
