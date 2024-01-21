import {lazy, Suspense} from "react"
import {Navigate, Route, Routes, useRoutes} from "react-router-dom"
import Event from "./pages/Event"
import LoadingAnimation from "./component/General/LoadingAnimation"
import "react-toastify/dist/ReactToastify.css"

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./component/Authentication/Login"))
const Signup = lazy(() => import("./component/Authentication/Signup"))
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"))
const SubscriptionAndPricing = lazy(() => import("./pages/SubscriptionAndPricing"))
const ContactUs = lazy(() => import("./pages/ContactUs"))
const HelpSub = lazy(() => import("./pages/HelpSub"))
const Likes = lazy(() => import("./pages/user/Likes"))
const Tickets = lazy(() => import("./pages/user/Tickets"))
const TicketVerifiedEmail = lazy(() => import("./pages/user/TicketVerifiedEmail"))
const DashboardHome = lazy(() => import("./pages/dashboard/Home"))
const DashboardEvents = lazy(() => import("./pages/dashboard/Events"))
const Orders = lazy(() => import("./component/EventsDashboard/Orders"))
const DashboardAnalytics = lazy(() => import("./pages/dashboard/Analytics"))
const DashboardInvoiceAndBilling = lazy(() => import("./pages/dashboard/InvoiceAndBilling"))
const DashboardSettings = lazy(() => import("./pages/dashboard/Settings"))
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

    let routes = useRoutes([
        {
            path: "",
            element: <Home/>
        },
        {
            path: "events/:eventID",
            element: <Event/>
        },
        {
            path: "login",
            element: <Login/>
        },
        {
            path: "signup",
            element: <Signup/>
        },
        {
            path: "payment-success",
            element: <PaymentSuccess/>
        },
        {
            path: "interests",
            element: <Interests/>
        },
        {
            path: "subscription-and-pricing",
            element: <SubscriptionAndPricing/>
        },
        {
            path: "contact-us",
            element: <ContactUs/>
        },
        {
            path: "community",
            element: <Community/>
        },
        {
            path: "community-join",
            element: <Community2/>
        },
        {
            path: "help-sub",
            element: <HelpSub/>
        },
        {
            path: "likes",
            element: <Likes/>
        },
        {
            path: "tickets",
            element: <Tickets/>
        },
        {
            path: "ticket-verified",
            element: <TicketVerifiedEmail/>
        },
        {
            path: "dashboard",
            element: <DashboardHome/>
        },
        {
            path: "dashboard/events",
            element: <DashboardEvents/>
        },
        {
            path: "dashboard/events/orders",
            element: <Orders/>
        },
        {
            path: "dashboard/analytics",
            element: <DashboardAnalytics/>
        },
        {
            path: "dashboard/settings",
            element: <DashboardSettings/>
        },
        {
            path: "dashboard/invoice-and-billing",
            element: <DashboardInvoiceAndBilling/>
        },
        {
            path: "setting",
            element: <ProfileEdit/>
        },
        {
            path: "setting/invite-team",
            element: <InviteTeam/>
        },
        {
            path: "setting/app-installation",
            element: <AppInstallation/>
        },
        {
            path: "create-event",
            element: <CreateEvent/>,
            children: [
                {
                    path: "basic-info",
                    element: <BasicInfo/>
                },
                {
                    path: "create-event/detail",
                    element: <Detail/>
                },
                {
                    path: "create-event/online-page-event",
                    element: <OnlinePageEvent/>
                },
                {
                    path: "create-event/create-ticket",
                    element: <CreateTicket/>
                },
                {
                    path: "create-event/publish",
                    element: <Publish/>
                }
            ]
        }
    ])

    return (
        <main>
            <Suspense fallback={<LoadingAnimation/>}>
                {routes}
            </Suspense>
        </main>
    )
}

export default App
