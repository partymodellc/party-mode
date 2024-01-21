import React from 'react'
import {NavLink, Outlet, useNavigate} from "react-router-dom"
import LazyImage from '../General/LazyImage'
import Search from '../General/Search'
import {useLocation} from "react-router-dom"
import {motion} from "framer-motion"
import {Link} from 'react-router-dom'
import {useAuth} from '../../context/AuthProvider'

type Props = {
    children: any
}

let drawer = [
    {
        iconWhite: "../drawerDashboardWhite.svg",
        iconOrange: "../drawercreatorDashboard.svg",
        route: "/dashboard"
    },
    {
        iconWhite: "../drawerEventDashboard.svg",
        iconOrange: "../drawerEventDashboardOrange.svg",
        route: "/dashboard/events"
    },
    {
        iconWhite: "../drawerReportAnalysis.svg",
        iconOrange: "../drawerReportAnalysisOrange.svg",
        route: "/dashboard/analytics"
    },
    {
        iconWhite: "../drawerInvoiceAndBilling.svg",
        iconOrange: "../drawerInvoiceAndBillingOrange.svg",
        route: "/dashboard/invoice-and-billing"
    },
    {
        icon: "./",
        iconWhite: "../drawerSetting.svg",
        iconOrange: "../drawerSettingOrange.svg",
        route: "/dashboard/settings"
    },
]

export default function Sidebar({children}: Props) {

    const {logout, user} = useAuth()

    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div>
            <nav className='flex justify-between items-center w-[100%] h-85px'>
                <div className='flex items-center gap-[3.28vw]'>
                    <Link to="/">
                        <motion.img alt="" src={"/Logo.png"} className="w-[80px] xsm:min-w-[57px] sm:min-w-[57px]"/>
                    </Link>
                    <div className='xsm:hidden '>
                        <Search whileHover={{scale: 1.03}}/>
                    </div>
                </div>

                <ul className='text-[#493c3c] text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] flex gap-[31px] mr-[7.37vw] items-center border-[1px] px-[21px] py-[6px] rounded-full border-[#473a3a] '>
                    <li className='flex items-center gap-[8px]'>
                        <img className="w-10 h-10 rounded-full" src={user?.picture} alt={user?.username}/>
                        <p className='text-[#473a3a] font-[700] text-[14px] leading-[23px] text-center ml-[20px]'> {user?.username} </p>
                        <img className='ml-[41px]' src='/dropdown.svg' alt=''/>
                    </li>
                </ul>
            </nav>
            <div className='flex'>
                <div
                    className='  w-[78px] xsm:w-[57px] sm:w-[57px] bg-[#FB4A04] h-[1015px] flex flex-col justify-between items-end pt-[65px] '>
                    <div className='flex flex-col justify-between gap-[12px]'>
                        {drawer.map((item) => {
                            return (
                                <NavLink key={item.route} to={item.route} end>
                                    <div
                                        style={location.pathname == item.route ? {background: "#ffffff"} : {background: "#FB4A04"}}
                                        key={item.route} className='w-[57px] h-[61px] flex justify-center items-center'>
                                        <img
                                            src={location.pathname == item.route ? item.iconOrange : item.iconWhite}
                                            alt=""/>
                                    </div>
                                </NavLink>
                            )
                        })}
                    </div>
                    <div onClick={logout} className='m-auto my-0 mb-[45px] cursor-pointer'>
                        <img src='../log-out.svg'/>
                    </div>
                </div>

                <div className='flex-1 flex items-start'>
                    {children}
                </div>
            </div>
        </div>
    )
}