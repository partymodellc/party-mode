import React, {useState, useEffect, BaseSyntheticEvent, SyntheticEvent} from "react"
import {useNavigate, useParams} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import Header from "../../component/general/Header"
import CreateEventHeader from "../../component/create-event/Header"
import {OutgoingEvent, useEvent} from "../../context/EventProvider"
import {config} from "../../config/Config"
import Button from "../../component/general/Button"
import Footer from "../../component/general/Footer"
import moment from "moment"

export default function Publish() {
    const {eventId} = useParams()
    const {getEvent, updateEventAndNav} = useEvent()
    const navigate = useNavigate()

    const [event, setEvent] = useState<OutgoingEvent>()
    const [eventImageSource, setEventImageSource] = useState<string>()
    const [publishDay, setPublishDay] = useState<string>("")
    const [publishTime, setPublishTime] = useState<string>("")

    useEffect(() => {
        if (eventId) {
            getEvent(eventId)
                .then(response => {
                    setEvent(response.data)
                    if (response.data.image) {
                        setEventImageSource(`${config.backendBaseUri}/images/${response.data.image}`)
                    }
                })
        }
    }, [setEvent])

    const handleEventRadioInput = (event: any) => {
        const {name, value} = event.target
        setEvent({
            ...event,
            [name]: value === "" ? undefined : value
        })
    }

    const handleEventPublishDayInput = (e: any) => {
        setEvent({
            ...event,
            publishDate: moment(e.target.value + " " + publishTime).toISOString(),
        })
        setPublishDay(e.target.value)
    }

    const handleEventPublishTimeInput = (e: any) => {
        setEvent({
            ...event,
            publishDate: moment(publishDay + " " + e.target.value).toISOString(),
        })
        setPublishTime(e.target.value)
    }

    const handleSaveEvent = () => {
        if (eventId) {
            updateEventAndNav(eventId, 'preview', {
                view: event?.view,
                status: event?.status
            })
        }
    }

    return (
        <>
            <Header/>
            <CreateEventHeader/>
            <div>
                {/* TODO: maybe use this? */}
                {/*<Modal*/}
                {/*    showModal={showModal}*/}
                {/*    hideShowModalHandler={() => setShowModal(false)}*/}
                {/*>*/}
                {/*    <div*/}
                {/*        className="w-[63.7463976945245vw] xsm:w-[90vw] xsm:flex-col xsm:items-start xsm:justify-center xsm:gap-[15px] h-[77px] bg-white flex justify-between items-center px-[2.5%]">*/}
                {/*        <p className="font-[700] text-[14px] text-[#231414D4] leading-[22.8px]">*/}
                {/*            Please complete setup before publishing.*/}
                {/*        </p>*/}
                {/*        <div className="flex gap-[20px]">*/}
                {/*            <p className="font-[700] text-[14px] text-[#1977F3] leading-[22.8px]">*/}
                {/*                Complete setup*/}
                {/*            </p>*/}
                {/*            <img*/}
                {/*                onClick={() => setShowModal(false)}*/}
                {/*                className="cursor-pointer"*/}
                {/*                src={`http://localhost:8000/Storage/${event?.image}`}*/}
                {/*                alt=""*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Modal>*/}
                <div className="w-[56.829971181556196vw] xsm:w-[90%] sm:w-[50%] m-auto mt-[66px]">
                    <h1 className="font-[700] text-[32px] leading-[38.73px] text-[#231414D4]">
                        Publish Events
                    </h1>

                    <div
                        className="w-full bg-[#F5F5F5] h-[198px] flex mt-[66px] xsm:flex-col sm:flex-col xsm:h-auto sm:h-auto">
                        {/* TODO: fix image layout */}
                        {/*{eventImageSource &&*/}
                        {/*    (<div*/}
                        {/*        className="w-[20.518731988472624vw] h-[50px] bg-[#D9D9D9] flex justify-center items-center xsm:w-full sm:w-full">*/}
                        {/*        <img*/}
                        {/*            className="object-fit-contain xsm:w-full sm:w-full"*/}
                        {/*            src={eventImageSource}*/}
                        {/*            alt=""*/}
                        {/*        />*/}
                        {/*    </div>)*/}
                        {/*}*/}
                        <div className="flex-1 mx-[4%] divide-y-2">
                            <div className="flex flex-col justify-around">
                                <h2 className="mt-[20px] font-[700] text-[24px] text-[#231414D4] leading-[29.05px]">
                                    {event?.title}
                                </h2>
                                {event?.startDate && (
                                    <p className="mt-[4px] font-[400] text-[16px] text-[#231414D4] leading-[19.36px]">
                                        {moment(event?.startDate).format('Do MMMM, YYYY')}
                                    </p>
                                )}
                                {/* TODO: what is this? */}
                                {/*<div className="flex items-center mt-[37px]">*/}
                                {/*    <img src="/emojione-monotone_ticket.svg" alt=""/>*/}
                                {/*    <p className="font-[400] text-[24px] text-[#231414D4] leading-[29.05px]">*/}
                                {/*        {event?.TicketId?.length}5 /*/}
                                {/*        <span className="font-[400] text-[16px] text-[#231414D4] leading-[19.36px]">*/}
                                {/*            22*/}
                                {/*        </span>*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="font-[400] my-[10px] text-[16px] text-[#1977F3] text-center leading-[19.36px]">
                                    Preview
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[52px]">
                        <h2 className="font-[700] text-[24px] leading-[29.05px] text-[#231414D4]">
                            Who can see your events?
                        </h2>
                        <div className="flex gap-[10px] mt-[35px] items-center">
                            <input
                                className="min-w-[24px] min-h-[24px]"
                                type="radio"
                                name="view"
                                value="Public"
                                checked={event?.view === "Public"}
                                onChange={handleEventRadioInput}
                            ></input>
                            <div className="flex flex-col">
                                <p className="text-[14px] leading-[16.94px] text-[#473a3a] font-[400]">
                                    Public
                                </p>
                                <p className="text-[8px] leading-[16.94px] text-[#473a3a] font-[400]">
                                    Available to everyone
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-[10px] mt-[24px] items-center">
                            <input
                                className="min-w-[24px] min-h-[24px]"
                                type="radio"
                                name="view"
                                value="Private"
                                checked={event?.view === "Private"}
                                onChange={handleEventRadioInput}
                            ></input>
                            <div className="flex flex-col">
                                <p className="text-[14px] leading-[16.94px] text-[#473a3a] font-[400]">
                                    Private
                                </p>
                                <p className="text-[8px] leading-[16.94px] text-[#473a3a] font-[400]">
                                    Available for anyone with a link
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-[70px]'>
                        <h2 className='font-[700] text-[24px] leading-[29.05px] text-[#231414D4]'>When should your event
                            be published?</h2>
                        <div className='flex gap-[10px] mt-[35px]'>
                            <input
                                className='min-w-[24px] min-h-[24px]'
                                type='radio'
                                name='status'
                                value='Published'
                                checked={event?.status === "Published"}
                                onChange={handleEventRadioInput}
                            ></input>
                            <p className='text-[14px] leading-[16.94px] text-[#473a3a] font-[400]'>Publish Now</p>
                        </div>
                        <div className='flex gap-[10px] mt-[24px]'>
                            <input
                                className='min-w-[24px] min-h-[24px]'
                                type='radio'
                                name='status'
                                value='Scheduled'
                                checked={event?.status === "Scheduled"}
                                onChange={handleEventRadioInput}
                            ></input>
                            <p className='text-[14px] leading-[16.94px] text-[#473a3a] font-[400]'>Schedule Later</p>
                        </div>
                    </div>

                    {event?.status == 'Scheduled' && (
                        <div className="flex gap-[20px] mt-[18px] xsm:flex-col sm:flex-col">
                            <div
                                className='py-[10px] flex flex-col  pl-[18px] outline-none flex-1 h-[58px] border-[1px] border-[#231414D4] font-[400] text-[12px] leading-[19.55px]'>
                                {/*className='relative w-[13.371757925072046vw] min-w-[170px] h-[51px] bg-[#F5F5F5] flex justify-center items-center gap-[43px]'>*/}
                                {/*<img className='absolute left-[10%]' src='/calendar.svg' alt=''></img>*/}
                                {/*<div className='flex flex-col items-center justify-center'>*/}
                                {/*    <p className='font-[400] text-[14px] text-[#231414D4] leading-[22.8px]'>Date</p>*/}
                                {/*    <p className='font-[400] text-[14px] text-[#231414D4] leading-[22.8px]'>01/11/2022</p>*/}
                                {/*</div>*/}
                                <label className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4]">
                                    Schedule Date
                                </label>
                                <input
                                    onChange={handleEventPublishDayInput}
                                    value={publishDay}
                                    name="startDay"
                                    type="date"
                                ></input>
                            </div>
                            {/*<div*/}
                            {/*    className='w-[13.371757925072046vw] min-w-[170px] h-[51px] bg-[#F5F5F5] flex justify-center items-center gap-[43px]'>*/}
                            {/*    <div className='flex flex-col items-center justify-center'>*/}
                            {/*        <p className='font-[400] text-[14px] text-[#231414D4] leading-[22.8px]'>Time</p>*/}
                            {/*        <p className='font-[400] text-[14px] text-[#231414D4] leading-[22.8px]'>00:00pm</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div
                                className="py-[10px] flex flex-col pl-[18px] outline-none flex-1 h-[58px] border-[1px] border-[#231414D4] font-[400] text-[12px] leading-[19.55px]">
                                <label className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4]">
                                    Schedule Time
                                </label>
                                <input
                                    onChange={handleEventPublishTimeInput}
                                    value={publishTime}
                                    name="startTime"
                                    type="time"
                                ></input>
                            </div>
                        </div>
                    )}

                    <div
                        className="mt-[94px] xsm:w-[100%] xsm:items-center xsm:ml-0 flex gap-[20px] justify-end mb-[203px] xsm:flex-col-reverse sm:flex-col-reverse">
                        <Button
                            whileHover={{background: "#eece93", color: "#ffffff", scale: 1.03}}
                            width="229px"
                            height="65px"
                            text="Back"
                            style={{
                                background: "#ffffff",
                                color: "#eece93",
                                border: "1px solid #231414D4",
                                borderRadius: "10px",
                                fontSize: "24px",
                                lineHeight: "39.09px",
                            }}
                            onClick={() => navigate(`/events/${eventId}/tickets`)}
                        />
                        <Button
                            whileHover={{
                                background: "#ffffff",
                                color: "#eece93",
                                scale: 1.03,
                                border: "1px solid #eece93",
                            }}
                            width="229px"
                            height="65px"
                            text="Save"
                            style={{
                                background: "#eece93",
                                color: "#ffffff",
                                borderRadius: "10px",
                                fontSize: "24px",
                                lineHeight: "39.09px",
                            }}
                            onClick={handleSaveEvent}
                        />
                    </div>
                </div>
            </div>
            <Footer showFooterHeaders={false} />
        </>
    )
}
