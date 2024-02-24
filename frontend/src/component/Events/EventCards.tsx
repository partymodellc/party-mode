import React from "react"
import {motion} from "framer-motion"
import {Link, useNavigate} from "react-router-dom"
import {IncomingEvent} from "../../context/EventProvider"
import EventGrid from "./EventGrid"

type Props = {
    category: string
    data?: IncomingEvent[]
}

export default function EventCards({category, data = []}: Props) {
    if (data?.length > 0) {
        data = data?.filter(event => event.category === category)
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
                            initial={{opacity: 0, scale: 0.1, backgroundColor: "#ffffff"}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                            whileHover={{
                                scale: 1.09,
                                backgroundColor: "#0252ED",
                                color: "#ffffff",
                            }}
                            className="w-[9.855907780979827vw] min-w-[120px] h-[53px] border-2 border-[#0252ED] font-[400] text-[clamp(16px,1.38328530259366vw,24px)] leading-[40px] text-[#473a3a]"
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
                <EventGrid allEvents={data?.slice(0, 4)}/>
            </motion.div>
        </div>
    )
}
