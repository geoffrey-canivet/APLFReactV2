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


const ToolDetailsMoisContainer = () => {


    return (
        <div className="flex flex-row justify-between">
            <div className="w-1/3">
                <PieCategoryMonth/>

            </div>
            <div className="w-1/3">
                <BarFixeCategoryMonth/>

            </div>
            <div className="w-1/3">
                <BarOccasionnelleCategoryMonth/>

            </div>
            <div className="w-1/3">
                <BarRevenuCategoryMonth/>

            </div>
        </div>
    );
};

export default ToolDetailsMoisContainer;