import React, {useEffect} from 'react'
import Footer from '../../component/general/Footer'
import LazyImage from '../../component/general/LazyImage'
import {motion} from "framer-motion"
import Header from "../../component/general/Header"
import {useEvent} from "../../context/EventProvider"
import {config} from "../../config/Config"
import {Link} from "react-router-dom"
import moment from "moment"
import {useAuth} from "../../context/AuthProvider";

export default function () {
    const {user} = useAuth()
    const {allEvents, getAllEvents} = useEvent()

    useEffect(() => {
        getAllEvents(undefined, user?.likes)
    }, [])

    return (
        <>
            <Header/>
            <div className='mt-[100px] ml-[14.351585014409222vw] xsm:ml-[12vw] mb-[219px]'>
                <h1 className='font-[700] text-[48px] leading-[78px] text-[#FB4A04] self-start mb-[26px]'>Likes</h1>

                {allEvents?.length || 0 > 0 ? (allEvents?.map((event, index) => {
                    return (
                        <div key={index}>
                            <div className='flex gap-[20px] mt-[26px] xsm:flex-col-reverse'>
                                <div className='flex flex-col justify-center'>
                                    <Link to={`/events/${event.id}`}>
                                        <motion.h2
                                            className='font-[700] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[33px] text-[#473a3a] w-[40.80691642651297vw] xsm:w-[80%]'
                                            whileHover={{scale: 1.03}}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.1,
                                                ease: [0, 0.71, 0.2, 1.01]
                                            }}
                                        >
                                            {event.title}
                                        </motion.h2>
                                    </Link>
                                    <p className='font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[33px] text-[#FB4A0483]'>
                                        {moment(event.startDate).format("MMM D, h:m A")}
                                    </p>
                                    {/* TODO: what are we downloading here? */}
                                    {/*<div className='flex items-center gap-[23px]'>*/}
                                    {/*    <p className='font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[33px] text-[#473a3a]'>Free</p>*/}
                                    {/*    <img src='/download.png' alt=''/>*/}
                                    {/*</div>*/}
                                </div>
                                <Link to={`/events/${event.id}`}>
                                    <motion.div
                                        whileHover={{scale: 1.03}} initial={{opacity: 0, scale: 0.1}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        viewport={{once: true}}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.1,
                                            ease: [0, 0.71, 0.2, 1.01]
                                        }}
                                    >
                                        <LazyImage
                                            src={`${config.backendBaseUri}/images/${event.image}`}
                                            classes='shadow-xl w-[22.01729106628242vw] min-w-[260px] xsm:w-[80%]'
                                        />
                                    </motion.div>
                                </Link>
                            </div>

                            {index + 1 != allEvents?.length && (
                                <div className='max-w-[63.976945244956774vw] min-h-[2px] bg-[#D9D9D9] my-[55px]'></div>
                            )}
                        </div>
                    )
                })) : (
                    <div className='w-[78.32853025936599vw] flex justify-center items-center'>
                        <div className='mt-[129px] flex flex-col justify-center items-center'>
                            <img src='/noData.png' alt=''/>
                            <p className='mt-[32px] font-[400] text-[16px] leading-[26px] text-[#949494]'>
                                No Likes
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <Footer showFooterHeaders={false}/>
        </>
    )
}