import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import useTransacFixeStore from "../../store/useTransacFixeStore.js";
import useTransacRevenuStore from "../../store/useTransacRevenuStore.js";
import useTransacOccasStore from "../../store/useTransacOccasStore.js";
import usePeriodStore from "../../store/usePeriodStore.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faClone} from "@fortawesome/free-solid-svg-icons";
/*import 'react-datepicker/dist/react-datepicker.css';*/

const TitrePeriod = () => {

    // STORE
    const {
        fetchFixeByPeriod,
    } = useTransacFixeStore();
    const {
        fetchRevenuByPeriod,
    } = useTransacRevenuStore();
    const {
        fetchOccasByPeriod,
    } = useTransacOccasStore();
    const {
        addMonth,
        addYear,
    } = usePeriodStore();

    // DATEPIKER - Initialisation avec la date actuelle
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Récupération du mois et de l'année
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();


    const renderMonthContent = (month, shortMonth, longMonth, day) => {
        const fullYear = new Date(day).getFullYear();
        const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;
        return <span title={tooltipText}>{shortMonth}</span>;
    };

    useEffect(() => {
        addMonth(selectedMonth);
        addYear(selectedYear);
        fetchFixeByPeriod(selectedMonth, selectedYear);
        fetchRevenuByPeriod(selectedMonth, selectedYear);
        fetchOccasByPeriod(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);


    return (
        <>
            <div className="pt-2 px-3 ">
                <div className="dark:bg-gray-800 dark:border-gray-700 text-xs border-gray-300 py-3 px-4  rounded-xl mb-4 flex items-center border">
                    <span>
                        <FontAwesomeIcon style={{color: "#74C0FC", fontSize: "18px"}} icon={faClone} />
                    </span>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        renderMonthContent={renderMonthContent}
                        showMonthYearPicker
                        dateFormat="MM/yyyy"
                        className="custom-date-picker"
                        calendarClassName="custom-calendar"
                        showMonthYearDropdown
                    />
                    <FontAwesomeIcon className="text-blue-300" icon={faChevronDown} />
                </div>


            </div>
        </>
    );
};

export default TitrePeriod;
