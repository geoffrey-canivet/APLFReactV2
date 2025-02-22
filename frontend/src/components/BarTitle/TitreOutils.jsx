import {useState} from "react";
import useTicketStore from "../../store/useTicketStore.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRocket} from "@fortawesome/free-solid-svg-icons";

const TitreOutils = () => {

    return (
        <>
            <div className="pt-2 px-3">
                <div
                    className="dark:bg-gray-800 border  dark:border-gray-700 border-gray-300 py-3 px-4  rounded-xl mb-4 flex items-center">
                    <span>

                        <FontAwesomeIcon style={{color: "#74C0FC", fontSize: "18px"}} icon={faRocket} />
                    </span>
                    <h5 className="text-white ml-4 font-bold text-md tracking-wide uppercase">Outils</h5>
                </div>
            </div>
        </>
    );
};

export default TitreOutils;