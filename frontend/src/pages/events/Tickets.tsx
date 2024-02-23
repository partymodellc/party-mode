import React, {useState} from "react"
import Button from "../../component/general/Button"
import Modal from "../../component/general/Modal"
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {useEffect} from "react"
import {FileUploader} from "react-drag-drop-files"
import TicketCard from "../../component/EventDescriptions/TicketCard"
import {OutgoingTicket, useEvent} from "../../context/EventProvider"
import "react-toastify/dist/ReactToastify.css"
import Header from "../../component/general/Header"
import Footer from "../../component/general/Footer"
import CreateEventHeader from "../../component/create-event/CreateEventNav"

export default function Tickets() {
    const {eventId} = useParams()
    const {allTickets, getAllTickets, createTicket} = useEvent()
    const navigate = useNavigate()
    const {state} = useLocation()

    const [outgoingTickets, setOutgoingTickets] = useState<OutgoingTicket[]>(state?.outgoingTickets || [])
    // TODO: support ticket sections
    // const [showCreateSectionModal, setShowCreateSectionModal] = useState<boolean>(false)
    const [showCreateTicketModal, setShowCreateTicketModal] = useState<boolean>(false)

    const [ticketInfo, setTicketInfo] = useState<OutgoingTicket>({eventId: eventId})
    const [ticketImageSource, setTicketImageSource] = useState<string>()

    useEffect(() => {
        if (eventId) {
            getAllTickets(eventId)
        }
    }, [])

    const handleTicketInfoInput = (e: any) => {
        const {name, value} = e.target
        setTicketInfo({
            ...ticketInfo,
            [name]: value === "" ? undefined : value
        })
    }

    const handleTicketImageInput = (ticketImage: File) => {
        setTicketInfo({
            ...ticketInfo,
            image: ticketImage
        })
        setTicketImageSource(URL.createObjectURL(ticketImage))
    }

    const handleCancelCreateTicket = () => {
        setTicketInfo({})
        setTicketImageSource(undefined)
        setShowCreateTicketModal(false)
    }

    const saveTicket = (e: any) => {
        e.preventDefault()

        createTicket(ticketInfo)
        handleCancelCreateTicket()
        if (eventId) {
            getAllTickets(eventId)
        }
    }

    const addTicket = (e: any) => {
        e.preventDefault()

        outgoingTickets.push(ticketInfo)
        handleCancelCreateTicket()
    }

    const removeTicketHandler = (idx: string) => {
        const temp: OutgoingTicket[] = []
        outgoingTickets.forEach((ticket, idxx) => {
            if (idxx !== Number(idx)) {
                temp.push(ticket)
            }
        })
        setOutgoingTickets(temp)
    }

    const handleContinue = () => {
        if (eventId) {
            navigate(`/events/${eventId}/publish`)
        } else {
            navigate('/events/publish', {
                state: {
                    outgoingEvent: state?.outgoingEvent,
                    outgoingTickets: outgoingTickets
                }
            })
        }
    }

    const handleBack = () => {
        if (eventId) {
            navigate(`/events/${eventId}/details`)
        } else {
            navigate(`/events/details`, {
                state: {
                    outgoingEvent: state?.outgoingEvent,
                    outgoingTickets: outgoingTickets
                }
            })
        }
    }

    const ticketsToShow = eventId ? allTickets : outgoingTickets

    return (
        <>
            <Header/>
            <CreateEventHeader
                outgoingEvent={state?.outgoingEvent}
                outgoingTickets={outgoingTickets}
                activePage='tickets'
                eventId={eventId}
            />
            <div>
                {/* TODO: support ticket sections */}
                {/* create section modal */}
                {/*<Modal*/}
                {/*    showModal={showCreateSectionModal}*/}
                {/*    hideShowModalHandler={() => setShowCreateSectionModal(false)}*/}
                {/*>*/}
                {/*    <div*/}
                {/*        className="xsm:w-[90vw] sm:w-[90vw] w-[645px] xsm:h-auto sm:h-auto  h-[423px] bg-white max-h-[90vh] overflow-auto">*/}
                {/*        <div className="w-[90%] flex xsm:flex-col sm:flex-col xsm:m-auto sm:m-auto">*/}
                {/*            <div className="flex justify-center items-center">*/}
                {/*                <img*/}
                {/*                    className="xsm:mt-[20px] sm:mt-[20px] min-w-[15.792507204610951vw]"*/}
                {/*                    src="/bro.svg"*/}
                {/*                    alt=""*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="flex flex-col items-center">*/}
                {/*                <h1 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4] mt-[45px] mb-[7px]">*/}
                {/*                    Create Section*/}
                {/*                </h1>*/}
                {/*                <p className="w-[80%] max-w-[313px] mb-[46px] font-[400] text-[12px] leading-[19.55px] text-[#231414D4] text-center">*/}
                {/*                    Use a section to categories your ticket type and also amount*/}
                {/*                    availiable for each section*/}
                {/*                </p>*/}
                {/*                <input*/}
                {/*                    className="max-w-[286px] w-[80%] h-[50px] border-[1px] border-[#231414D4] mb-[27px]"/>*/}
                {/*                <input className="max-w-[286px] w-[80%] h-[50px] border-[1px] border-[#231414D4]"/>*/}
                {/*                <div*/}
                {/*                    className="flex gap-[2.881844380403458vw] mt-[20px] mb-[74px] xsm:flex-col-reverse sm:flex-col-reverse">*/}
                {/*                    <Button*/}
                {/*                        width="128px"*/}
                {/*                        height="41px"*/}
                {/*                        text="Cancel"*/}
                {/*                        style={{*/}
                {/*                            border: "1px solid #231414D4",*/}
                {/*                            borderRadius: "0px",*/}
                {/*                            background: "#FB4A043D",*/}
                {/*                            color: "#231414D4",*/}
                {/*                            fontSize: "20px",*/}
                {/*                            lineHeight: "22.8px",*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                    <Button*/}
                {/*                        width="128px"*/}
                {/*                        height="41px"*/}
                {/*                        text="Create "*/}
                {/*                        style={{*/}
                {/*                            border: "1px solid #231414D4",*/}
                {/*                            borderRadius: "0px",*/}
                {/*                            background: "transparent",*/}
                {/*                            color: "#231414D4",*/}
                {/*                            fontSize: "20px",*/}
                {/*                            lineHeight: "22.8px",*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Modal>*/}
                <Modal
                    showModal={showCreateTicketModal}
                    hideShowModalHandler={handleCancelCreateTicket}
                >
                    <div className="xsm:w-[95vw] bg-white w-[576.01px] max-h-[90vh] overflow-auto">
                        <div className="xsm:w-[88vw] w-[476px] m-auto">
                            <div className="flex items-center justify-between h-[70px] border-b-[1px] border-[#C7C7C7]">
                                <h1 className="font-[700] text-[24px] leading-[39.09px] text-[#231414D4]">
                                    Add Ticket
                                </h1>
                                <p className=" font-[400] text-[14px] leading-[22.8px] text-[#1977F3]">
                                    Learn More
                                </p>
                            </div>

                            <div className="flex flex-col gap-[15px]">
                                <div className="flex gap-[50px] mt-[15px]">
                                    <Button
                                        width="220px"
                                        height="50px"
                                        text="Paid"
                                        style={{
                                            border: "1px solid #231414D4",
                                            borderRadius: "0px",
                                            background: "#FB4A043D",
                                            color: "#231414D4",
                                            fontSize: "20px",
                                            lineHeight: "22.8px",
                                        }}
                                    />
                                    <Button
                                        width="220px"
                                        height="50px"
                                        text="Free "
                                        style={{
                                            border: "1px solid #231414D4",
                                            borderRadius: "0px",
                                            background: "transparent",
                                            color: "#231414D4",
                                            fontSize: "20px",
                                            lineHeight: "22.8px",
                                        }}
                                    />
                                </div>

                                {ticketImageSource ? (
                                    <div className="w-32 h-32">
                                        <img
                                            className="w-full h-full rounded"
                                            src={ticketImageSource}
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32">
                                        <img
                                            className="w-full h-full rounded"
                                            src="/bx_image.svg"
                                            alt=""
                                        />
                                    </div>
                                )}
                                <FileUploader
                                    handleChange={handleTicketImageInput}
                                    name="ticketImage"
                                />
                                <div>
                                    <label className="font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">
                                        Name*
                                    </label>
                                    <input
                                        className="w-full h-[50px] border-[1px] border-[#231414D4]"
                                        onChange={handleTicketInfoInput}
                                        value={ticketInfo.name || ''}
                                        name="name"
                                    />
                                </div>
                                {/* TODO: support ticket sections */}
                                {/*<div>*/}
                                {/*    <label className=" font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">*/}
                                {/*        Section**/}
                                {/*    </label>*/}
                                {/*    <input*/}
                                {/*        className="w-full h-[50px] border-[1px] border-[#231414D4]"*/}
                                {/*        onChange={handleTicketInfoInput}*/}
                                {/*        value={section}*/}
                                {/*        name="section"*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div>
                                    {/* TODO: support ticket sales */}
                                    {/*<div className="flex justify-between gap-[2.07492795389049vw]">*/}
                                    {/*<div>*/}
                                    {/*    <label className=" font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">*/}
                                    {/*        Add Promo code (Optional)*/}
                                    {/*    </label>*/}
                                    {/*    <input*/}
                                    {/*        className="w-full h-[50px] border-[1px] border-[#231414D4]"*/}
                                    {/*        onChange={handleTicketInfoInput}*/}
                                    {/*        value={promoCode}*/}
                                    {/*        name="promoCode"*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <div>
                                        <label className=" font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">
                                            Quantity Limit (Optional)
                                        </label>
                                        <input
                                            className="w-full h-[50px] border-[1px] border-[#231414D4]"
                                            onChange={handleTicketInfoInput}
                                            value={ticketInfo.limit || ''}
                                            name="limit"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className=" font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">
                                        Price
                                    </label>
                                    <input
                                        className="w-full h-[50px] border-[1px] border-[#231414D4]"
                                        onChange={handleTicketInfoInput}
                                        value={ticketInfo.price || ''}
                                        name="price"
                                    />
                                </div>

                                {/* TODO: support ticket sales */}
                                {/*<div className="flex justify-between gap-[2.07492795389049vw]">*/}
                                {/*    <div className="flex-1 border-[1px] border-[#231414D4]">*/}
                                {/*        <label className=" font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">*/}
                                {/*            Sales Start Day*/}
                                {/*        </label>*/}
                                {/*        <input*/}
                                {/*            type="date"*/}
                                {/*            className="w-full "*/}
                                {/*            onChange={handleTicketInfoInput}*/}
                                {/*            value={saleStartDate}*/}
                                {/*            name="saleStartDate"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*    <div className="flex-1 border-[1px] border-[#231414D4]">*/}
                                {/*        <label className="font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">*/}
                                {/*            Time*/}
                                {/*        </label>*/}
                                {/*        <input*/}
                                {/*            type="time"*/}
                                {/*            className="w-full "*/}
                                {/*            onChange={handleTicketInfoInput}*/}
                                {/*            value={saleStartTime}*/}
                                {/*            name="saleStartTime"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/* TODO: support ticket sales */}
                                {/*<div className="flex justify-between gap-[2.07492795389049vw]">*/}
                                {/*    <div className="flex-1 border-[1px] border-[#231414D4]">*/}
                                {/*        <label className=" font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">*/}
                                {/*            Sales End Day*/}
                                {/*        </label>*/}
                                {/*        <input*/}
                                {/*            type="date"*/}
                                {/*            className="w-full "*/}
                                {/*            onChange={handleTicketInfoInput}*/}
                                {/*            value={saleEndDate}*/}
                                {/*            name="saleEndDate"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*    <div className="flex-1 border-[1px] border-[#231414D4]">*/}
                                {/*        <label className=" font-[400] text-[14px] leading-[22.8px] text-[#231414D4]">*/}
                                {/*            Time*/}
                                {/*        </label>*/}
                                {/*        <input*/}
                                {/*            type="time"*/}
                                {/*            className="w-full "*/}
                                {/*            onChange={handleTicketInfoInput}*/}
                                {/*            value={saleEndTime}*/}
                                {/*            name="saleEndTime"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className="flex justify-between mt-[20px] mb-[27px] gap-[2.07492795389049vw]">
                                    <Button
                                        whileHover={{
                                            background: "#FB4A04",
                                            color: "#ffffff",
                                            scale: 1.03,
                                        }}
                                        width="222px"
                                        height="60px"
                                        text="Cancel"
                                        style={{
                                            background: "#ffffff",
                                            color: "#231414D4",
                                            border: "1px solid #231414D4",
                                            borderRadius: "0px",
                                            fontSize: "20px",
                                            lineHeight: "32.58px",
                                        }}
                                        onClick={handleCancelCreateTicket}
                                    />
                                    <Button
                                        whileHover={{
                                            background: "#ffffff",
                                            color: "#FB4A04",
                                            scale: 1.03,
                                            border: "1px solid #FB4A04",
                                        }}
                                        width="222px"
                                        height="60px"
                                        text={eventId ? "Save" : "Add"}
                                        style={{
                                            background: "#FB4A04",
                                            color: "#ffffff",
                                            borderRadius: "0px",
                                            fontSize: "20px",
                                            lineHeight: "32.58px",
                                        }}
                                        onClick={eventId ? saveTicket : addTicket}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="flex flex-col justify-center items-center mt-[151px]">
                    <h1 className="font-[700] text-[24px] leading-[58.64px] text-[#231414D4]">
                        Create Ticket
                    </h1>
                    <img
                        src="/emojione-monotone_ticket1.svg"
                        className="mt-[44px]"
                        alt=""
                    />
                    <div className="flex gap-[20px] mt-[53px] xsm:flex-col sm:flex-col">
                        {/* TODO: support ticket sections */}
                        {/*<Button*/}
                        {/*    whileHover={{background: "#FB4A04", color: "white", scale: 1.03}}*/}
                        {/*    onClick={() => setShowCreateSectionModal(true)}*/}
                        {/*    width="231px"*/}
                        {/*    height="57px"*/}
                        {/*    text="Create section"*/}
                        {/*    style={{*/}
                        {/*        background: "transparent",*/}
                        {/*        color: "#FB4A04",*/}
                        {/*        border: "1px solid #231414D4",*/}
                        {/*        borderRadius: "10px",*/}
                        {/*        fontSize: "20px",*/}
                        {/*        lineHeight: "32.58px",*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <Button
                            whileHover={{
                                background: "#ffffff",
                                color: "#FB4A04",
                                scale: 1.03,
                                border: "1px solid #FB4A04",
                            }}
                            onClick={() => setShowCreateTicketModal(true)}
                            width="231px"
                            height="57px"
                            text="Create Ticket"
                            style={{
                                background: "#FB4A04",
                                color: "#ffffff",
                                borderRadius: "10px",
                                fontSize: "20px",
                                lineHeight: "32.58px",
                            }}
                        />
                    </div>
                    <p className=" font-[400] text-[15px] leading-[24.43px] text-[#473a3a] mt-[55px]">
                        Create Tickets for your Event
                    </p>

                    <section className="w-[90%] m-auto">
                        <h1 className="font-[700] text-[24px] leading-[39.09px] text-center text-[#231414D4] mt-[45px] mb-[7px]">
                            All Tickets
                        </h1>

                        <section
                            className="mt-[48px] mb-[76px] w-[88%] m-auto flex flex-wrap gap-[20px] justify-center sm:justify-center md:flex-col md:items-center">
                            {ticketsToShow?.map((ticket, idx) => {
                                return <TicketCard
                                    key={"id" in ticket ? ticket.id : idx}
                                    id={"id" in ticket ? ticket.id : idx.toString()}
                                    name={ticket?.name || ""}
                                    image={"id" in ticket ? ticket.image : ticket?.image?.name || ""}
                                    price={ticket?.price || 0}
                                    phase={"creation" || "edit"}
                                    removeTicketHandler={removeTicketHandler}
                                />
                            })}
                        </section>
                    </section>

                    <div
                        className="xsm:w-[100%] xsm:items-center xsm:ml-0 flex gap-[20px] justify-end mb-[203px] xsm:flex-col-reverse sm:flex-col-reverse">
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
                            onClick={handleBack}
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
                            text="Continue"
                            style={{
                                background: "#FB4A04",
                                color: "#ffffff",
                                borderRadius: "10px",
                                fontSize: "24px",
                                lineHeight: "39.09px",
                            }}
                            onClick={handleContinue}
                        />
                    </div>
                </div>
            </div>
            <Footer showFooterHeaders={false}/>
        </>
    )
}
