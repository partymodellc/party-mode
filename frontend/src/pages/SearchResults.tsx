import Header from "../component/general/Header"
import Footer from "../component/general/Footer"
import {useSearchParams} from "react-router-dom"
import {IncomingEvent, useEvent} from "../context/EventProvider"
import {useEffect, useState} from "react"

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {allEvents, getAllEvents} = useEvent()

    useEffect(() => {
        const searchQuery = searchParams.get("title")
        getAllEvents(searchQuery ? encodeURIComponent(searchQuery) : searchQuery)
    }, [])

    return (
        <>
            <Header/>

            <Footer showFooterHeaders={false} />
        </>
    )
}