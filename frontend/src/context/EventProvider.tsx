import axios, {all} from "axios";
import React, {
    ReactNode,
    FC,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import {useNavigate} from "react-router-dom";
import {config} from "../config/Config";
import {Event} from "../component/Events/EventCards"

// type eventType = {
//     id: string,
//     image: string,
//     title: string,
//     description: string
// }

type eventContextType = {
    eventID: string;
    setEventID?: React.Dispatch<React.SetStateAction<string>>
    deleteEvent: (eventID: string) => any;
    allEvents: Event[];
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    refresh: boolean;
};
const eventContextDefaultValues: eventContextType = {
    eventID: "",
    deleteEvent: (eventID: string) => {
    },
    allEvents: [],
    setRefresh: () => {
    },
    refresh: false

};

type Props = {
    children: ReactNode;
};

const EventContext = createContext<eventContextType>(eventContextDefaultValues);

export function useEvent() {
    return useContext(EventContext);
}

export function EventProvider({children}: Props) {
    const navigate = useNavigate();

    const [eventID, setEventID] = useState<string>("");
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {

        const getEventData = async () => {
            // console.log("Keep Syncing Eventsss");
        };

        getEventData();
    }, [eventID]);


    const deleteEvent = async (eventID: string) => {
        const resp = await axios.delete(`${config.backendBaseUri}/events/${eventID}`);
    }

    useEffect(() => {
        const getAllEvent = async () => {
            const resp = await axios.get(`${config.backendBaseUri}/events`)
            setAllEvents(resp.data)
        }
        getAllEvent();
    }, [refresh])

    const value: eventContextType = {
        eventID: eventID,
        deleteEvent: deleteEvent,
        allEvents: allEvents,
        setRefresh: setRefresh,
        refresh: refresh!
    };

    return (
        <>
            <EventContext.Provider value={value}>
                {children}
            </EventContext.Provider>
        </>
    );
}
