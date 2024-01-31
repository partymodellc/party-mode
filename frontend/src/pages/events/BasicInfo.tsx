import React, {useEffect, useState} from "react"
import Button from "../../component/general/Button"
import {useNavigate, useParams} from "react-router-dom"
import moment from "moment"
import "react-toastify/dist/ReactToastify.css"
import Header from '../../component/general/Header'
import Footer from '../../component/general/Footer'
import CreateEventHeader from '../../component/create-event/Header'
import {IncomingEvent, OutgoingEvent, useEvent} from "../../context/EventProvider"

export default function BasicInfo() {
    const {eventId} = useParams()
    const {getEvent, updateEventAndNav} = useEvent()
    const navigate = useNavigate()

    const [eventInfo, setEventInfo] = useState<OutgoingEvent>({})
    const [startDay, setStartDay] = useState<string>("")
    const [startTime, setStartTime] = useState<string>("")
    const [endDay, setEndDay] = useState<string>("")
    const [endTime, setEndTime] = useState<string>("")

    useEffect(() => {
        if (eventId) {
            getEvent(eventId)
                .then(response => {
                    setEventInfo(response.data)
                    setStartDay(moment(response.data.startDate).format("YYYY-MM-DD"))
                    setStartTime(moment(response.data.startDate).format("hh:mm"))
                    setEndDay(moment(response.data.endDate).format("YYYY-MM-DD"))
                    setEndTime(moment(response.data.endDate).format("hh:mm"))
                })
        }
    }, [setEventInfo, setStartDay, setStartTime, setEndDay, setEndTime])

    const handleEventInfoInput = (e: any) => {
        let {name, value} = e.target
        setEventInfo({
            ...eventInfo,
            [name]: value === "" ? undefined : value
        })
    }

    const handleEventAddressInput = (e: any) => {
        setEventInfo({
            ...eventInfo,
            location: {
                ...eventInfo.location,
                [e.target.name]: e.target.value,
            },
        })
    }

    const handleEventStartDayInput = (e: any) => {
        setEventInfo({
            ...eventInfo,
            startDate: moment(e.target.value + " " + startTime).toISOString(),
        })
        setStartDay(e.target.value)
    }

    const handleEventStartTimeInput = (e: any) => {
        setEventInfo({
            ...eventInfo,
            startDate: moment(startDay + " " + e.target.value).toISOString(),
        })
        setStartTime(e.target.value)
    }

    const handleEventEndDayInput = (e: any) => {
        setEventInfo({
            ...eventInfo,
            endDate: moment(e.target.value + " " + endTime).toISOString(),
        })
        setEndDay(e.target.value)
    }

    const handleEventEndTimeInput = (e: any) => {
        setEventInfo({
            ...eventInfo,
            endDate: moment(endDay + " " + e.target.value).toISOString(),
        })
        setEndTime(e.target.value)
    }

    const saveAndContinue = () => {
        if (eventId) {
            updateEventAndNav(eventId, "details", {
                title: eventInfo.title,
                type: eventInfo.type,
                category: eventInfo.category,
                tags: eventInfo.tags,
                location: eventInfo.location,
                startDate: eventInfo.startDate,
                endDate: eventInfo.endDate
            })
        }
    }

    return (
        <>
            <Header/>
            <CreateEventHeader/>
            <div>
                <div className="w-[50.72161383285302vw] xsm:w-[90vw] sm:w-[80vw] m-auto divide-y-2">

                    {/* basic info */}
                    <div className="mt-[44px]">
                        <div className="flex gap-[25px] items-center">
                            <img src="/createEvent1.svg"/>
                            <h2 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4]">
                                Basic Info
                            </h2>
                        </div>
                        <div className="ml-[75px] mt-[28px]">
                            <p className="font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">
                                Name your event and tell event-goers why they should come. Add
                                details that highlight what makes it unique.
                            </p>
                            <textarea
                                className="w-[100%] xsm:w-[100%] sm:w-[90%] h-[58px] border-[1px] border-b-0 border-[#231414D4] font-[400] text-[12px] leading-[19.55px] text-[#231414D4] indent-[16px] pt-[8px] outline-none mt-[12px]"
                                placeholder="Event Title"
                                name="title"
                                onChange={handleEventInfoInput}
                                value={eventInfo.title}
                            ></textarea>
                            <div
                                className="w-[27.723342939481267vw] xsm:w-[100%] sm:w-[100%] mt-[20px] w-[100%] flex gap-[1.2680115273775217vw] xsm:gap-[20px] sm:gap-[20px] xsm:flex-col sm:flex-col">
                                <select
                                    onChange={handleEventInfoInput}
                                    value={eventInfo.type}
                                    defaultValue={"event-type"}
                                    name="type"
                                    className="pl-[18px] outline-none flex-1 min-h-[58px] border-[1px] border-b-0 border-[#231414D4] font-[400] text-[12px] leading-[19.55px]"
                                >
                                    <option value="event-type" disabled>Event Type</option>
                                    <option>Horror</option>
                                    <option>Fun</option>
                                </select>
                                <select
                                    onChange={handleEventInfoInput}
                                    value={eventInfo.category}
                                    defaultValue={"event-category"}
                                    name="category"
                                    className="pl-[18px] outline-none flex-1 min-h-[58px] border-[1px] border-b-0 border-[#231414D4] font-[400] text-[12px] leading-[19.55px]"
                                >
                                    <option value="event-category" disabled>Event Category</option>
                                    <option>Christmas🎅</option>
                                    <option>Horror</option>
                                    <option>Electronic</option>
                                    <option>Pop Culture</option>
                                    <option>Music Venues</option>
                                    <option>Miami</option>
                                </select>
                            </div>

                            <div className="mt-[22px]">
                                <h2 className="font-[400] text-[24px] leading-[39.09px] text-[#231414D4]">
                                    Tags
                                </h2>
                                <p className="font-[400] text-[14px] leading-[22.8px] text-[#231414D4] mt-[12px]">
                                    Improve discoverability of your event by adding tags relevant to
                                    the subject matter
                                </p>
                                <div
                                    className="flex gap-[1.1527377521613833vw] xsm:gap-[20px] sm:gap-[20px] xsm:flex-col sm:flex-col mt-[12px]">
                <textarea
                    className="w-[100%] xsm:w-[100%] sm:w-[100%] h-[58px] border-[1px] border-b-0 border-[#231414D4] font-[400] text-[12px] leading-[19.55px] text-[#231414D4] indent-[16px] pt-[8px] outline-none"
                    placeholder="Tag"
                    name="tags"
                    onChange={handleEventInfoInput}
                    value={eventInfo.tags}
                ></textarea>
                                    <Button
                                        whileHover={{
                                            background: "#FB4A04",
                                            color: "#ffffff",
                                            scale: 1.03,
                                        }}
                                        width="106px"
                                        height="58px"
                                        text="Add"
                                        style={{
                                            border: "1px solid #231414D4",
                                            borderRadius: "0px",
                                            background: "#ffffff",
                                            color: "#231414D4",
                                            fontSize: "14px",
                                            lineHeight: "22.8px",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* location */}
                    <div className="mt-[44px] pt-[62px]">
                        <div className="flex gap-[25px] items-center">
                            <img src="/map-pin.svg" alt=""/>
                            <h2 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4]">
                                Location
                            </h2>
                        </div>
                        <div className="ml-[75px] mt-[28px]">
                            <p className="font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">
                                Help people in the area discover your event and let attendees know
                                where to show up.
                            </p>
                            <textarea
                                className="w-[100%] xsm:w-[100%] sm:w-[90%] h-[58px] border-[1px] border-b-0 border-[#231414D4] font-[400] text-[12px] leading-[19.55px] text-[#231414D4] indent-[16px] pt-[8px] outline-none mt-[12px]"
                                placeholder="Address"
                                name="address"
                                onChange={handleEventAddressInput}
                                value={eventInfo.location?.address}
                            ></textarea>

                            {/* TODO: location type options*/}
                            {/* location type options */}
                            {/*<div className="mt-[22px]">*/}
                            {/*    <div className="flex gap-[1.1527377521613833vw] pt-[37px] xsm:flex-col sm:flex-col">*/}
                            {/*        <Button*/}
                            {/*            whileHover={{*/}
                            {/*                background: "#FB4A04",*/}
                            {/*                color: "white",*/}
                            {/*                scale: 1.03,*/}
                            {/*            }}*/}
                            {/*            width="13.314121037463977vw"*/}
                            {/*            height="58px"*/}
                            {/*            text="Venue"*/}
                            {/*            style={{*/}
                            {/*                minWidth: "213px",*/}
                            {/*                border: "1px solid #231414D4",*/}
                            {/*                borderRadius: "0px",*/}
                            {/*                background: "transparent",*/}
                            {/*                color: "#231414D4",*/}
                            {/*                fontSize: "14px",*/}
                            {/*                lineHeight: "22.8px",*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*        <Button*/}
                            {/*            whileHover={{*/}
                            {/*                background: "#FB4A04",*/}
                            {/*                color: "white",*/}
                            {/*                scale: 1.03,*/}
                            {/*            }}*/}
                            {/*            width="13.314121037463977vw"*/}
                            {/*            height="58px"*/}
                            {/*            text="online events "*/}
                            {/*            style={{*/}
                            {/*                minWidth: "213px",*/}
                            {/*                border: "1px solid #231414D4",*/}
                            {/*                borderRadius: "0px",*/}
                            {/*                background: "transparent",*/}
                            {/*                color: "#231414D4",*/}
                            {/*                fontSize: "14px",*/}
                            {/*                lineHeight: "22.8px",*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*        <Button*/}
                            {/*            whileHover={{*/}
                            {/*                background: "#FB4A04",*/}
                            {/*                color: "white",*/}
                            {/*                scale: 1.03,*/}
                            {/*            }}*/}
                            {/*            width="13.314121037463977vw"*/}
                            {/*            height="58px"*/}
                            {/*            text="To be annouced"*/}
                            {/*            style={{*/}
                            {/*                minWidth: "213px",*/}
                            {/*                border: "1px solid #231414D4",*/}
                            {/*                borderRadius: "0px",*/}
                            {/*                background: "transparent",*/}
                            {/*                color: "#231414D4",*/}
                            {/*                fontSize: "14px",*/}
                            {/*                lineHeight: "22.8px",*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <p className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4] mb-[69px] mt-[18px]">*/}
                            {/*        Online events have unique event pages where you can add links to*/}
                            {/*        livestreams and more*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    {/* date and time */}
                    <div className="mt-[44px] pt-[62px]">
                        <div className="flex gap-[25px] items-center">
                            <img src="/clock.svg" alt=""/>
                            <h2 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4]">
                                Date and time
                            </h2>
                        </div>
                        <div className="ml-[75px] mt-[28px]">
                            <p className="font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">
                                Tell event-goers when your event starts and ends so they can make
                                plans to start
                            </p>

                            {/* TODO: support recurring events*/}
                            {/*<div className="mt-[22px]">*/}
                            {/*    <div className="flex gap-[1.1527377521613833vw] pt-[37px] xsm:flex-col sm:flex-col">*/}
                            {/*        <Button*/}
                            {/*            whileHover={{*/}
                            {/*                background: "#FB4A04",*/}
                            {/*                color: "white",*/}
                            {/*                scale: 1.03,*/}
                            {/*            }}*/}
                            {/*            width="13.371757925072046vw"*/}
                            {/*            height="58px"*/}
                            {/*            text="Single event"*/}
                            {/*            style={{*/}
                            {/*                minWidth: "213px",*/}
                            {/*                border: "1px solid #231414D4",*/}
                            {/*                borderRadius: "0px",*/}
                            {/*                background: "transparent",*/}
                            {/*                color: "#231414D4",*/}
                            {/*                fontSize: "14px",*/}
                            {/*                lineHeight: "22.8px",*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*        <Button*/}
                            {/*            whileHover={{*/}
                            {/*                background: "#FB4A04",*/}
                            {/*                color: "white",*/}
                            {/*                scale: 1.03,*/}
                            {/*            }}*/}
                            {/*            width="13.371757925072046vw"*/}
                            {/*            height="58px"*/}
                            {/*            text="Recurring event"*/}
                            {/*            style={{*/}
                            {/*                minWidth: "213px",*/}
                            {/*                border: "1px solid #231414D4",*/}
                            {/*                borderRadius: "0px",*/}
                            {/*                background: "transparent",*/}
                            {/*                color: "#231414D4",*/}
                            {/*                fontSize: "14px",*/}
                            {/*                lineHeight: "22.8px",*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <p className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4] mb-[69px] mt-[18px]">*/}
                            {/*        Single event happens once and can last multiple days*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                            {/*END*/}

                            <div className="flex gap-[24px] mt-[12px] xsm:flex-col sm:flex-col">
                                <div
                                    className="py-[10px] flex flex-col  pl-[18px] outline-none flex-1 h-[58px] border-[1px] border-[#231414D4] font-[400] text-[12px] leading-[19.55px]">
                                    <label className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4]">
                                        Start Date
                                    </label>
                                    <input
                                        onChange={handleEventStartDayInput}
                                        value={startDay}
                                        name="startDay"
                                        type="date"
                                    ></input>
                                </div>
                                <div
                                    className="py-[10px] flex flex-col pl-[18px] outline-none flex-1 h-[58px] border-[1px] border-[#231414D4] font-[400] text-[12px] leading-[19.55px]">
                                    <label className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4]">
                                        Start Time
                                    </label>
                                    <input
                                        onChange={handleEventStartTimeInput}
                                        value={startTime}
                                        name="startTime"
                                        type="time"
                                    ></input>
                                </div>
                            </div>
                            <div className="flex gap-[24px] mt-[20px] xsm:flex-col sm:flex-col">
                                <div
                                    className="py-[10px] flex flex-col pl-[18px] outline-none flex-1 h-[58px] border-[1px] border-[#231414D4] font-[400] text-[12px] leading-[19.55px]">
                                    <label className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4]">
                                        End Date
                                    </label>
                                    <input
                                        onChange={handleEventEndDayInput}
                                        value={endDay}
                                        name="endDay"
                                        type="date"
                                    ></input>
                                </div>

                                <div
                                    className="py-[10px] flex flex-col pl-[18px] outline-none flex-1 h-[58px] border-[1px] border-[#231414D4] font-[400] text-[12px] leading-[19.55px]">
                                    <label className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4]">
                                        End Time
                                    </label>
                                    <input
                                        onChange={handleEventEndTimeInput}
                                        value={endTime}
                                        name={"endTime"}
                                        type="time"
                                    ></input>
                                </div>
                            </div>

                            {/* TODO: feature to disable event time*/}
                            {/*<div className="flex items-center mt-[20px]">*/}
                            {/*    <input type="checkbox"></input>*/}
                            {/*    <label className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4]">*/}
                            {/*        Display start time*/}
                            {/*    </label>*/}
                            {/*</div>*/}
                            {/*<div className="flex items-center mt-[20px]">*/}
                            {/*    <input type="checkbox"></input>*/}
                            {/*    <label className="font-[700] text-[14px] leading-[22.8px] text-[#231414D4]">*/}
                            {/*        Display End time*/}
                            {/*    </label>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    {/* cancel/save & continue buttons */}
                    <div className="mt-[44px] pt-[62px] flex justify-end mb-[211px]">
                        <div className="flex gap-[20px] xsm:flex-col sm:flex-col">
                            <Button
                                whileHover={{
                                    background: "#FB4A04",
                                    color: "#ffffff",
                                    scale: 1.03,
                                }}
                                width="13.198847262247838vw"
                                height="65px"
                                text="Cancel"
                                style={{
                                    minWidth: "213px",
                                    background: "#ffffff",
                                    color: "#FB4A04",
                                    border: "1px solid #231414D4",
                                    borderRadius: "10px",
                                    fontSize: "24px",
                                    lineHeight: "39.09px",
                                }}
                                onClick={() => navigate("/")}
                            />
                            <Button
                                whileHover={{
                                    background: "#ffffff",
                                    color: "#FB4A04",
                                    scale: 1.03,
                                    border: "1px solid #FB4A04",
                                }}
                                width="13.198847262247838vw"
                                height="65px"
                                text="Save & Continue"
                                style={{
                                    background: "#FB4A04",
                                    color: "#ffffff",
                                    minWidth: "213px",
                                    borderRadius: "10px",
                                    fontSize: "24px",
                                    lineHeight: "39.09px",
                                }}
                                onClick={saveAndContinue}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
