
import {useState} from "react";
import DatePicker from 'react-datepicker';
/*import 'react-datepicker/dist/react-datepicker.css';*/

const TitrePeriod = () => {

    // DATEPIKER
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderMonthContent = (month, shortMonth, longMonth, day) => {
        const fullYear = new Date(day).getFullYear();
        const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

        return <span title={tooltipText}>{shortMonth}</span>;
    };

    const [currentModal, setCurrentModal] = useState(null);
    // FERMER MODAL
    const closeModal = () => {
        setCurrentModal(null);
    }

    return (
        <>
            <div className="pt-2 px-3 ">
                <div className="dark:bg-gray-800 dark:border-gray-700 border-gray-300 py-3 px-4  rounded-xl mb-4 flex items-center border">
                    <span>
                        <svg className="w-6 h-6 text-gray-800 dark:text-blue-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             viewBox="0 0 24 24">
                            <path fillRule="evenodd"d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd"/>
                        </svg>
                    </span>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        renderMonthContent={renderMonthContent}
                        showMonthYearPicker
                        dateFormat="MM/yyyy"
                        className="custom-date-picker" // Classe pour l'input
                        calendarClassName="custom-calendar" // Classe pour le calendrier
                     showMonthYearDropdown/>
                </div>
            </div>

        </>
    );
};

export default TitrePeriod;