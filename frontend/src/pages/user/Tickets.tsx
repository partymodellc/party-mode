import React from 'react'
import Footer from '../../component/general/Footer'
import Button from '../../component/general/Button'
import {motion} from "framer-motion"
import {Link} from 'react-router-dom'
import {useAuth} from "../../context/AuthProvider"
import Header from "../../component/general/Header"

export default function Tickets() {
    const {user} = useAuth()

    const userPicture = user?.image ? user.image : "/profile.svg"

    return (
        <>
            <Header/>
            <div className='flex gap-[48px] items-center ml-[6.916426512968299vw] mt-[60px] xsm:flex-col'>
                <motion.div
                    whileHover={{scale: 1.03}}
                    className='flex justify-center items-center w-[155px] h-[149px] rounded-full bg-[#F5F5F5]'
                >
                    <img src={userPicture} alt=''/>
                </motion.div>
                <div>
                    <div className='flex gap-[12px] items-center'>
                        <h2 className='font-[700] text-[32px] leading-[52px] text-[#473a3a]'>Name & Surname</h2>
                        <Link to="/dashboard/settings/profile-edit">
                            <motion.img
                                whileHover={{scale: 1.09}} className="cursor-pointer" src='/editIcon.svg'
                                alt=''
                            />
                        </Link>
                    </div>
                    <div className='flex'>
                        <p className='font-[400] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[33px] text-[#473a3a]'>0
                            Orders Booked</p>
                        <pre
                            className='font-[400] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[33px] text-[#473a3a]'>{" . "}</pre>
                        <p className='font-[400] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[33px] text-[#473a3a]'>2
                            likes</p>
                    </div>
                </div>
            </div>

            <div className='w-[42.70893371757925vw]  xsm:w-[90%] sm:w-[80%] m-auto mb-[242px]'>
                <h3 className='font-[700] text-[clamp(16px,1.38328530259366vw,24px)] leading-[39px] text-[#473a3a] ml-[3%] mt-[85px]'>Orders</h3>
                <div className='flex flex-col items-center'>
                    <h3 className='font-[700] text-[clamp(16px,1.38328530259366vw,24px)] leading-[39px] text-[#473a3a] mb-[13px]'>Looking
                        for your tickets?</h3>
                    <p className='font-[400] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[33px] text-[#473a3a] mb-[36px]'>You
                        need to verify your email to view transfers and gifts.</p>
                    <Link to={"/ticket-verified"}>
                        <Button whileHover={{background: "#FB4A04", color: "#ffffff", scale: 1.03}} width='232px'
                                height='51px' text='Verify your email' style={{
                            marginBottom: "36px",
                            background: "#fff",
                            border: "1px solid #473a3a",
                            borderRadius: "0px",
                            color: "#473a3a",
                            fontSize: "16xp",
                            fontWeight: "400"
                        }}/>
                    </Link>
                    <img className='mb-[36px]' src='/ticketIcon.svg' alt=''/>
                    <p className='font-[400] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[33px] text-[#473a3a] mb-[36px]'>No
                        upcoming order</p>
                </div>
                <div className='w-full h-[2px] bg-[#D9D9D9] mb-[69px]'></div>

                <div>
                    <h3 className='font-[700] text-[clamp(16px,1.38328530259366vw,24px)] leading-[39px] text-[#473a3a] mb-[49px] ml-[3%]'>Likes</h3>
                    <div className='flex gap-[20px] xsm:flex-col sm:flex-col'>

                        <div className='flex flex-col gap-[49px]'>
                            <motion.img whileHover={{scale: 1.03}} initial={{opacity: 0, scale: 0.1}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        viewport={{once: true}}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.1,
                                            ease: [0, 0.71, 0.2, 1.01]
                                        }}
                                        className='shadow-xl w-[20.576368876080693vw] xsm:min-w-[100%] sm:min-w-[100%]'
                                        src='/likes1.png' alt=''/>
                            <div className='flex flex-col justify-center'>
                                <h2 className='font-[700] xsm:min-w-[100%] sm:min-w-[100%] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[33px] text-[#473a3a] w-[20.403458213256485vw]'>Hush
                                    Haunt 2022 - Oct 13 Hush Haunted Attraction, Westland.</h2>
                                <div className='flex items-center gap-[23px]'>
                                    <p className='font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[33px] text-[#F2141483]'>Thurs
                                        Oct 13 at 7:00pm EDT</p>
                                    <motion.img whileHover={{scale: 1.09}} className="cursor-pointer"
                                                src='/download.png' alt=''/>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[49px]'>
                            <motion.img whileHover={{scale: 1.03}} initial={{opacity: 0, scale: 0.1}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        viewport={{once: true}}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.1,
                                            ease: [0, 0.71, 0.2, 1.01]
                                        }}
                                        className='shadow-xl w-[20.576368876080693vw] xsm:min-w-[100%] sm:min-w-[100%]'
                                        src='/likes2.png' alt=''/>
                            <div className='flex flex-col justify-center'>
                                <h2 className='font-[700] xsm:min-w-[100%] sm:min-w-[100%] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[33px] text-[#473a3a] w-[20.403458213256485vw]'>Hush
                                    Haunt 2022 - Oct 13 Hush Haunted Attraction, Westland.</h2>
                                <div className='flex items-center gap-[23px]'>
                                    <p className='font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[33px] text-[#F2141483]'>Thurs
                                        Oct 13 at 7:00pm EDT</p>
                                    <motion.img whileHover={{scale: 1.09}} className="cursor-pointer"
                                                src='/download.png' alt=''/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer showFooterHeaders={false}/>
        </>
    )
}