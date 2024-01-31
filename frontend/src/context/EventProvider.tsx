import axios, {AxiosResponse} from "axios"
import React, {ReactNode, createContext, useContext, useState,} from "react"
import {config} from "../config/Config"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export type IncomingEvent = {
    id: string
    title?: string
    summary?: string
    description?: string
    image?: string
    gallery?: string[]
    location?: {
        address?: string
        latitude?: number
        longitude?: number
    }
    startDate?: string
    endDate?: string
    view: string
    status: string
    ticketIds?: string[]
    type?: string
    category?: string
    tags?: string[]
}

export type OutgoingEvent = {
    title?: string
    summary?: string
    description?: string
    image?: File
    gallery?: File[]
    location?: {
        address?: string
        latitude?: number
        longitude?: number
    }
    startDate?: string
    endDate?: string
    view?: string
    status?: string
    publishDate?: string
    ticketIds?: string[]
    type?: string
    category?: string
    tags?: string[]
}

export type IncomingTicket = {
    id: string
    name: string
    image?: string
    price?: number
    limit?: number
    sales?: number
    eventId: string
}

export type OutgoingTicket = {
    name?: string
    image?: File
    price?: number
    limit?: number
    eventId?: string
}

type eventContextType = {
    allEvents?: IncomingEvent[]
    allTickets?: IncomingTicket[]
    getEvent: (eventId: string) => Promise<AxiosResponse<any, any>>
    getAllEvents: () => void
    createEvent: () => Promise<AxiosResponse<any, any>>
    updateEventAndNav: (eventId: string, page: string, event?: OutgoingEvent) => void
    deleteEvent: (eventId: string) => void
    getAllTickets: (eventId: string) => void
    createTicket: (ticket: OutgoingTicket) => void
    deleteTicket: (ticketId: string) => void
}

const eventContextDefaultValues: eventContextType = {
    getEvent: () => {
        return new Promise<any>(() => {
        })
    },
    getAllEvents: () => {
    },
    createEvent: () => {
        return new Promise<any>(() => {
        })
    },
    updateEventAndNav: () => {
        return new Promise<any>(() => {
        })
    },
    deleteEvent: () => {
    },
    getAllTickets: () => {
    },
    createTicket: () => {
    },
    deleteTicket: () => {
    }
}

type Props = {
    children: ReactNode
}

const EventContext = createContext<eventContextType>(eventContextDefaultValues)

export function useEvent() {
    return useContext(EventContext)
}

export function EventProvider({children}: Props) {
    const [allEvents, setAllEvents] = useState<IncomingEvent[]>()
    const [allTickets, setAllTickets] = useState<IncomingTicket[]>()
    const navigate = useNavigate()

    const getEvent = (eventId: string) => {
        return axios.get(`${config.backendBaseUri}/events/${eventId}`)
    }

    const getAllEvents = () => {
        axios.get(`${config.backendBaseUri}/events`)
            .then(response => {
                setAllEvents(response.data)
            })
    }

    const createEvent = () => {
        return axios.post(`${config.backendBaseUri}/events`, undefined, {withCredentials: true})
    }

    const updateEventAndNav = (eventId: string, page: string, event?: OutgoingEvent) => {
        axios.put(`${config.backendBaseUri}/events/${eventId}`, event, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }, withCredentials: true
        })
            .then(() => {
                navigate(`/events/${eventId}/${page}`)
            })
    }

    const deleteEvent = (eventId: string) => {
        axios.delete(`${config.backendBaseUri}/events/${eventId}`, {withCredentials: true})
            .then(response => {
                toast.success("Event deleted")
            })
    }

    const getAllTickets = (eventId: string) => {
        axios.get(`${config.backendBaseUri}/tickets/event/${eventId}`)
            .then(response => {
                setAllTickets(response.data)
            })
    }

    const createTicket = (ticket: OutgoingTicket) => {
        axios.post(`${config.backendBaseUri}/tickets`, ticket, {withCredentials: true})
            .then(() => {
                toast.success("Ticket created")
            })
    }

    const deleteTicket = (ticketId: string) => {
        axios.delete(`${config.backendBaseUri}/tickets/${ticketId}`, {withCredentials: true})
            .then(response => {
                toast.success("Ticket deleted")
            })
    }

    const value: eventContextType = {
        allEvents: allEvents,
        allTickets: allTickets,
        getEvent: getEvent,
        getAllEvents: getAllEvents,
        createEvent: createEvent,
        updateEventAndNav: updateEventAndNav,
        deleteEvent: deleteEvent,
        getAllTickets: getAllTickets,
        createTicket: createTicket,
        deleteTicket: deleteTicket
    }

    return (
        <>
            <EventContext.Provider value={value}>
                {children}
            </EventContext.Provider>
        </>
    )
}
