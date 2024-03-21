import Header from "../component/general/Header"
import Footer from "../component/general/Footer"
import {useSearchParams} from "react-router-dom"
import {useEvent} from "../context/EventProvider"
import React, {useEffect} from "react"
import {motion} from "framer-motion"
import EventGrid from "../component/Events/EventGrid"

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
            <div className="m-auto w-[86.1671469740634vw] my-[60px]">
                <motion.div
                    className="overflow-x-auto scrollbar-hide md:scrollbar-default  snap-center flex justify-between mt-[25px] flex-wrap xsm:justify-center sm:justify-center md:justify-center lg:justify-center xsm:gap-[5vw] sm:gap-[5vw] md:gap-[5vw] lg:gap-[5vw]"
                >
                    {allEvents && allEvents.length > 0 ?
                        (<EventGrid allEvents={allEvents}/>) :
                        (<div>No Results</div>)}
                </motion.div>
            </div>
            <Footer showFooterHeaders={false}/>
        </>
    )
}