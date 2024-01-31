import {lazy, Suspense} from "react"
import {Route, Routes} from "react-router-dom"
import Event from "./pages/events/Event"
import LoadingAnimation from "./component/general/LoadingAnimation"
import "react-toastify/dist/ReactToastify.css"
import PrivateRoutes from "./utils/PrivateRoutes";
import AuthRoutes from "./utils/AuthRoutes";

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/authentication/Login"))
const Signup = lazy(() => import("./pages/authentication/Signup"))
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
const BasicInfo = lazy(() => import("./pages/events/BasicInfo"))
const Details = lazy(() => import("./pages/events/Details"))
const OnlinePageEvent = lazy(() => import("./pages/events/OnlinePageEvent"))
const EventTickets = lazy(() => import("./pages/events/Tickets"))
const Publish = lazy(() => import("./pages/events/Publish"))
const Community = lazy(() => import("./pages/Community"))
const Community2 = lazy(() => import("./pages/Community2"))

export default function App() {
    return (
        <main>
            <Suspense fallback={<LoadingAnimation/>}>
                <Routes>
                    {/* content routes */}
                    <Route path="" element={<Home/>}/>
                    <Route path="events/:eventId" element={<Event/>}/>

                    {/* auth routes */}
                    <Route element={<AuthRoutes/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="signup" element={<Signup/>}/>
                    </Route>

                    {/* protected routes */}
                    <Route element={<PrivateRoutes/>}>
                        <Route path="events/:eventId/basic-info" element={<BasicInfo/>}/>
                        <Route path="events/:eventId/details" element={<Details/>}/>
                        <Route path="events/:eventId/tickets" element={<EventTickets/>}/>
                        {/* TODO: support online event page features */}
                        {/*<Route path="events/:eventID/online-page-event" element={<OnlinePageEvent/>}/>*/}
                        <Route path="events/:eventId/publish" element={<Publish/>}/>

                        <Route path="dashboard" element={<DashboardHome/>}/>
                        <Route path="dashboard/events" element={<DashboardEvents/>}/>
                        <Route path="dashboard/events/orders" element={<Orders/>}/>
                        <Route path="dashboard/analytics" element={<DashboardAnalytics/>}/>
                        <Route path="dashboard/settings" element={<DashboardSettings/>}/>
                        <Route path="dashboard/invoice-and-billing" element={<DashboardInvoiceAndBilling/>}/>

                        <Route path="likes" element={<Likes/>}/>
                        <Route path="tickets" element={<Tickets/>}/>

                        <Route path="settings" element={<ProfileEdit/>}/>
                        <Route path="settings/invite-team" element={<InviteTeam/>}/>
                        <Route path="settings/app-installation" element={<AppInstallation/>}/>
                    </Route>

                    {/* info routes */}
                    <Route path="contact-us" element={<ContactUs/>}/>
                    <Route path="help-sub" element={<HelpSub/>}/>

                    {/* misc routes */}
                    <Route path="payment-success" element={<PaymentSuccess/>}/>
                    <Route path="interests" element={<Interests/>}/>
                    <Route path="subscription-and-pricing" element={<SubscriptionAndPricing/>}/>

                    <Route path="community" element={<Community/>}/>
                    <Route path="community-join" element={<Community2/>}/>
                    <Route path="ticket-verified" element={<TicketVerifiedEmail/>}/>
                </Routes>
            </Suspense>
        </main>
    )
}