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

const ToolComparContainer = () => {
    return (
        <>
            <div className="flex">
                <div className="w-3/4">
                    <div className="flex items-center mb-4">
                        <span className="flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Types par mois.
                        </h5>
                    </div>
                    <ComparatifCategoriesByMoisAnnee/>
                </div>
                <div className="w-1/4">
                    <div className="flex items-center mb-4">
                        <span className="flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Types par mois.
                        </h5>
                    </div>
                    <div
                        className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-4 dark:bg-gray-800 dark:border-gray-700">

                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
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
                                <li className="py-3 sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                            <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faCashRegister}/>
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Occasionnelles
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Octobre
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-green-400"
                                                                 icon={faCircleDown}/> Février
                                            </p>
                                        </div>
                                        <div
                                            className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                            <div className="text-red-400">50.OO €</div>
                                            <div className="text-green-400">35.34 €</div>

                                        </div>

                                    </div>
                                </li>
                                <li className="py-3 pb-0 sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                            <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faWallet}/>
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Revenus
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Décembre
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> Juin
                                            </p>
                                        </div>
                                        <div
                                            className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                            <div className="text-red-400">250.00 €</div>
                                            <div className="text-green-400">110.00 €</div>

                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                <div className="w-3/4">
                    <div className="flex items-center mb-4">
                        <span className="flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Transactions par mois.
                        </h5>
                    </div>
                    <BarChartComparatifFixe/>
                </div>
                <div className="w-1/4">
                    <div className="flex items-center mb-4">
                        <span className="flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Transactions par mois.
                        </h5>
                    </div>
                    <div
                        className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm sm:p-4 dark:bg-gray-800 dark:border-gray-700">

                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                                    <div className="flex items-center justify-left">
                                        <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                            <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faHouse}/>
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Charges
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Juillet
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> Mars
                                            </p>
                                        </div>
                                        <div
                                            className="flex flex-col text-sm font-semibold text-gray-900 dark:text-white">

                                            <div className="text-red-400">150.00 €</div>
                                            <div className="text-green-400">90.00 €</div>

                                        </div>

                                    </div>
                                </li>
                                <li className="py-3 sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                            <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faCreditCard}/>
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Crédits
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Octobre
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-green-400"
                                                                 icon={faCircleDown}/> Février
                                            </p>
                                        </div>
                                        <div
                                            className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                            <div className="text-red-400">50.00 €</div>
                                            <div className="text-green-400">35.34 €</div>

                                        </div>

                                    </div>
                                </li>
                                <li className="py-3 pb-0 sm:py-4 px-4 hover:bg-gray-500 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                            <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faUmbrella}/>
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Assurances
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Décembre
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> Juin
                                            </p>
                                        </div>
                                        <div
                                            className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                            <div className="text-red-400">250.00 €</div>
                                            <div className="text-green-400">110.00 €</div>

                                        </div>

                                    </div>
                                </li>
                                <li className="py-3 pb-0 sm:py-4 px-4 hover:bg-gray-500 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-gray-900 rounded-lg mr-3">
                                            <FontAwesomeIcon className="text-blue-400 w-6 h-6" icon={faTicket}/>
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Abonnements
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> Décembre
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> Juin
                                            </p>
                                        </div>
                                        <div
                                            className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                                            <div className="text-red-400">250.00 €</div>
                                            <div className="text-green-400">110.00 €</div>

                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ToolComparContainer;