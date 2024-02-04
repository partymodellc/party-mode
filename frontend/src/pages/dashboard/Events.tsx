import Sidebar from "../../component/dashboard/Sidebar"
import EventsOrdersNav from "../../component/dashboard/EventsOrdersNav"
import Search from "../../component/general/Search"
import {Link} from "react-router-dom"
import Button from "../../component/general/Button"
import TableRow from "../../component/dashboard/TableRow"
import React, {BaseSyntheticEvent, useEffect, useState} from "react"
import {IncomingEvent, useEvent} from "../../context/EventProvider"
import {useAuth} from "../../context/AuthProvider"

export default function Events() {
    const {user} = useAuth()
    const {getUserEvents, createEventAndNav} = useEvent()

    const [userEvents, setUserEvents] = useState<IncomingEvent[]>()
    const [filteredEvents, setFilteredEvents] = useState<IncomingEvent[]>()

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
                <EventsOrdersNav/>
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
            </div>
        </Sidebar>
    )
}