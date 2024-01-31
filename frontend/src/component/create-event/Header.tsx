import React from 'react'
import {NavLink, Outlet, useParams} from 'react-router-dom'

export default function Header() {
    const {eventId} = useParams()

    return (
        <div>
            <nav className='w-full h-[63px] bg-[#FB4A04]'>
                <ul className='flex gap-[3.0547550432276656vw] items-center justify-center h-full'>
                    <NavLink end
                             className={({isActive}) => isActive ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}
                             to={`/events/${eventId}/basic-info`}>
                        <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>Basic
                            Info
                        </li>
                    </NavLink>
                    <NavLink end
                             className={({isActive}) => isActive ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}
                             to={`/events/${eventId}/details`}>
                        <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>Details</li>
                    </NavLink>
                    {/* TODO: support online event page features */}
                    {/*<NavLink end*/}
                    {/*         className={({isActive}) => isActive ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}*/}
                    {/*         to={`/create-event/online-page-event`}>*/}
                    {/*    <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>Online*/}
                    {/*        Event Page*/}
                    {/*    </li>*/}
                    {/*</NavLink>*/}
                    <NavLink end
                             className={({isActive}) => isActive ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}
                             to={`/events/${eventId}/tickets`}>
                        <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>Tickets</li>
                    </NavLink>
                    <NavLink end
                             className={({isActive}) => isActive ? "border-b-[2px] border-white p-[5px] transition-all" : "border-b-[2px] border-transparent p-[5px] transition-all"}
                             to={`/events/${eventId}/publish`}>
                        <li className='font-[400] text-[15px] xsm:text-[8px] leading-[24.43px] text-[#FFFFFF]'>Publish</li>
                    </NavLink>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}