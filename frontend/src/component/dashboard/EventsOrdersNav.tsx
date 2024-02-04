import {NavLink} from 'react-router-dom'
import {motion} from "framer-motion"
import 'react-toastify/dist/ReactToastify.css'

export default function EventsOrdersNav() {

    return (
        <div className='transition-all flex gap-[20px] mt-[29px] mb-[84px]'>
            <NavLink end
                     className={({isActive}) => isActive ? "border-b-[1px] border-[#473a3a] py-[10px]" : "py-[10px]"}
                     to={"/dashboard/events"}>
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
                >
                    Events
                </motion.button>
            </NavLink>
            <NavLink end
                     className={({isActive}) => isActive ? "border-b-[1px] border-[#473a3a] py-[10px]" : "py-[10px]"}
                     to={"/dashboard/orders"}>
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
                >
                    Orders
                </motion.button>
            </NavLink>
        </div>
    )
}