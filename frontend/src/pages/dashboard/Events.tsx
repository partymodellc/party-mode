import Sidebar from "../../component/dashboard/Sidebar"
import Search from "../../component/general/Search"
import {Link, NavLink} from "react-router-dom"
import Button from "../../component/general/Button"
import TableRow from "../../component/dashboard/TableRow"
import React, {BaseSyntheticEvent, useEffect, useState} from "react"
import {IncomingEvent, useEvent} from "../../context/EventProvider"
import {useAuth} from "../../context/AuthProvider"
import {motion} from "framer-motion";
import OrderRow from "../../component/EventDescriptions/OrderRow";

export default function Events() {
    const {user} = useAuth()
    const {getUserEvents, createEventAndNav} = useEvent()

    const [showEventsOrOrders, setShowEventsOrOrders] = useState<boolean>(true)
    const [userEvents, setUserEvents] = useState<IncomingEvent[]>()
    const [filteredEvents, setFilteredEvents] = useState<IncomingEvent[]>()
    const [availOrders, setAvailOrders] = useState([])

    const toggleEventsOrders = (e: BaseSyntheticEvent) => {
        if (e.target.name === "events") {
            setShowEventsOrOrders(true)
        } else {
            setShowEventsOrOrders(false)
        }
    }

    useEffect(() => {
        if (user) {
            getUserEvents(user.id)
                .then(response => {
                    setUserEvents(response.data)
                    setFilteredEvents(response.data)
                })
        }
    }, [])

    const filterEvents = (e: BaseSyntheticEvent) => {
        if (e.target.value) {
            setFilteredEvents(userEvents?.filter((event) => {
                return event.title?.includes(e.target.value)
            }))
        } else {
            setFilteredEvents(userEvents)
        }
    }

    return (
        <Sidebar>
            <div className='w-full pt-[65px] ml-[9.682997118155619vw] xsm:ml-[4vw] sm:ml-[6vw] md:ml-[7vw]'>
                <h1 className='font-[700] text-[clamp(20px,2.07492795389049vw,36px)] leading-[58px] text-[#473a3a] ml-[10px]'>Events</h1>

                {/* events and orders switch */}
                <div className='transition-all flex gap-[20px] mt-[29px] mb-[84px]'>
                    <div className={showEventsOrOrders ? "border-b-[1px] border-[#473a3a] py-[10px]" : "py-[10px]"}>
                        <motion.button
                            className='w-[69.03px] h-[36px] font-[700] text-[16px] leading-[26px] text-[#473a3a]'
                            initial={{opacity: 0, scale: 0.1,}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            whileHover={{color: "#FB4A04"}}
                            name="events"
                            onClick={toggleEventsOrders}
                        >
                            Events
                        </motion.button>
                    </div>
                    <div className={!showEventsOrOrders ? "border-b-[1px] border-[#473a3a] py-[10px]" : "py-[10px]"}>
                        <motion.button
                            className='w-[69.03px] h-[36px] font-[700] text-[16px] leading-[26px] text-[#473a3a]'
                            initial={{opacity: 0, scale: 0.1,}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            whileHover={{color: "#FB4A04"}}
                            name="orders"
                            onClick={toggleEventsOrders}
                        >
                            Orders
                        </motion.button>
                    </div>
                </div>

                {/* events */}
                {showEventsOrOrders && (
                    <div>
                        <div className='w-full xsm:w-[75.93659942363112vw] sm:w-[75.93659942363112vw]'>
                            <div className='flex gap-[20px] xsm:flex-col sm:flex-col'>
                                <Search
                                    whileHover={{scale: 1.03}}
                                    style={{
                                        width: "27.780979827089336vw",
                                        height: "47px",
                                        borderRadius: "0px",
                                        border: "3px solid #f6ccbb",
                                        minWidth: "240px"
                                    }}
                                    onChangeHandler={filterEvents}
                                />
                                <Link to="" onClick={createEventAndNav}>
                                    <Button initial={{
                                        scale: 1.03,
                                        background: "#FB4A04",
                                        border: "0px solid #fff",
                                        color: "#fff"
                                    }}
                                            whileHover={{
                                                scale: 1.03,
                                                background: "#fff",
                                                border: "1px solid #FB4A04",
                                                color: "#FB4A04"
                                            }} width='150px' height='47px' text="Create Event"
                                            style={{borderRadius: "0px", fontSize: "16px"}}></Button>
                                </Link>
                            </div>

                            {(filteredEvents?.length || 0) !== 0 ? (
                                <div
                                    className='w-full whitespace-nowrap xsm:overflow-auto sm:overflow-auto md:overflow-auto'>
                                    <table
                                        className="table-auto w-[78.32853025936599vw] min-w-[500px] mt-[83px] relative z-10">
                                        <thead className='bg-[#fed4c3]'>
                                        <tr className='text-left'>
                                            <th className='py-[17px]'>#</th>
                                            <th className='py-[17px]'>Event Image</th>
                                            <th className='py-[17px]'>Name</th>
                                            <th className='py-[17px]'>Sold</th>
                                            <th className='py-[17px]'>Gross</th>
                                            <th className='py-[17px]'>Status</th>
                                            <th className='py-[17px]'>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className='divide-y-2 w-[78.32853025936599vw]'>
                                        {(filteredEvents?.length || 0) > 0 && filteredEvents?.map((event: IncomingEvent, index: number) => {
                                            return (<TableRow key={event.id} event={event} index={index}/>)
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className='w-[78.32853025936599vw] flex justify-center items-center'>
                                    <div className='mt-[129px] flex flex-col justify-center items-center'>
                                        <img src='/noData.png' alt=''/>
                                        <p className='mt-[32px] font-[400] text-[16px] leading-[26px] text-[#949494]'>
                                            No Events
                                        </p>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                )}

                {/* orders */}
                {!showEventsOrOrders && (
                    <div>
                        <div>
                            <div className='flex gap-[20px] xsm:flex-col sm:flex-col mb-[121px]'>
                                <Search whileHover={{scale: 1.03}} text='Search  Order number ,email or name' style={{
                                    width: "28.472622478386167vw",
                                    minWidth: "240px",
                                    fontSize: "14px",
                                    height: "47px",
                                    borderRadius: "0px",
                                    border: "1px solid #473a3a",
                                }}/>

                                <motion.div whileHover={{scale: 1.03}}
                                            className='w-[13.314121037463977vw] flex flex-col border-[1px] border-[#473a3a] xsm:min-w-[240px]'>
                                    <label className='text-[12px] font-[400] leading-[19px] text-[#473a3a] mx-[24px]'>Search
                                        by</label>
                                    <select
                                        className='indent-[20px] outline-none text-[16px] font-[400] leading-[26px] text-[#473a3a]'>
                                        <option>Buyer</option>
                                        <option>Atendees</option>
                                    </select>
                                </motion.div>

                                <motion.div whileHover={{scale: 1.03}}
                                            className='w-[13.314121037463977vw] flex flex-col border-[1px] border-[#473a3a] xsm:min-w-[240px]'>
                                    <label className='text-[12px] font-[400] leading-[19px] text-[#473a3a] mx-[24px]'>Data
                                        Range</label>
                                    <select
                                        className='indent-[20px] outline-none text-[16px] font-[400] leading-[26px] text-[#473a3a]'>
                                        <option>past 3 month</option>
                                        <option>7 days</option>
                                        <option>1 month</option>
                                    </select>
                                </motion.div>
                            </div>

                            <div className='divide-y-2 w-[78.55907780979827vw] flex flex-col xsm:min-w-[240px]'>
                                {availOrders.map((d: any) => {
                                    return (
                                        <OrderRow data={d}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Sidebar>
    )
}