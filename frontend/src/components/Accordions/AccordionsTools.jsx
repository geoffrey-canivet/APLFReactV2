import {faChartLine, faBullseye, faSkullCrossbones, faClone, faCalendar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import CardData from "../../utils/DB.js";
import ToolDetailsMoisContainer from "../Tools/ToolDetailsMoisContainer.jsx";
import ToolComparContainer from "../Tools/ToolComparContainer.jsx";
import CardTemplate from "../Cards/CardTemplate.jsx";
import ToolCalendar from "../Tools/ToolCalendar.jsx";

const AccordionsTools = () => {

    // ACCORDIONS
    const [openAccordion, setOpenAccordion] = useState(null);
    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    }

    const accordions = [
        {id: 4, title: "Templates", content:<CardTemplate/>, icon: faClone},
        {id: 5, title: "Comparer les mois", content:<ToolComparContainer/>, icon: faChartLine},
        {id: 6, title: "Détails du mois", content: <ToolDetailsMoisContainer/>, icon: faBullseye},
        {id: 7, title: "Calendrier", content:<ToolCalendar/>, icon: faCalendar}
    ];

    return (
        <>
            <div className="text-white px-4">
                <div id="accordion-open">
                    {accordions.map((item, index) => (
                        <div key={item.id} className="mb-1">
                            <h2 id={`accordion-heading-${item.id}`}>
                                <button
                                    type="button"
                                    className={`flex items-center justify-between w-full p-2 px-4 font-medium text-gray-300 focus:ring-4 dark:bg-gray-700 focus:ring-gray-200 dark:focus:ring-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-blue-400 dark:hover:bg-gray-800 gap-3 ${
                                        index === 0 ? "rounded-t-xl" : ""
                                    } ${
                                        index === accordions.length - 1 ? "rounded-b-xl" : ""
                                    }`}
                                    onClick={() => toggleAccordion(item.id)}
                                    aria-expanded={openAccordion === item.id}
                                    aria-controls={`accordion-body-${item.id}`}
                                >
                                <span className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="w-4 h-4 mr-3 text-gray-300"
                                    />
                                    {item.title}
                                </span>
                                    <svg
                                       /* data-accordion-icon*/
                                        className={`w-3 h-3 transform transition-transform duration-300 ${
                                            openAccordion === item.id ? "rotate-180" : ""
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </button>
                            </h2>
                            <div
                                id={`accordion-body-${item.id}`}
                                className={`transition-all duration-300 overflow-hidden ${
                                    openAccordion === item.id ? "min-h-full opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                    {item.content}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AccordionsTools;