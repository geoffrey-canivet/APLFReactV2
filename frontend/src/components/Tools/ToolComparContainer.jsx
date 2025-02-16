import ComparatifBarMois from "../Charts/Tools/ComparatifBarMois.jsx";
import ComparatifCategoriesByMoisAnnee from "../Charts/Tools/ComparatifBarMois.jsx";
import {
    faCashRegister,
    faCircleArrowUp,
    faCircleDown,
    faCircleUp, faCreditCard, faHouse,
    faLandmark, faTicket, faUmbrella,
    faWallet
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BarChartComparatifFixe from "../Charts/Fixe/BarChartComparatifFixe.jsx";
import BarFixeCategoryMonth from "../Charts/Tools/BarFixeCategoryMonth.jsx";
import BarOccasionnelleCategoryMonth from "../Charts/Tools/BarOccasionnelleCategoryMonth.jsx";
import BarRevenuCategoryMonth from "../Charts/Tools/BarRevenuCategoryMonth.jsx";
import React from "react";
import BarChartComponent from "../Charts/Tools/BarChartComponent.jsx";
import PieCategoryMonth from "../Charts/Tools/PieCategoryMonth.jsx";

const ToolComparContainer = () => {
    return (
        <>


            <div className="flex flex-row justify-between">
                <div className="w-1/3">
                    <PieCategoryMonth/>
                    <ul>
                        <li className=" sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                            <div className="flex items-center">
                                <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                    <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faLandmark}/>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Dépense fixe
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Juillet
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> Mars
                                    </p>
                                </div>
                                <div
                                    className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                    <div className="text-red-400">150.00 €</div>
                                    <div className="text-green-400">90.00 €</div>

                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-1/3">
                    <BarFixeCategoryMonth/>
                    <ul>
                        <li className=" sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                            <div className="flex items-center">
                                <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                    <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faLandmark}/>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Dépense fixe
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Juillet
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> Mars
                                    </p>
                                </div>
                                <div
                                    className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                    <div className="text-red-400">150.00 €</div>
                                    <div className="text-green-400">90.00 €</div>

                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-1/3">
                    <BarOccasionnelleCategoryMonth/>
                    <ul>
                        <li className=" sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                            <div className="flex items-center">
                                <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                    <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faLandmark}/>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Dépense fixe
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Juillet
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> Mars
                                    </p>
                                </div>
                                <div
                                    className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                    <div className="text-red-400">150.00 €</div>
                                    <div className="text-green-400">90.00 €</div>

                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-1/3">
                    <BarRevenuCategoryMonth/>
                    <ul>
                        <li className=" sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                            <div className="flex items-center">
                                <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                    <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faLandmark}/>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Dépense fixe
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Juillet
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> Mars
                                    </p>
                                </div>
                                <div
                                    className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                    <div className="text-red-400">150.00 €</div>
                                    <div className="text-green-400">90.00 €</div>

                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>


        </>
    );
};

export default ToolComparContainer;