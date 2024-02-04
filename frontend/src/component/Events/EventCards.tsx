import React from "react"
import LazyImage from "../general/LazyImage"
import {motion} from "framer-motion"
import {Link, useNavigate} from "react-router-dom"
import {config} from "../../config/Config"
import {IncomingEvent} from "../../context/EventProvider"
import {useAuth} from "../../context/AuthProvider"

type Props = {
    category: string
    data?: IncomingEvent[]
}

export default function EventCards({category, data = []}: Props) {
    const {user, likeEvent, unlikeEvent} = useAuth()
    const navigate = useNavigate()

    const handleToggleLikeEvent = (eventId: string) => {
        if (user?.likes.includes(eventId)) {
            unlikeEvent(eventId)
                .then(() => {
                    navigate(0)
                })
        } else {
            likeEvent(eventId)
                .then(() => {
                    navigate(0)
                })
        }
    }

    return (
        <div className="m-auto w-[86.1671469740634vw]">
            <div className="flex justify-between">
                <h3 className="font-[700] text-[clamp(22px,1.8443804034582132vw,32px)] leading-[52.13px] text-[#473a3a]">
                    {category}
                </h3>
                {data.length !== 0 && (
                    <Link to={`/search?category=${category}`}>
                        <motion.button
                            initial={{opacity: 0, scale: 0.1, backgroundColor: "#ffffff00"}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                            whileHover={{
                                scale: 1.09,
                                backgroundColor: "#FB4A04",
                                color: "#fff",
                            }}
                            className="w-[9.855907780979827vw] min-w-[120px] h-[53px] border-2 border-[#FB4A04] font-[400] text-[clamp(16px,1.38328530259366vw,24px)] leading-[40px] text-[#473a3a]"
                        >
                            See More
                        </motion.button>
                    </Link>
                )}
            </div>
            <motion.div
                className="overflow-x-auto scrollbar-hide md:scrollbar-default  snap-center flex justify-between mt-[25px] flex-wrap xsm:justify-center sm:justify-center md:justify-center lg:justify-center xsm:gap-[5vw] sm:gap-[5vw] md:gap-[5vw] lg:gap-[5vw]"
            >
                {data.length === 0 && (
                    <div className="text-center">
                        {category} is currently empty, browse other events
                    </div>
                )}
                {data.slice(0, 4).map((d, index) => {
                    return (
                        <motion.div
                            whileHover={{scale: 1.01}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1 + (index + 0.2) / 100,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                            key={index}
                            className="xsm:mb-[40px] cursor-pointer"
                        >
                            <div
                                className="relative xsm:min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[320px] w-[20.576368876080693vw]">
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.1,
                                        backgroundColor: "#ffffff00",
                                    }}
                                    whileInView={{opacity: 1, scale: 1}}
                                    viewport={{once: true}}
                                    // transition={{
                                    //     duration: 0.4,
                                    //     delay: 0.1 + (index + 0.2) / 100,
                                    //     ease: [0, 0.71, 0.2, 1.01],
                                    // }}
                                    onClick={() => navigate(`/events/${d.id}`)}
                                >
                                    <LazyImage
                                        alt=""
                                        src={`${config.backendBaseUri}/images/${d.image}`}
                                        width="20.576368876080693vw"
                                        classes="shadow-md rounded-[30px] xsm:min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[320px] w-[20.576368876080693vw]"
                                    />
                                </motion.div>
                                {user && (
                                    <motion.div onClick={() => handleToggleLikeEvent(d.id)}>
                                        <motion.img
                                            whileHover={{scale: 1.05}}
                                            className="cursor-pointer absolute right-0 bottom-[3.2%] w-[48px]"
                                            src={user.likes.includes(d.id) ? "/heartIconFilled.png" : "/heartIcon.png"}
                                            alt=""
                                        ></motion.img>
                                    </motion.div>
                                )}
                            </div>
                            <motion.div onClick={() => navigate(`/events/${d.id}`)}>
                                <h3 className="w-[20.576368876080693vw] min-w-[280px] font-[700] text-[clamp(14px,1.1527377521613833vw,20px)] leading-[32.58px] text-[#473a3a]">
                                    {d.title}
                                </h3>
                                {/*<p className="font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[33px] text-[#473a3a]">*/}
                                {/*    {*/}
                                {/*        d.description!.length > 20 ?*/}
                                {/*            d.description!.substring(0, 20 - 1) + "..."*/}
                                {/*            : d.description*/}
                                {/*    }*/}
                                {/*</p>*/}
                            </motion.div>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}
