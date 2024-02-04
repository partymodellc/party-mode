import React from 'react'
import {NavLink} from 'react-router-dom'
import {motion} from "framer-motion"
import Sidebar from "../../../component/dashboard/Sidebar";

type Props = {}

export default function Settings({}: Props) {
    return (
        <Sidebar>
            <div className='w-full pt-[65px] ml-[6.916426512968299vw] xsm:ml-[4vw] sm:ml-[6vw] md:ml-[7vw]'>
                <h1 className='font-[700] text-[clamp(20px,2.07492795389049vw,36px)] leading-[58px] xsm:leading-[30px] text-[#473a3a] ml-[10px] xsm:w-[80%]'>
                    Organisation Settings
                </h1>
                <div className='overflow-auto mt-[29px] mb-[84px] xsm:w-[74vw] w-full min-w-[220px]'>
                    <div className='transition-all flex gap-[20px] whitespace-nowrap'>
                        <NavLink end
                                 className={({isActive}) => isActive ? "border-b-[1px] border-[#473a3a] py-[10px]" : "py-[10px]"}
                                 to={"/setting"}>
                            <motion.button initial={{opacity: 0, scale: 0.1,}}
                                           whileInView={{opacity: 1, scale: 1}}
                                           viewport={{once: true}}
                                           transition={{
                                               duration: 0.4,
                                               delay: 0.1,
                                               ease: [0, 0.71, 0.2, 1.01]
                                           }}
                                           className=' h-[36px] font-[700] text-[16px] leading-[26px] text-[#473a3a]'>Profile
                                Edit
                            </motion.button>
                        </NavLink>
                        <NavLink end
                                 className={({isActive}) => isActive ? "border-b-[1px] border-[#473a3a] py-[10px]" : "py-[10px]"}
                                 to={"/setting/invite-team"}>
                            <motion.button initial={{opacity: 0, scale: 0.1,}}
                                           whileInView={{opacity: 1, scale: 1}}
                                           viewport={{once: true}}
                                           transition={{
                                               duration: 0.4,
                                               delay: 0.1,
                                               ease: [0, 0.71, 0.2, 1.01]
                                           }}
                                           className=' h-[36px] font-[700] text-[16px] leading-[26px] text-[#473a3a]'>Invite
                                Team members
                            </motion.button>
                        </NavLink>
                        <NavLink end
                                 className={({isActive}) => isActive ? "border-b-[1px] border-[#473a3a] py-[10px]" : "py-[10px]"}
                                 to={"/setting/app-installation"}>
                            <motion.button initial={{opacity: 0, scale: 0.1,}}
                                           whileInView={{opacity: 1, scale: 1}}
                                           viewport={{once: true}}
                                           transition={{
                                               duration: 0.4,
                                               delay: 0.1,
                                               ease: [0, 0.71, 0.2, 1.01]
                                           }}
                                           className=' h-[36px] font-[700] text-[16px] leading-[26px] text-[#473a3a]'>App
                                Installations
                            </motion.button>
                        </NavLink>
                    </div>
                </div>
                <div>

                    <div
                        className='w-[38.38616714697406vw] xsm:w-[78vw] sm:w-[70vw] md:w-[70vw] ml-[7.3198847262247835vw] xsm:ml-0'>
                        <h2 className='font-[700] text-[20px] leading-[32.58px] text-[#231414D4]'>Organisation </h2>
                        <p className='mt-[5px] font-[700] text-[16px] leading-[26.06px] text-[#231414D4]'>
                            Details that apply across your events and venues</p>
                        <div
                            className='flex flex-col justify-center gap-[10px] items-center mt-[18px] w-[22.59365994236311vw] xsm:w-[90%] sm:w-[80%] md:w-[70%] h-[336px] bg-[#F5F5F5] rounded-[10px]'>
                            <img src='./editProfile1.svg' alt=''/>
                            <h3 className='text-center font-[700] text-[16px] leading-[26.06px] text-[#231414D4]'>
                                Company Brand Logo or image</h3>
                            <p className='text-center w-[230px] font-[400] text-[14px] leading-[22.8px] text-[#231414D4]'>
                                Drag and drop JPEG,PNG no longer than 10 mb</p>
                        </div>

                        <motion.input
                            whileHover={{scale: 1.03}}
                            className='indent-[28px] mt-[102px] font-[400] text-[16px] leading-[26.06px] text-[#231414D4] border-[1px] border-[#231414D4] w-full xsm:w-[90%] sm:w-[80%] md:w-[70%] h-[68px]'
                            placeholder='Organisation name'
                        />
                        <motion.select
                            whileHover={{scale: 1.03}}
                            className='indent-[28px] mt-[102px] mb-[39px] font-[400] text-[16px] leading-[26.06px] text-[#231414D4] border-[1px] border-[#231414D4] w-full xsm:w-[90%] sm:w-[80%] md:w-[70%] h-[68px]'
                        >
                            <option>Preferred Country</option>
                            <option>Preferred Country</option>
                        </motion.select>
                    </div>

                </div>
            </div>
        </Sidebar>
    )
}