import {motion} from "framer-motion"
import LazyImage from "../general/LazyImage"
import {config} from "../../config/Config"
import React from "react"
import {IncomingEvent} from "../../context/EventProvider"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../context/AuthProvider"

type Props = {
    allEvents: IncomingEvent[]
}

export default function EventGrid({allEvents}: Props) {
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
        <>
            {allEvents?.map((d, index) => {
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
        </>
    )
}