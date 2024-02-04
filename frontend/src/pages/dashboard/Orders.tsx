import Sidebar from "../../component/dashboard/Sidebar"
import EventsOrdersNav from "../../component/dashboard/EventsOrdersNav"
import Search from "../../component/general/Search"
import {motion} from "framer-motion"
import OrderRow from "../../component/EventDescriptions/OrderRow"
import React, {useEffect, useState} from "react"
import axios from "axios";

export default function Events() {
    const [availOrders, setAvailOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const resp = await axios.get('http://localhost:8000/orders/all-orders')
            setAvailOrders(resp.data)
        }
        fetchOrders()

    }, [])

    return (
        <Sidebar>
            <div className='w-full pt-[65px] ml-[9.682997118155619vw] xsm:ml-[4vw] sm:ml-[6vw] md:ml-[7vw]'>
                <h1 className='font-[700] text-[clamp(20px,2.07492795389049vw,36px)] leading-[58px] text-[#473a3a] ml-[10px]'>Orders</h1>
                <EventsOrdersNav/>
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
            </div>
        </Sidebar>
    )
}