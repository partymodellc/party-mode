import React, {useState, useEffect} from "react"
import Button from "../../component/general/Button"
import {useParams} from "react-router"
import {FileUploader} from "react-drag-drop-files"
import "react-toastify/dist/ReactToastify.css"
import Header from "../../component/general/Header"
import Footer from '../../component/general/Footer'
import CreateEventHeader from "../../component/create-event/Header"
import {OutgoingEvent, useEvent} from "../../context/EventProvider"
import {config} from "../../config/Config";
import {useNavigate} from "react-router-dom";

const fileTypes = ["JPEG", "PNG"];

export default function Details() {
    const {eventId} = useParams()
    const {getEvent, updateEventAndNav} = useEvent()
    const navigate = useNavigate()

    const [eventDetails, setEventDetails] = useState<OutgoingEvent>({})
    const [eventImageName, setEventImageName] = useState<string>()
    const [eventImageSource, setEventImageSource] = useState<string>()
    const [eventGallerySources, setEventGallerySources] = useState<string[]>()

    useEffect(() => {
        if (eventId) {
            getEvent(eventId)
                .then(response => {
                    setEventDetails(response.data)
                    if (response.data.image) {
                        setEventImageName(decodeURIComponent(response.data.image))
                        setEventImageSource(`${config.backendBaseUri}/images/${response.data.image}`)
                    }
                })
        }
    }, [setEventDetails])

    const handleEventDetailsInput = (e: any) => {
        const {name, value} = e.target
        setEventDetails({
            ...eventDetails,
            [name]: value === "" ? undefined : value
        })
    }

    const handleEventImageInput = (eventImage: File) => {
        setEventDetails({
            ...eventDetails,
            image: eventImage,
        })
        setEventImageName(eventImage.name)
        setEventImageSource(URL.createObjectURL(eventImage))
    }

    const handleRemoveEventImage = () => {
        setEventDetails({
            ...eventDetails,
            image: undefined
        })
        setEventImageName(undefined)
        setEventImageSource(undefined)
    }

    const handleEventGalleryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files) {
            const gallerySources = []
            for (let i = 0; i < files.length; i++) {
                gallerySources.push(URL.createObjectURL(files[i]))
            }

            setEventGallerySources(gallerySources)
        }
    }

    const saveAndContinue = () => {
        if (eventId) {
            updateEventAndNav(eventId, "tickets", {
                image: eventDetails.image,
                gallery: eventDetails.gallery,
                summary: eventDetails.summary,
                description: eventDetails.description
            })
        }
    }

    return (
        <>
            <Header/>
            <CreateEventHeader/>
            <div className="w-[53.92161383285302vw] xsm:w-[90vw] sm:w-[80vw] m-auto divide-y-2">
                <div>
                    <div className="mt-[44px]">
                        <div className="flex gap-[25px] items-center">
                            <img src="/ei_camera.svg" alt=""/>
                            <h2 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4]">
                                Upload Event Image
                            </h2>
                        </div>

                        <div
                            className="ml-[75px] xsm:ml-0 w-[49.56772334293948vw] xsm:w-[100%] sm:w-[80%] bg-[#f0f0f0] flex flex-col justify-center items-center mt-[46px]">
                            {eventImageSource ? (
                                <div className="w-auto h-40">
                                    <img
                                        className="w-full h-full rounded]"
                                        src={eventImageSource}
                                        alt=""
                                    />
                                </div>
                            ) : (
                                <img className="mt-[106px]" src="/bx_image.svg" alt=""/>
                            )}

                            <p className="mt-[24px] font-[400] text-[16px] leading-[26.06px] text-[#231414D4]"></p>
                            <FileUploader
                                handleChange={handleEventImageInput}
                                name="eventImage"
                                types={fileTypes}
                            />
                            <p>
                                {eventImageName
                                    ? `Image name: ${eventImageName}`
                                    : "no files uploaded yet"}
                            </p>
                            <div
                                className="flex gap-[2.881844380403458vw] xsm:flex-col sm:flex-col mt-[34px] mb-[10px]">
                                {/* Remove button */}
                                {!eventDetails.image ? null : (
                                    <Button
                                        whileHover={{
                                            background: "#FB4A04",
                                            color: "#ffffff",
                                            scale: 1.03,
                                        }}
                                        width="100px"
                                        height="40px"
                                        text="Remove"
                                        style={{
                                            border: "1px solid #231414D4",
                                            borderRadius: "0px",
                                            background: "#ffffff",
                                            color: "#231414D4",
                                            fontSize: "14px",
                                            lineHeight: "22.8px",
                                        }}
                                        onClick={handleRemoveEventImage}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <ul className="flex gap-[38px] xsm:gap-[10px] sm:gap-[10px] ml-[90px] xsm:ml-[20px] mb-[61px] xsm:flex-col sm:flex-col">
                        <li className="list-disc font-[400] text-[12px] leading-[19.55px] text-[#231414D4]">
                            Recommended Image size 000px by 0000px
                        </li>
                        <li className="list-disc font-[400] text-[12px] leading-[19.55px] text-[#231414D4]">
                            Maximum Size 30mb{" "}
                        </li>
                        <li className="list-disc font-[400] text-[12px] leading-[19.55px] text-[#231414D4]">
                            Supported images are JPEG and PNG
                        </li>
                    </ul>
                    <div>
                        <div className="flex gap-[25px] items-center">
                            <img src="/ei_camera.svg" alt=""/>
                            <h2 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4]">
                                Upload Gallery Images
                            </h2>
                        </div>
                        <input
                            type="file"
                            onChange={handleEventGalleryInput}
                            name="eventImages"
                            multiple
                        />
                    </div>
                </div>

                <div className="overflow-x-scroll">
                    <div className="flex ">
                        {eventGallerySources ? eventGallerySources.map((objectURL, index) => (
                            <div className="p-4" key={index}>
                                <img
                                    className="w-64 h-full"
                                    src={objectURL}
                                    alt={`Image ${index}`}
                                />
                            </div>
                        )) : ""
                        }
                    </div>
                </div>

                <div>
                    <div className="mt-[44px]">
                        <div className="flex gap-[25px] items-center">
                            <img src="/ooui_text-summary-ltr.svg" alt=""/>
                            <h2 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4]">
                                Summary
                            </h2>
                        </div>
                        <div className="ml-[75px] xsm:ml-0">
                            <p>
                                Tell attendees what your event is about in a few words. Attendees
                                will see this when searching for events and at the top of your
                                event page (140 characters max).
                            </p>
                            <textarea
                                className="w-[49.56772334293948vw] xsm:w-[100%] sm:w-[80%] h-[83px] border-[1px] border-[#666666B2] font-[400] text-[12px] leading-[19.55px] text-[#231414D4] indent-[16px] pt-[8px] outline-none"
                                placeholder=""
                                required
                                onChange={handleEventDetailsInput}
                                value={eventDetails.summary}
                                name="summary"
                            ></textarea>
                        </div>
                        <div className="ml-[75px] xsm:ml-0">
                            <h2 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4]">
                                Description
                            </h2>
                            <p>
                                Add more details to your event like your schedule, sponsors, or
                                featured guests. Learn more.
                            </p>
                            <textarea
                                className="w-[49.56772334293948vw] xsm:w-[100%] sm:w-[80%] h-[83px] border-[1px] border-[#666666B2] font-[400] text-[12px] leading-[19.55px] text-[#231414D4] indent-[16px] pt-[8px] outline-none"
                                placeholder=""
                                onChange={handleEventDetailsInput}
                                value={eventDetails.description}
                                name="description"
                                required
                            ></textarea>
                        </div>
                        <div
                            className="ml-[75px] xsm:ml-0 flex gap-[2.881844380403458vw] xsm:flex-col sm:flex-col mt-[34px] mb-[90px]">
                            {/*<Button*/}
                            {/*    whileHover={{*/}
                            {/*        background: "#FB4A04",*/}
                            {/*        color: "white",*/}
                            {/*        scale: 1.03,*/}
                            {/*    }}*/}
                            {/*    width="154px"*/}
                            {/*    height="43px"*/}
                            {/*    text="Add Image"*/}
                            {/*    style={{*/}
                            {/*        border: "1px solid #231414D4",*/}
                            {/*        borderRadius: "0px",*/}
                            {/*        background: "transparent",*/}
                            {/*        color: "#231414D4",*/}
                            {/*        fontSize: "14px",*/}
                            {/*        lineHeight: "22.8px",*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<Button*/}
                            {/*    whileHover={{*/}
                            {/*        background: "#FB4A04",*/}
                            {/*        color: "white",*/}
                            {/*        scale: 1.03,*/}
                            {/*    }}*/}
                            {/*    width="154px"*/}
                            {/*    height="43px"*/}
                            {/*    text="Add Text"*/}
                            {/*    style={{*/}
                            {/*        border: "1px solid #231414D4",*/}
                            {/*        borderRadius: "0px",*/}
                            {/*        background: "transparent",*/}
                            {/*        color: "#231414D4",*/}
                            {/*        fontSize: "14px",*/}
                            {/*        lineHeight: "22.8px",*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<Button*/}
                            {/*    whileHover={{*/}
                            {/*        background: "#FB4A04",*/}
                            {/*        color: "white",*/}
                            {/*        scale: 1.03,*/}
                            {/*    }}*/}
                            {/*    width="154px"*/}
                            {/*    height="43px"*/}
                            {/*    text="Add video"*/}
                            {/*    style={{*/}
                            {/*        border: "1px solid #231414D4",*/}
                            {/*        borderRadius: "0px",*/}
                            {/*        background: "transparent",*/}
                            {/*        color: "#231414D4",*/}
                            {/*        fontSize: "14px",*/}
                            {/*        lineHeight: "22.8px",*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </div>
                    </div>
                    <div
                        className="ml-[75px] xsm:w-[100%] xsm:items-center xsm:ml-0 flex gap-[20px] justify-end mb-[203px] xsm:flex-col-reverse sm:flex-col-reverse">
                        <Button
                            whileHover={{background: "#FB4A04", color: "#ffffff", scale: 1.03}}
                            width="229px"
                            height="65px"
                            text="Back"
                            style={{
                                background: "#ffffff",
                                color: "#FB4A04",
                                border: "1px solid #231414D4",
                                borderRadius: "10px",
                                fontSize: "24px",
                                lineHeight: "39.09px",
                            }}
                            onClick={() => navigate(`/events/${eventId}/basic-info`)}
                        />
                        <Button
                            whileHover={{
                                background: "#ffffff",
                                color: "#FB4A04",
                                scale: 1.03,
                                border: "1px solid #FB4A04",
                            }}
                            width="229px"
                            height="65px"
                            text="Save & Continue"
                            style={{
                                background: "#FB4A04",
                                color: "#ffffff",
                                borderRadius: "10px",
                                fontSize: "24px",
                                lineHeight: "39.09px",
                            }}
                            onClick={saveAndContinue}
                        />
                    </div>
                </div>
            </div>
            <Footer showFooterHeaders={false} />
        </>
    )
}
