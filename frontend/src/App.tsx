import { lazy, Suspense } from "react"
import { Navigate, Route, Routes, useRoutes } from "react-router-dom"
import EventDescriptions from "./pages/EventDescriptions"
import LoadingAnimation from "./component/General/LoadingAnimation"
import "react-toastify/dist/ReactToastify.css"

const Events = lazy(() => import("./pages/Events"))
const Event = lazy(() => import("./component/EventsDashboard/Event"))
const Login = lazy(() => import("./component/Authentication/Login"))
const Signup = lazy(() => import("./component/Authentication/Signup"))
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"))
const SubscriptionAndPricing = lazy(() => import("./pages/SubscriptionAndPricing"))
const ContactUs = lazy(() => import("./pages/ContactUs"))
const HelpSub = lazy(() => import("./pages/HelpSub"))
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

    let routes = useRoutes([
        {
            path: "/",
            element: <Events />
        },
        {
            path: "/event-description/:eventID",
            element: <EventDescriptions />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/payment-success",
            element: <PaymentSuccess />
        },
        {
            path: "/interests",
            element: <Interests />
        },
        {
            path: "/subscription-and-pricing",
            element: <SubscriptionAndPricing />
        },
        {
            path: "/contact-us",
            element: <ContactUs />
        },
        {
            path: "/community",
            element: <Community />
        },
        {
            path: "/community-join",
            element: <Community2 />
        },
        {
            path: "/help-sub",
            element: <HelpSub />
        },
        {
            path: "/likes",
            element: <Likes />
        },
        {
            path: "/ticket",
            element: <Ticket />
        },
        {
            path: "/ticket-verified",
            element: <TicketVerifiedEmail />
        },
        {
            path: "/creator-dashboard",
            element: <CreatorDashboard />
        },
        {
            path: "/event-dashboard",
            element: <EventsDashboard />
        },
        // {
        //     path: "/event-dashboard",
        //     element: <Suspense fallback={<LoadingAnimation/>}><Event/>
        // },
        {
            path: "/event-dashboard/order",
            element: <Orders />
        },
        {
            path: "/report-analysis",
            element: <ReportAnalysis />
        },
        {
            path: "/invoice-and-billing",
            element: <InvoiceAndBilling />
        },
        {
            path: "/setting",
            element: <Setting />
        },
        {
            path: "/setting",
            element: <ProfileEdit />
        },
        {
            path: "/setting/invite-team",
            element: <InviteTeam />
        },
        {
            path: "/setting/app-installation",
            element: <AppInstallation />
        },
        {
            path: "/create-event",
            element: <CreateEvent />
        },
        {
            path: "/create-event/basic-info/:eventID",
            element: <BasicInfo />
        },
        {
            path: "/create-event/detail/:eventID",
            element: <Detail />
        },
        {
            path: "/create-event/online-page-event/:eventID",
            element: <OnlinePageEvent />
        },
        {
            path: "/create-event/create-ticket/:eventID",
            element: <CreateTicket />
        },
        {
            path: "/create-event/publish/:eventID",
            element: <Publish />
        }
    ])

    return (
        <main>
            <Suspense fallback={<LoadingAnimation />}>
                {routes}
            </Suspense>
        </main>
    )
}

export default App
