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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mb-2 bg-white p-4 rounded-lg shadow-lg"
                >
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        inline
                    />
                </motion.div>
            )}

            <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="bg-gray-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
            >
                <FontAwesomeIcon icon={faCalendarDays} />
            </button>
        </div>
    );
};

export default FloatingDatePicker;
