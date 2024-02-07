import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom"
import Search from '../general/Search'
import {useLocation} from "react-router-dom"
import {motion} from "framer-motion"
import {Link} from 'react-router-dom'
import {IncomingUser, useAuth} from '../../context/AuthProvider'

type Props = {
    children: any
}

let drawer = [
    {
        name: "dashboard-home",
        iconActive: "/drawerDashboardWhite.svg",
        iconInactive: "/drawercreatorDashboard.svg",
        route: "/dashboard"
    },
    {
        name: "dashboard-events",
        iconActive: "/drawerEventDashboard.svg",
        iconInactive: "/drawerEventDashboardOrange.svg",
        route: "/dashboard/events"
    },
    {
        name: "dashboard-analytics",
        iconActive: "/drawerReportAnalysis.svg",
        iconInactive: "/drawerReportAnalysisOrange.svg",
        route: "/dashboard/analytics"
    },
    {
        name: "dashboard-invoice-and-billing",
        iconActive: "/drawerInvoiceAndBilling.svg",
        iconInactive: "/drawerInvoiceAndBillingOrange.svg",
        route: "/dashboard/invoice-and-billing"
    },
    {
        name: "dashboard-settings",
        iconActive: "/drawerSetting.svg",
        iconInactive: "/drawerSettingOrange.svg",
        route: "/dashboard/settings/profile-edit"
    },
]

export default function Sidebar({children}: Props) {
    const {user, logout} = useAuth()
    const location = useLocation()

    const userPicture = user?.image ? user.image : "/profile.png"

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

                <ul className='text-[#493c3c] text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] flex gap-[31px] mr-[7.37vw] items-center border-[1px] px-[21px] py-[6px] rounded-full border-[#473a3a]'>
                    <li className='flex items-center gap-[8px]'>
                        <img className="w-10 h-10 rounded-full" src={userPicture} alt={user?.username}/>
                        <p className='text-[#473a3a] font-[700] text-[14px] leading-[23px] text-center'>{user?.username}</p>
                        {/*<img className='ml-[41px]' src='/dropdown.svg' alt=''/>*/}
                    </li>
                </ul>
            </nav>
            <div className='flex'>
                <div
                    className='w-[78px] xsm:w-[57px] sm:w-[57px] bg-[#eece93] h-[1015px] flex flex-col justify-between items-end pt-[65px] '
                >
                    <div className='flex flex-col justify-between gap-[12px]'>
                        {drawer.map((item) => {
                            return (
                                <NavLink key={item.name} to={item.route} end>
                                    <div
                                        key={item.name} className='w-[57px] h-[61px] flex justify-center items-center'
                                        style={location.pathname == item.route ? {background: "#ffffff"} : {background: "#eece93"}}
                                    >
                                        <img
                                            src={location.pathname == item.route ? item.iconInactive : item.iconActive}
                                            alt={item.name}
                                        />
                                    </div>
                                </NavLink>
                            )
                        })}
                    </div>
                    <div onClick={logout} className='m-auto my-0 mb-[45px] cursor-pointer'>
                        <img src='/log-out.svg'/>
                    </div>
                </div>

                <div className='flex-1 flex items-start'>
                    {children}
                </div>
            </div>
        </div>
    )
}