import React, {useState} from "react"
import {motion} from "framer-motion"
import {IncomingEvent, useEvent} from "../../context/EventProvider"
import {useNavigate} from "react-router-dom"
import {config} from "../../config/Config"
// @ts-ignore
import {CopyToClipboard} from "react-copy-to-clipboard"

type Props = {
    event: IncomingEvent
    index: number
}

export default function TableRow({event, index}: Props) {
    const {deleteEvent} = useEvent()
    const navigate = useNavigate()

    const [contextMenu, setContextMenu] = useState<boolean>(false)

    const handleDeleteEvent = () => {
        deleteEvent(event.id)
        setContextMenu(false)
        navigate(0)
    }

    return (
        <tr className="py-[15px]">
            <td className="w-[2%]">{index + 1}</td>
            <td className="w-32 h-32">
                {event.image ?
                    (
                        <img
                            className="w-full h-full rounded"
                            src={`${config.backendBaseUri}/images/${event.image}`}
                            alt={event.image}
                        />
                    )
                    :
                    (
                        <img
                            className="w-full h-full rounded"
                            src="https://via.placeholder.com/64"
                            alt={event.image}
                        />
                    )}
            </td>

            <td className="w-[15%]">
                {" "}
                <span> {event.title || "Untitled"}</span>
            </td>
            <td>{'event.sold' || "0"}</td>
            <td>{'event.gross' || "$ 0"}</td>
            <td>{event.status}</td>
            <td className="relative">
                <div
                    className="cursor-pointer flex flex-col gap-[5px] justify-center items-start relative z-[10]"
                    onClick={() => setContextMenu(!contextMenu)}
                >
                    <div className="min-w-[4px] min-h-[4px] bg-[#473a3a] rounded-full"></div>
                    <div className="min-w-[4px] min-h-[4px] bg-[#473a3a] rounded-full"></div>
                    <div className="min-w-[4px] min-h-[4px] bg-[#473a3a] rounded-full"></div>
                </div>
                {contextMenu && (
                    <motion.div
                        initial={{maxHeight: 0}}
                        animate={{maxHeight: "1000px"}}
                        style={{boxShadow: "1px 2px 8px #00000030"}}
                        className="absolute bg-white z-[2000]  w-[165px] h-[139px] right-[20%] "
                    >
                        <div className="flex flex-col justify-around m-auto w-[80%] h-full">
                            <CopyToClipboard
                                text={`${window.location.origin}/events/${event.id}`}
                                onCopy={() => setContextMenu(false)}
                            >
                                <motion.p
                                    whileHover={{color: "#FB4A04"}}
                                    className="font-[400] cursor-pointer text-[16px] leading-[26px] text-[black]"
                                >
                                    Copy Event Url
                                </motion.p>
                            </CopyToClipboard>
                            <motion.p
                                onClick={() => navigate(`/events/${event.id}`)}
                                whileHover={{color: "#FB4A04"}}
                                className="font-[400] cursor-pointer text-[16px] leading-[26px] text-[black]"
                            >
                                View
                            </motion.p>

                            <motion.p
                                onClick={() => navigate(`/events/${event.id}/basic-info`)}
                                whileHover={{color: "#FB4A04"}}
                                className="font-[400] cursor-pointer text-[16px] leading-[26px] text-[black]"
                            >
                                Edit
                            </motion.p>
                            <motion.p
                                onClick={handleDeleteEvent}
                                whileHover={{color: "#FB4A04"}}
                                className="font-[400] cursor-pointer text-[16px] leading-[26px] text-[black]"
                            >
                                Delete
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </td>
        </tr>
    );
}
