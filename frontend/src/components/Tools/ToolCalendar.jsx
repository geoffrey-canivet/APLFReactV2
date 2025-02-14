import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const ToolCalendar = () => {
    const [transactions] = useState([
        {
            title: "Achat Supermarché - 50€",
            start: new Date(2025, 1, 12), // 12 février 2025
            end: new Date(2025, 1, 12),
        },
        {
            title: "Essence - 30€",
            start: new Date(2025, 1, 18), // 18 février 2025
            end: new Date(2025, 1, 18),
        },
        {
            title: "Essence - 30€",
            start: new Date(2025, 1, 18), // 18 février 2025
            end: new Date(2025, 1, 18),
        },
        {
            title: "Essence - 30€",
            start: new Date(2025, 1, 18), // 18 février 2025
            end: new Date(2025, 1, 18),
        },
        {
            title: "Essence - 30€",
            start: new Date(2025, 1, 18), // 18 février 2025
            end: new Date(2025, 1, 18),
        },
        {
            title: "Cinéma - 15€",
            start: new Date(2025, 1, 25),
            end: new Date(2025, 1, 25),
        },
    ]);

    return (
        <div style={{ height: "80vh", padding: "10px", fontFamily: "Arial, sans-serif" }}>
            <Calendar
                localizer={localizer}
                events={transactions}
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
                            padding: "8px",
                            fontWeight: "bold",
                            fontSize: "12px",
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