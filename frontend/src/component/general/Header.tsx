import React, {useState} from "react"
import {Link, NavLink, useNavigate} from "react-router-dom"
import Search from "./Search"
import {motion} from "framer-motion"
import "react-toastify/dist/ReactToastify.css"
import '../../pages/Style.css'
import {useAuth} from "../../context/AuthProvider"
import 'react-toastify/dist/ReactToastify.css'

export default function Header() {
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const [openNavMenu, setOpenNavMenu] = useState<boolean>(false)
    const [showMobileNav, setShowMobileNav] = useState<boolean>(false)
    // const [showInviteFriendModal, setInviteFriendModal] = useState<boolean>(false)

    // set default user picture/icon if user doesn't have pic
    const userPicture = user?.image ? user.image : "/profile.png"

    const searchOnSubmit = (e: any) => {
        e.preventDefault()
        navigate(`/search?title=${encodeURIComponent(e.target.search.value)}`)
        navigate(0)
    }

    return user ?
        // user nav
        (
            <>
                {/* user nav */}
                <nav
                    className="fixed z-[1000] bg-[white] flex justify-between items-center w-[100%] xsm:flex-col"
                    style={{boxShadow: "1px 1px 8px #00000015"}}
                >
                    <div
                        className="flex items-center gap-[3.28vw] xsm:justify-between sm:justify-between xsm:w-full sm:w-full md:w-full">
                        <div className="flex flex-1 items-center gap-[3.28vw] w-full">
                            <Link to="/">
                                <img src="/Logo.png" className="ml-[8px] min-w-[80px]" alt=""/>
                            </Link>
                            <form onSubmit={searchOnSubmit} style={{flex: "1"}}>
                                <Search id="search" whileHover={{scale: 1.03}}/>
                            </form>

                            {/* mobile nav menu button */}
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
                            <NavLink to="/events/basic-info" className="mx-4">
                                <li className="flex items-center gap-[0.4610951008645533vw]">
                                    <motion.p
                                        whileHover={{color: "#0252ED"}}
                                        className="text-[#1977F3] font-[400] text-[14px] leading-[23px] text-center"
                                    >
                                        + Create Event
                                    </motion.p>
                                </li>
                            </NavLink>
                            <Link to="/likes" className="mx-4">
                                <li className="flex items-center gap-[8px]">
                                    <img src="/heart.png" alt=""/>
                                    <motion.p
                                        whileHover={{color: "#0252ED"}}
                                        className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                    >
                                        Likes
                                    </motion.p>
                                </li>
                            </Link>
                            <Link to="/tickets" className="mx-4">
                                <li className="flex items-center gap-[0.4610951008645533vw] ">
                                    <img src="/ticket.png" alt=""/>
                                    <motion.p
                                        whileHover={{color: "#0252ED"}}
                                        className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                    >
                                        Tickets
                                    </motion.p>
                                </li>
                            </Link>
                        </div>

                        <Link to="/dashboard">
                            <li className="flex items-center gap-[0.4610951008645533vw] ">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={userPicture}
                                    alt={user.username}
                                />

                                <motion.p
                                    whileHover={{color: "#0252ED"}}
                                    className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                >
                                    {user.username}
                                </motion.p>
                            </li>
                        </Link>

                        {/* nav menu */}
                        <li className="relative flex items-center">
                            {/* nav menu button */}
                            <div
                                className="cursor-pointer flex flex-col items-center gap-[5px]"
                                onClick={() => {
                                    setOpenNavMenu(!openNavMenu)
                                }}
                            >
                                <div
                                    style={openNavMenu ? {background: "#0252ED"} : {background: "#473a3a"}}
                                    className="min-w-[29px] min-h-[5px] rounded-full"
                                ></div>
                                <div
                                    style={openNavMenu ? {background: "#0252ED"} : {background: "#473a3a"}}
                                    className="min-w-[29px] min-h-[5px] rounded-full"
                                ></div>
                                <div
                                    style={openNavMenu ? {background: "#0252ED"} : {background: "#473a3a"}}
                                    className="min-w-[29px] min-h-[5px] rounded-full"
                                ></div>
                            </div>
                            {openNavMenu && (
                                <div
                                    style={{boxShadow: "1px 1px 8px #00000030"}}
                                    className="transition-all w-[181px] h-[170px] bg-white absolute z-[1] flex flex-col justify-around py-[20px] top-full right-[-30%]"
                                >
                                    <Link to="/community">
                                        <motion.p
                                            whileHover={{color: "#0252ED"}}
                                            className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[23px] text-center"
                                        >
                                            Explore Community
                                        </motion.p>
                                    </Link>
                                    {/*<motion.p*/}
                                    {/*    onClick={() => setInviteFriendModal(true)}*/}
                                    {/*    whileHover={{color: "#0252ED"}}*/}
                                    {/*    className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[23px] text-center"*/}
                                    {/*>*/}
                                    {/*    Invite a Friend*/}
                                    {/*</motion.p>*/}
                                    <button onClick={logout}>
                                        <motion.p
                                            whileHover={{color: "#0252ED"}}
                                            className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[23px] text-center"
                                        >
                                            Logout
                                        </motion.p>
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>

                    {/* user mobile nav menu */}
                    {showMobileNav &&
                        <div>
                            <ul
                                style={showMobileNav ? {maxHeight: "1000px"} : {maxHeight: "0px", overflow: "hidden"}}
                                className="transition-all xsm:flex sm:flex md:flex flex-col hidden text-[#493c3c] py-[10px] items-center text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] gap-[5.244vw]"
                            >
                                <NavLink to='/events/basic-info'>
                                    <li className="flex items-center gap-[8px]">
                                        <motion.p
                                            whileHover={{color: "#0252ED"}}
                                            className="text-[#1977F3] font-[400] text-[14px] leading-[23px] text-center"
                                        >
                                            + Create Event
                                        </motion.p>
                                    </li>
                                </NavLink>
                                <Link to="/likes">
                                    <li className="flex items-center gap-[8px]">
                                        <img src="/heart.png" alt=""/>
                                        <motion.p
                                            whileHover={{color: "#0252ED"}}
                                            className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                        >
                                            Likes
                                        </motion.p>
                                    </li>
                                </Link>
                                <Link to="/tickets" className="flex items-center">
                                    <li className="flex items-center gap-[0.4610951008645533vw] ">
                                        <img src="/ticket.png" alt=""/>
                                        <motion.p
                                            whileHover={{color: "#0252ED"}}
                                            className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                        >
                                            Ticket
                                        </motion.p>
                                    </li>
                                </Link>
                                <Link to="/dashboard">
                                    <li className="flex items-center gap-[8px]">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={userPicture}
                                        />
                                        <motion.p
                                            whileHover={{color: "#0252ED"}}
                                            className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                        >
                                            {user.email}
                                        </motion.p>
                                    </li>
                                </Link>
                                <Link to="/community">
                                    <motion.p
                                        whileHover={{color: "#0252ED"}}
                                        className="text-[#473a3a] cursor-pointer font-[400] text-[clamp(14px,0.9221902017291066vw,16px)] leading-[23px] text-center"
                                    >
                                        Explore Community
                                    </motion.p>
                                </Link>
                                {/*<li className="flex items-center gap-[8px]">*/}
                                {/*    <motion.p*/}
                                {/*        onClick={() => setInviteFriendModal(true)} whileHover={{color: "#0252ED"}}*/}
                                {/*        className="text-[#473a3a] cursor-pointer font-[400] text-[14px] leading-[23px] text-center"*/}
                                {/*    >*/}
                                {/*        Invite a Friend*/}
                                {/*    </motion.p>*/}
                                {/*</li>*/}
                                <li className="flex items-center gap-[8px]">
                                    <button onClick={logout}>
                                        <motion.p
                                            whileHover={{color: "#0252ED"}}
                                            className="text-[#473a3a] font-[400] text-[14px] leading-[23px] text-center"
                                        >
                                            Logout
                                        </motion.p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }
                </nav>

                {/* to push contents down due to fixed nav */}
                <div className="h-[92px]"></div>
            </>
        )

        :

        // guest nav
        (
            <>
                {/* guest nav */}
                <nav
                    className='fixed z-[1000] bg-[white] flex justify-between items-center w-[100%] xsm:flex-col'
                    style={{boxShadow: "1px 1px 8px #00000015"}}
                >
                    <div
                        className="flex items-center gap-[3.28vw] xsm:justify-between sm:justify-between md:justify-between xsm:w-full sm:w-full md:w-full">
                        <div className="flex flex-1 items-center gap-[3.28vw] w-full">
                            <Link to="/">
                                <img src="/Logo.png" className="ml-[8px] min-w-[80px]" alt=""/>
                            </Link>
                            <form onSubmit={searchOnSubmit} style={{flex: "1"}}>
                                <Search whileHover={{scale: 1.03}} style={{flex: "1"}}/>
                            </form>

                            {/* mobile nav menu button */}
                            <div onClick={() => setShowMobileNav(!showMobileNav)}
                                 className="xsm:flex sm:flex md:flex cursor-pointer relative z-[1000] lg:hidden xl:hidden 2xl:hidden flex-col items-center gap-[5px] mr-[10px]">
                                <div className="min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full"></div>
                                <div className="min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full"></div>
                                <div className="min-w-[29px] min-h-[5px] bg-[#473a3a] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className='xsm:hidden sm:hidden md:hidden'>
                        <ul className='text-[#493c3c] text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] flex gap-[3.8vw] mr-[2vw]'
                            style={{display: 'flex', alignItems: "center"}}>
                            <Link to={"/help-sub"}>
                                <motion.li whileHover={{color: "#0252ED"}}>Live Stream</motion.li>
                            </Link>
                            <Link to={"/subscription-and-pricing"}>
                                <motion.li whileHover={{color: "#0252ED"}}>Pricing</motion.li>
                            </Link>
                            <Link to={"/contact-us"}>
                                <motion.li whileHover={{color: "#0252ED"}}>Help</motion.li>
                            </Link>
                            <Link to="/login">
                                <motion.li whileHover={{color: "#0252ED"}}>Log In</motion.li>
                            </Link>
                            <Link to="/signup">
                                <button className="SignInBtn">
                                    {/* <motion.li whileHover={{ color: "#473a3a" }} className='text-[#0252ED]'></motion.li> */}
                                    Sign Up
                                </button>
                            </Link>
                        </ul>
                    </div>
                </nav>

                {/* to push contents down due to fixed nav */}
                <div className="h-[92px]"></div>

                {/* mobile guest nav */}
                {showMobileNav &&
                    <ul
                        style={showMobileNav ? {maxHeight: "1000px"} : {maxHeight: "0px", overflow: "hidden"}}
                        className='transition-all xsm:flex sm:flex md:flex flex-col hidden text-[#493c3c] py-[10px] items-center text-[clamp(12px,0.9221902017291066vw,16px)] font-[700] gap-[5.244vw] relative'
                    >
                        <Link to={"/help-sub"}>
                            <button>Live Stream</button>
                        </Link>
                        <Link to={"/subscription-and-pricing"}>
                            <button>Pricing</button>
                        </Link>
                        <Link to={"/contact-us"}>
                            <button>Help</button>
                        </Link>
                        <Link to="/login">
                            <button>Log In</button>
                        </Link>
                        <Link to="/signup">
                            <button>Sign Up</button>
                        </Link>
                    </ul>
                }
            </>
        )
}