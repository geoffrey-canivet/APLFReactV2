import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import DatePicker from "react-datepicker";
import {faCalendarDays, faClone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FloatingTemplatePicker = () => {

    return (
        <div className="fixed bottom-6 right-6 flex flex-col items-end">
            <button type="button"
                    className="shadow-lg relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FontAwesomeIcon style={{fontSize: "20px"}} icon={faClone}/>
                <span className="sr-only">Templates</span>
                <div
                    className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">D
                </div>
            </button>




        </div>
    );
};

export default FloatingTemplatePicker;