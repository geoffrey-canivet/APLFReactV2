import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import {faCalendarDays, faClone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // Icône de calendrier

const FloatingDatePicker = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const datePickerRef = useRef(null); // Référence pour détecter le clic extérieur

    // Ferme le DatePicker si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };

        if (showDatePicker) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDatePicker]);

    return (
        <div className="fixed bottom-20 right-6 flex flex-col items-end">
            {showDatePicker && (
                <motion.div
                    ref={datePickerRef} // Référence pour détecter le clic extérieur
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 10}}
                    className="mb-2 bg-white p-4 rounded-lg shadow-lg"
                >
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        inline
                    />
                </motion.div>
            )}


            <button type="button"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="shadow-lg mt-5 relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FontAwesomeIcon style={{fontSize: "20px"}} icon={faCalendarDays}/>
                <span className="sr-only">Périodes</span>
            </button>
        </div>
    );
};

export default FloatingDatePicker;
