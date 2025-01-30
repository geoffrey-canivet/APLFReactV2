import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faWallet,
    faCashRegister,
    faLandmark
} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import CardFixe from "../Cards/CardFixe.jsx";
import CardOccasionnelle from "../Cards/CardOccasionnelle.jsx";
import CardRevenu from "../Cards/CardRevenu.jsx";



const AccordionsCards = () => {



    // ACCORDIONS
    const [openAccordion, setOpenAccordion] = useState(1);
    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    }

    const accordions = [
        {id: 1, title: "Dépenses fixes", content: <CardFixe/>, icon: faLandmark},
        {id: 2, title: "Dépenses occasionnelles", content: <CardOccasionnelle/>, icon: faCashRegister},
        {id: 3, title: "Revenus", content: <CardRevenu/>, icon: faWallet},
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
                                    className={`flex items-center justify-between w-full p-2 px-4 font-medium text-gray-300 focus:ring-4 dark:bg-gray-700 focus:ring-gray-200 dark:focus:ring-gray-800 dark:text-gray-300  dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 ${
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
                                        className="w-4 h-4 mr-3 text-gray-300  hover:text-blue-400"
                                    />
                                    {item.title}
                                </span>
                                    <svg
                                        data-accordion-icon
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
                                <div className="p-0 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
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

export default AccordionsCards;