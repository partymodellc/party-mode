import React from 'react'
import {Link} from 'react-router-dom'
import {OutgoingEvent, OutgoingTicket} from "../../context/EventProvider"

type Props = {
    outgoingEvent: OutgoingEvent
    outgoingTickets: OutgoingTicket[]
    activePage: string
    eventId?: string
}

export default function CreateEventNav({outgoingEvent, outgoingTickets, activePage, eventId}: Props) {
    return (
        <div>
            <nav className='w-full h-[63px] bg-[#0252ED]'>
                <ul className='flex gap-[3.0547550432276656vw] items-center justify-center h-full'>
                    <Link
                        className={activePage == 'basic-info' ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}
                        to={eventId ? `/events/${eventId}/basic-info` : '/events/basic-info'}
                        state={{outgoingEvent: outgoingEvent, outgoingTickets: outgoingTickets}}
                    >
                        <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>
                            Basic Info
                        </li>
                    </Link>
                    <Link
                        className={activePage == 'details' ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}
                        to={eventId ? `/events/${eventId}/details` : '/events/details'}
                        state={{outgoingEvent: outgoingEvent, outgoingTickets: outgoingTickets}}
                    >
                        <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>Details</li>
                    </Link>
                    <Link
                        className={activePage == 'tickets' ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}
                        to={eventId ? `/events/${eventId}/tickets` : '/events/tickets'}
                        state={{outgoingEvent: outgoingEvent, outgoingTickets: outgoingTickets}}
                    >
                        <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>Tickets</li>
                    </Link>
                    <Link
                        className={activePage == 'publish' ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}
                        to={eventId ? `/events/${eventId}/publish` : '/events/publish'}
                        state={{outgoingEvent: outgoingEvent, outgoingTickets: outgoingTickets}}
                    >
                        <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>Publish</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}