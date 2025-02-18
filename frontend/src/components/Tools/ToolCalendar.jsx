import React, {useEffect, useState} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useTransacOccasStore from "../../store/useTransacOccasStore.js";
import usePeriodStore from "../../store/usePeriodStore.js";



const locales = {
    "fr": fr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const ToolCalendar = () => {

    const {fetchOccasByPeriod, categories} = useTransacOccasStore()
    const { month, year} = usePeriodStore();

    const [events, setEvents] = useState([]);



    // RECUP CATEGORIES - TRANSACTIONS
    useEffect(() => {
        fetchOccasByPeriod(month, year);
    }, [month, year]);


    useEffect(() => {
        // Transformation des données pour créer le tableau d'events
        const newEvents = [];
        categories.forEach(category => {
            category.transactions.forEach(transaction => {
                transaction.subTransactions.forEach(subTx => {
                    const [day, month, year] = subTx.date.split('/').map(Number);
                    const dateObj = new Date(year, month - 1, day);
                    newEvents.push({
                        title: `${transaction.name} ${subTx.amount} €`,
                        start: dateObj,
                        end: dateObj,
                    });
                });
            });
        });
        setEvents(newEvents);
    }, [categories]);


    return (
        <div style={{ height: "80vh", padding: "10px", fontFamily: "Arial, sans-serif" }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600, borderRadius: "10px", padding: "10px", backgroundColor: "#374151", boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" }}
                eventPropGetter={(event) => {
                    let backgroundColor = "#3174ad";
                    if (event.title.includes("🛒")) backgroundColor = "#ffcc00";
                    if (event.title.includes("⛽")) backgroundColor = "#ff5733";
                    if (event.title.includes("🎬")) backgroundColor = "#33ccff";
                    return {
                        style: {
                            backgroundColor,
                            color: "#fff",
                            borderRadius: "8px",
                            padding: "4px",
                            fontWeight: "bold",
                            fontSize: "10px",
                            textAlign: "center",
                            textTransform: "capitalize",
                        }
                    };
                }}
            />
        </div>
    );
};

export default ToolCalendar;