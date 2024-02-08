import React from 'react'
import Button from '../../component/general/Button'
import Footer from '../../component/general/Footer'
import {motion} from "framer-motion"
import Header from "../../component/general/Header"

export default function Home() {
    return (
        <>
            <Header/>
            <main>
                <div className='mt-[50px] flex xsm:flex-col-reverse sm:flex-col-reverse'>
                    <div
                        className='flex flex-col xsm:items-center sm:items-center justify-center ml-[3.515850144092219vw] xsm:mt-[40px] sm:mt-[40px]'>
                        <h1 className='eventTextFont xsm:text-center sm:text-center w-[40.23054755043228vw] xsm:w-[90%] sm:w-[80%] font-[400] text-[clamp(36px,5.53314121037464vw,96px)] xsm:leading-[60px] sm:leading-[60px] leading-[113px] text-[#231414D4]'>Welcome
                            To <span className='eventTextFont text-[#FB4A04C2]'>Party Mode</span> Community</h1>
                        {/*<Link to="/community-join">*/}
                        <Button whileHover={{background: "#FB4A04", color: "#fff"}} width='16.829971181556196vw'
                                height='88px' text='Coming Soon' style={{
                            fontSize: "clamp(18px,2.07492795389049vw,32px)",
                            minWidth: "240px",
                            background: "transparent",
                            border: "3px solid #FB4A04",
                            color: "#FB4A04",
                            borderRadius: "0px",
                            marginTop: "3.6311239193083575vw"
                        }}/>
                        {/*</Link>*/}
                    </div>
                    <div>
                        <motion.img
                            initial={{opacity: 0, scale: 0.1}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className='xsm:mt-[20px] sm:mt-[20px]' src='/community1.png'
                        />
                    </div>
                </div>

                <div className='relative flex mt-[250px] xsm:flex-col sm:flex-col'>
                    <motion.img
                        className='absolute top-[80%] z-[100] w-[12.795389048991355vw] min-w-[150px] xsm:top-[-10%] sm:top-[-10%]'
                        src='/design2.svg'
                    >
                    </motion.img>
                    <div>
                        <motion.img
                            initial={{opacity: 0, scale: 0.1}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className='relative z-[1000] ml-[3.6887608069164264vw] xsm:ml-0 sm:ml-0'
                            src='/community2.svg'/>
                    </div>
                    <div
                        className='flex-1 flex flex-col justify-center items-center ml-[3.515850144092219vw] xsm:mt-[20px] sm:mt-[20px]'>
                        <div>
                            <h2 className='font-[700] text-[clamp(24px,2.76657060518732vw,48px)] text-[#231414D4] leading-[78.19px] xsm:w-[90%] sm:w-[80%]'>GET
                                LATEST TRENDS</h2>
                            <p className='font-[400] text-[clamp(14px,1.38328530259366vw,24px)] text-[#231414D4] leading-[39.09px] xsm:leading-[28px] sm:leading-[28px] w-[553px] mt-[1.7867435158501441vw] xsm:w-[90%] sm:w-[80%]'>"Lorem
                                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                        </div>
                    </div>
                </div>

                <div
                    className='relative flex mt-[54px] xsm:flex-col-reverse sm:flex-col-reverse xsm:mt-[120px] sm:mt-[120px]'>
                    <img
                        className='absolute right-0 top-[90%] z-[100] w-[21.498559077809798vw] min-w-[220px] xsm:top-[-10%] sm:top-[-10%]'
                        src='/design1.svg'></img>
                    <div
                        className='flex-1 flex flex-col justify-center items-center ml-[3.515850144092219vw] xsm:mt-[20px] sm:mt-[20px]'>
                        <div>
                            <h2 className='font-[700] text-[clamp(24px,2.76657060518732vw,48px)] text-[#231414D4] xsm:leading-[38px] sm:leading-[38px] leading-[78.19px] xsm:w-[90%] sm:w-[80%]'>SURF
                                THE VIBE WORLD</h2>
                            <p className='font-[400] text-[clamp(14px,1.38328530259366vw,24px)] text-[#231414D4] leading-[39.09px] xsm:leading-[28px] sm:leading-[28px] w-[553px] mt-[1.7867435158501441vw] xsm:w-[90%] sm:w-[80%]'>"Lorem
                                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                        </div>
                    </div>
                    <div>
                        <motion.img
                            initial={{opacity: 0, scale: 0.1}}
                            viewport={{once: true}}
                            whileInView={{opacity: 1, scale: 1}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className='relative z-[1000] mr-[3.6887608069164264vw] xsm:mr-0 sm:mr-0' src='/pana.svg'/>
                    </div>
                </div>

                <div className='flex mt-[242px] mb-[154px] xsm:flex-col sm:flex-col'>
                    <div>
                        <motion.img
                            viewport={{once: true}}
                            initial={{opacity: 0, scale: 0.1}}
                            whileInView={{opacity: 1, scale: 1}}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className='ml-[3.6887608069164264vw] xsm:ml-0 sm:ml-0' src='/community3.svg'/>
                    </div>
                    <div
                        className='flex-1 flex flex-col justify-center items-center ml-[3.515850144092219vw] xsm:mt-[20px] sm:mt-[20px]'>
                        <div>
                            <h2 className='font-[700] text-[clamp(24px,2.76657060518732vw,48px)] text-[#231414D4]  leading-[78.19px] xsm:w-[90%] sm:w-[80%]'>Connect</h2>
                            <p className='font-[400] text-[clamp(14px,1.38328530259366vw,24px)] text-[#231414D4] leading-[39.09px] xsm:leading-[28px] sm:leading-[28px] w-[553px] mt-[1.7867435158501441vw] xsm:w-[90%] sm:w-[80%]'>"Lorem
                                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer showFooterHeaders={false}/>
        </>
    )
}