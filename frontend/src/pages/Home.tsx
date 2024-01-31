import Carousel from '../component/EventDescriptions/Carousel'
import EventCards from '../component/Events/EventCards'
import Footer from '../component/general/Footer'
import Button from '../component/general/Button'
import {Link} from "react-router-dom"
import './Style.css'
import Header from '../component/general/Header'
import {useEvent} from "../context/EventProvider"
import {useEffect} from "react";

type Props = {}

let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2.3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2.3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }
    ]
}

let carouselData = [
    {
        id: "1",
        image: "./EventCrousal1.png",
    },
    {
        id: "2",
        image: "./EventCrousal2.png",
    },
    {
        id: "3",
        image: "./EventCrousal1 copy.png",
    },
]

settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2.3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2.3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }
    ]
}

export default function Home({}: Props) {
    const {allEvents, getAllEvents} = useEvent()

    useEffect(() => {
        getAllEvents()
    }, [])

    return (
        <>
            <Header/>
            <div className='w-[calc(100vw - 100%)] '>
                <div className='relative'>
                    <section className='eventsMainBackground h-[778px] w-[100%] flex relative '>
                        <div
                            className='flex flex-col justify-center absolute top-[39%] left-[65.24495677233429vw] xsm:left-[10vw] sm:left-[50vw]'>
                            <h1 className="mb-[23px] eventTextFont w-[28.587896253602306vw] min-w-[260px] font-[400] text-[clamp(48px,5.53314121037464vw,96px)] xsm:leading-[45px] sm:leading-[45px] leading-[113px] text-[#ffffff]">NOW <span
                                className='eventTextFont text-[clamp(32px,3.6887608069164264vw,64px)]'>IS YOUR</span> TIME
                            </h1>
                            <Link to='/community'>
                                <Button initial={{scale: 1, backgroundColor: '#FB4A04', color: "#fff"}} whileHover={{
                                    scale: 1.02,
                                    backgroundColor: "#ffffff",
                                    border: "3px solid #FB4A04",
                                    color: "#FB4A04"
                                }} width={"17.75vw"} height={"61px"} text={"Find your next Event"}
                                        style={{minWidth: "240px"}}/>
                            </Link>
                        </div>
                    </section>

                    <div
                        className='bg-white relative top-[-28px] p-[14px] eventDivBoxShadow w-[85.76368876080691vw] m-auto'>
                        <div className='pt-[5px] pb-[18px] pl-[10px] border-l-[2px] border-[#FB4A04]'>
                            <h2 className='mb-[8px] font-[700] text-[clamp(16px,1.38328530259366vw,24px)] leading-[40px] text-[#473a3a]'>
                                Do events help you find connection?
                            </h2>
                            <p className='font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] w-[100%] leading-[26px] text-[#473a3a]'>
                                Help us understand how attending events contributes to building social connection by
                                taking a short survey before and after your next event.
                            </p>
                        </div>
                    </div>

                    <section id='checkin' style={{marginTop: "40px"}}>
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className="font-[700] text-[clamp(20px,2.07492795389049vw,36px)] leading-[58.64px] text-[#473a3a]">
                                Check out trending categories
                            </h2>
                            <hr className='mt-[23px] w-[232px] !h-[2px] border-[#FB4A04] !p-0'></hr>
                        </div>
                    </section>

                    <section className='mt-[160px] xsm:w-full sm:w-full md:w-full lg:w-full m-auto w-full'>
                        <EventCards mainText='Christmas🎅' data={allEvents}/>
                    </section>

                    <section className='mt-[93px] xsm:w-full sm:w-full md:w-full lg:w-full m-auto w-full'>
                        <EventCards mainText='Festivals' data={allEvents}/>
                    </section>

                    <section className='mt-[93px] xsm:w-full sm:w-full md:w-full lg:w-full m-auto w-full'>
                        <EventCards mainText='Electronic' data={allEvents}/>
                    </section>

                    <section className='mt-[93px] xsm:w-full sm:w-full md:w-full lg:w-full m-auto w-full'>
                        <EventCards mainText='Pop Culture' data={allEvents}/>
                    </section>

                    <section className='mt-[93px] xsm:w-full sm:w-full md:w-full lg:w-full m-auto w-full'>
                        <EventCards mainText='Music Venues' data={allEvents}/>
                    </section>

                    <section className='mt-[93px] xsm:w-full sm:w-full md:w-full lg:w-full m-auto w-full'>
                        <EventCards mainText='Music Venues' data={allEvents}/>
                    </section>

                    <section className='mt-[93px] xsm:w-full sm:w-full md:w-full lg:w-full m-auto w-full'>
                        <EventCards mainText='Miami' data={allEvents}/>
                    </section>

                    <section className='mb-[216px]'>
                        <div className='mb-[45px] mt-[60px]     w-[86.1671469740634vw] m-auto'>
                            <h2 className='font-[700] text-[clamp(20px,2.07492795389049vw,36px)] leading-[58.64px] text-[#473a3a]'>
                                Other Categories
                            </h2>
                        </div>
                        <div className='overflow-hidden'>
                            <Carousel maxWidth={'728px'} width={"41.95965417867435vw"} settings={settings}
                                      carouselData={carouselData} classes="min-w-[280px]"/>
                        </div>
                        <div className='w-[86.1671469740634vw] m-auto'>
                            <hr className='mt-[23px] w-[119px] !h-[2px] border-[#FB4A04] !p-0'></hr>
                        </div>
                    </section>
                </div>
            </div>
            <Footer/>
        </>
    )
}