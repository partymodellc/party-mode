import React, { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import "react-toastify/dist/ReactToastify.css"

import axios from "axios"
import { useEvent } from "../../context/EventProvider"

import '../../pages/Style.css'
import { useAuth } from "../../context/AuthProvider"

export default function HeaderEvents() {
    const { logout, user } = useAuth()
    const Navigate = useNavigate()
    const { eventID, setEventID } = useEvent()

    const [openContextMenu, setOpenContextMenu] = useState<boolean>(false)
    const [showMobileNav, setShowMobileNav] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showNavContext, setShowNavContext] = useState<boolean>(false)
    const [allEvents, setAllEvents] = useState([])


    const createEvent = async () => {
        const eventCreated = await axios.post(
            "http://localhost:8000/events/create-event",
            { status: "pending" }
        )
        console.log("EVENET CREATED RESPONSE", eventCreated.data.eventId)
        if (setEventID) {
            setEventID(eventCreated.data.eventId)
        }
        Navigate(`/create-event/basic-info/${eventCreated.data.eventId}`)
    }

    return user ?
        (
            <>
                <nav className="fixed z-[1000] bg-[white] flex justify-between items-center w-[100%] xsm:flex-col" style={{ boxShadow: "1px 1px 8px #00000015" }}>
                    <div className="flex items-center gap-[3.28vw] xsm:justify-between sm:justify-between xsm:w-full sm:w-full md:w-full">
                        <div className="flex lg:w-[90px] flex-1 items-center gap-[3.28vw] w-full">
                            <Link to="/">
                                <img src="./Logo.png" className="ml-[8px] min-w-[80px]" alt="" />
                            </Link>
                            <SearchBar whileHover={{ scale: 1.03 }} style={{ flex: "1" }} />
                            <div onClick={() => setShowMobileNav(!showMobileNav)}
                                className="xsm:flex sm:flex md:flex cursor-pointer relative z-[1000] lg:hidden xl:hidden 2xl:hidden flex-col items-center gap-[5px] mr-[10px]">
                                <div className="min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full"></div>
                                <div className="min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full"></div>
                                <div className="min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <ul className="xsm:hidden sm:hidden md:hidden text-[#493c3c] text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] flex gap-[2.881844380403458vw] mr-[2vw]">
                        <div className="flex justify-center items-center relative">
                            <NavLink
                                className="hover:text-[#FB4A04] cursor-pointer mx-4"
                                to="/event-dashboard"
                            >
                                Dashboard
                            </NavLink>
                            <motion.li
                                whileHover={{ color: "#FB4A04" }}
                                onClick={() => setShowNavContext(!showNavContext)}
                                className="cursor-pointer flex items-center gap-[0.4610951008645533vw]"
                            >
                                Event creators{" "}
                                <img
                                    style={showNavContext ? { transform: "rotate(180deg)" } : {}}
                                    className="w-[12px]"
                                    src="./3017945_arrow_declining_descending_down_downward_icon.svg"
                                    alt=""
                                />
                            </motion.li>
                            {showNavContext && (
                                <div
                                    style={{ boxShadow: "1px 1px 8px #00000030" }}
                                    className="transition-all w-[181px] h-[170px] bg-white absolute z-[1] flex flex-col justify-around items-center py-[20px] top-full right-[-30%]"
                                >
                                    <NavLink to={""} onClick={createEvent} className="flex items-center ">
                                        <li className="flex items-center gap-[0.4610951008645533vw]">
                                            <p className="text-[#1977F3] font-[400] text-[14px] leading-[23px] text-center">
                                                +
                                            </p>
                                            <motion.p
                                                whileHover={{ color: "#FB4A04" }}
                                                className="text-[#1977F3] font-[400] text-[14px] leading-[23px] text-center"
                                            >
                                                Create Events
                                            </motion.p>
                                        </li>
                                    </NavLink>

                                    <Link to="/likes" className="flex items-center">
                                        <li className="flex items-center gap-[8px]">
                                            <img src="./heart.png" alt="" />
                                            <motion.p
                                                whileHover={{ color: "#FB4A04" }}
                                                className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                            >
                                                Likes
                                            </motion.p>
                                        </li>
                                    </Link>
                                    <Link to="/ticket" className="flex items-center">
                                        <li className="flex items-center gap-[0.4610951008645533vw] ">
                                            <img src="./ticket.png" alt="" />
                                            <motion.p
                                                whileHover={{ color: "#FB4A04" }}
                                                className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                            >
                                                Ticket
                                            </motion.p>
                                        </li>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <li className="flex items-center gap-[0.4610951008645533vw] ">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={user.picture}
                                alt={user.username}
                            />
                            <motion.p
                                whileHover={{ color: "#FB4A04" }}
                                className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                            >
                                {user.email}
                            </motion.p>
                        </li>
                        <li className="relative flex items-center">
                            <div
                                className="cursor-pointer flex flex-col items-center gap-[5px]"
                                onClick={() => {
                                    setOpenContextMenu(!openContextMenu)
                                }}
                            >
                                <div
                                    style={
                                        openContextMenu
                                            ? { background: "#FB4A04" }
                                            : { background: "#473a3a" }
                                    }
                                    className="min-w-[29px] min-h-[5px] rounded-full"
                                ></div>
                                <div
                                    style={
                                        openContextMenu
                                            ? { background: "#FB4A04" }
                                            : { background: "#473a3a" }
                                    }
                                    className="min-w-[29px] min-h-[5px] rounded-full"
                                ></div>
                                <div
                                    style={
                                        openContextMenu
                                            ? { background: "#FB4A04" }
                                            : { background: "#473a3a" }
                                    }
                                    className="min-w-[29px] min-h-[5px] rounded-full"
                                ></div>
                            </div>
                            {openContextMenu && (
                                <div
                                    style={{ boxShadow: "1px 1px 8px #00000030" }}
                                    className="transition-all w-[181px] h-[170px] bg-white absolute z-[1] flex flex-col justify-around py-[20px] top-full right-[-30%]"
                                >
                                    <Link to="/community">
                                        <motion.p
                                            whileHover={{ color: "#FB4A04" }}
                                            className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[23px] text-center"
                                        >
                                            {" "}
                                            Explore Community
                                        </motion.p>
                                    </Link>
                                    <motion.p
                                        onClick={() => setShowModal(true)}
                                        whileHover={{ color: "#FB4A04" }}
                                        className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[23px] text-center"
                                    >
                                        Invite a Friend
                                    </motion.p>
                                    <motion.p
                                        whileHover={{ color: "#FB4A04" }}
                                        className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[23px] text-center"
                                    >
                                        Explore Community Vibe
                                    </motion.p>
                                    <button onClick={logout}>
                                        <motion.p
                                            whileHover={{ color: "#FB4A04" }}
                                            className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[23px] text-center"
                                        >
                                            Logout
                                        </motion.p>
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
                {
                    showMobileNav &&
                    <nav>
                        <ul
                            style={
                                showMobileNav
                                    ? { maxHeight: "1000px" }
                                    : { maxHeight: "0px", overflow: "hidden" }
                            }
                            className="transition-all xsm:flex sm:flex flex-col hidden text-[#493c3c] py-[10px] items-center text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] gap-[5.244vw]">
                            <Link to="/create-event">
                                <li className="flex items-center gap-[8px]">
                                    <p className="text-[#1977F3] font-[400] text-[14px] leading-[23px] text-center">+</p>
                                    <motion.p whileHover={{ color: "#FB4A04" }} className="text-[#1977F3] font-[400] text-[14px] leading-[23px] text-center">Create Events</motion.p>
                                </li>
                            </Link>
                            <Link to="/likes">
                                <li className="flex items-center gap-[8px]">
                                    <img src="./heart.png" alt="" />
                                    <motion.p whileHover={{ color: "#FB4A04" }} className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center">Likes</motion.p>
                                </li>
                            </Link>
                            <Link to="/ticket" className="flex items-center">
                                <li className="flex items-center gap-[0.4610951008645533vw] ">
                                    <img src="./ticket.png" alt="" />
                                    <motion.p whileHover={{ color: "#FB4A04" }} className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center">Ticket</motion.p>
                                </li>
                            </Link>
                            <li className="flex items-center gap-[8px]">
                                <img src="./profile.png" alt="" />
                                <motion.p whileHover={{ color: "#FB4A04" }} className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"></motion.p>
                            </li>
                            <Link to="/community">
                                <motion.p whileHover={{ color: "#FB4A04" }} className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(14px,0.9221902017291066vw,16px)] leading-[23px] text-center">
                                    {" "}
                                    Explore Community
                                </motion.p>
                            </Link>
                            <li className="flex items-center gap-[8px]">
                                <motion.p onClick={() => setShowModal(true)} whileHover={{ color: "#FB4A04" }} className="text-[#473a3a] cursor-pointer font-[400] text-[14px] leading-[23px] text-center">
                                    Invite a Friend
                                </motion.p>
                            </li>
                            <li className="flex items-center gap-[8px]">
                                <Link to="/customer">
                                    <motion.p whileHover={{ color: "#FB4A04" }} className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center">Explore Community Vibe</motion.p>
                                </Link>
                            </li>

                            <li className="flex items-center gap-[8px]">
                                <motion.p whileHover={{ color: "#FB4A04" }} className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center">
                                    {" "}
                                    Logout{" "}
                                </motion.p>
                            </li>
                        </ul>
                    </nav>
                }
            </>
        )
        :
        (
            <>
                <nav className='fixed z-[1000] bg-[white] flex justify-between items-center w-[100%] xsm:flex-col'
                    style={{ boxShadow: '0 0 5px 1px #919191', padding: '0 35px' }}>
                    <div className='flex items-center gap-[3.28vw] xsm:justify-between sm:justify-between xsm:w-full sm:w-full'>
                        <Link to="/">
                            <img src='./Logo.png' className='ml-[8px] min-w-[80px]' alt='' style={{ width: '20px' }} />
                        </Link>
                        <SearchBar whileHover={{ scale: 1.03 }} style={{ flex: "1" }} />
                        <div onClick={() => setShowMobileNav(!showMobileNav)}
                            className='xsm:flex sm:flex cursor-pointer hidden flex-col items-center gap-[5px] mr-[10px]'>
                            <div className='min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full'></div>
                            <div className='min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full'></div>
                            <div className='min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full'></div>
                        </div>
                    </div>

                    <div className='forMobile'>
                        <ul className='xsm:hidden sm:hidden text-[#493c3c] text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] flex gap-[3.8vw]'
                            style={{ display: 'flex', alignItems: "center" }}>
                            <Link to={"/help-sub"}>
                                <motion.li whileHover={{ color: "#FB4A04" }}>Live Stream</motion.li>
                            </Link>
                            <Link to={"/subscription-and-pricing"}>
                                <motion.li whileHover={{ color: "#FB4A04" }}>Pricing</motion.li>
                            </Link>
                            <Link to={"/contact-us"}>
                                <motion.li whileHover={{ color: "#FB4A04" }}>Help</motion.li>
                            </Link>
                            <Link to="/login">
                                <motion.li whileHover={{ color: "#FB4A04" }}>Log In</motion.li>
                            </Link>
                            <Link to="/signup">
                                <button className="SignInBtn">
                                    {/* <motion.li whileHover={{ color: "#473a3a" }} className='text-[#FB4A04]'></motion.li> */}
                                    Sign Up
                                </button>
                            </Link>
                        </ul>
                    </div>
                </nav>
                {
                    showMobileNav &&
                    <ul style={showMobileNav ? { maxHeight: "1000px" } : { maxHeight: "0px", overflow: "hidden" }}
                        className='transition-all xsm:flex sm:flex flex-col hidden text-[#493c3c] py-[10px] items-center text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] gap-[5.244vw] relative top-[88px]'>
                        <Link to={"/help-sub"}>
                            <motion.li whileHover={{ color: "#FB4A04" }}>Live Stream</motion.li>
                        </Link>
                        <Link to={"/subscription-and-pricing"}>
                            <motion.li whileHover={{ color: "#FB4A04" }}>Pricing</motion.li>
                        </Link>
                        <Link to={"/contact-us"}>
                            <motion.li whileHover={{ color: "#FB4A04" }}>Help</motion.li>
                        </Link>
                        <Link to="/login">
                            <motion.li whileHover={{ color: "#FB4A04" }}>Log In</motion.li>
                        </Link>
                        <Link to="/signup">
                            {/* <motion.li whileHover={{ color: "#473a3a" }} className='text-[#FB4A04]'>Sign Up</motion.li> */}
                            <button>Sign Up</button>
                        </Link>
                    </ul>
                }
            </>
        )
}