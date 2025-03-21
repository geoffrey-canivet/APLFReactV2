import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartBar, faChartColumn, faChartPie, faClone,
    faCreditCard,
    faEllipsis, faEllipsisVertical, faEraser, faFilter,
    faHouse,
    faPenToSquare,
    faPlusCircle, faSave,
    faTicket,
    faTrash,
    faUmbrella,
} from "@fortawesome/free-solid-svg-icons";
import ModalAddTransaction from "../Modals/ModalsTransaction/ModalAddTransaction.jsx";
import ModalChartPie from "../Modals/ModalChartPie.jsx";
import useTransacFixeStore from "../../store/useTransacFixeStore.js";
import ModalDeleteTransaction from "../Modals/ModalsTransaction/ModalDeleteTransaction.jsx";
import ModalDeleteAllTransactionByCategory from "../Modals/ModalsTransaction/ModalDeleteAllTransactionByCategory.jsx";
import ModalUpdateTransaction from "../Modals/ModalsTransaction/ModalUpdateTransaction.jsx";
import usePeriodStore from "../../store/usePeriodStore.js";
import ModalChartBar from "../Modals/ModalChartBar.jsx";
import useTemplateStore from "../../store/useTemplateStore.js";
import ModalUseTemplate from "../Modals/ModalsTemplate/ModalUseTemplate.jsx";


// ICON CATEGORIES
const iconMap = {
    1: faHouse,
    2: faCreditCard,
    3: faUmbrella,
    4: faTicket,
};

// CALCULE TOTAL CATEGORIES
const calculateTotal = (transactions) => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
};

const CardFixe = () => {
    // STORE
    const {
        categories,
        loading,
        error,
        fetchFixe,
        fetchFixeByPeriod,
        addTransactionFixe,
        deleteTransaction ,
        deleteAllTransactionsByCategory,
        updateTransaction
    } = useTransacFixeStore();
    const {
        month,
        year,
    } = usePeriodStore();
    const { applyTemplateToCategory } = useTemplateStore();

    // STATE
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [currentModal, setCurrentModal] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [transactionId, setTransactionId] = useState(0);
    const [dataChart, setDataChart] = useState(null);

    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year);

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // RECUP CATEGORIES - TRANSACTIONS
    useEffect(() => {
        fetchFixeByPeriod(month, year);
    }, [month, year]);

    // DROPDOWN
    const toggleDropdown = (id) => {
        setOpenDropdownId((prevId) => (prevId === id ? null : id));
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown")) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // MODALS
    // AJOUTER TRANSACTION
    const modalAddTransaction = (e) => {
        setCurrentModal("modalAddTransaction");
        setCategoryId(Number(e.currentTarget.id));
    };
    // MODAL MODIFIER TRANSACTION (NOM - AMOUNT)
    const modalUpadte = (e) => {

        setTransactionId(Number(e.currentTarget.id));
        const transaction = categories
            .flatMap(category => category.transactions)
            .find(transaction => transaction.id === Number(e.currentTarget.id));

        if (!transaction) {
            console.error("Transaction introuvable !");
            return;
        }

        setSelectedTransaction(transaction);

        setCurrentModal("modalUpadte");
    }
    // MODAL SUPPRIMER
    const modalSupprimer = (e) => {
        setCurrentModal("modalDeleteTransaction");
        setTransactionId(Number(e.currentTarget.id));
    }
    // MODAL SUPPRIMER TOUT LES TRANSACTIONS D UNE CATEGORIE
    const modalDeleteAllTransactionByCategory = (e) => {
        setCurrentModal("modalDeleteAllTransactionByCategory");
        setCategoryId(Number(e.currentTarget.id));
    }
    // MODAL GRAPHIQUE PIE
    const modalChart = (e) => {
        setCurrentModal("modalChart");
        const cat = categories.find((c) => c.id === Number(e.currentTarget.id));
        setDataChart(cat);
    };
    // MODAL GRAPHIQUE BAR
    const modalChartBar = (e) => {
        setCurrentModal("modalChartBar");
        const cat = categories.find((c) => c.id === Number(e.currentTarget.id));
        setDataChart(cat);
    };
    // MODAL FERMETURE
    const closeModal = () => {
        setCurrentModal(null);
    };
    // MODAL USETEMPLATE
    const modalUseTemplate = async (categoryId) => {
        setCurrentModal("modalUseTemplate");
        setCategoryId(categoryId);
    };

    const handleUseTemplate = async () => {
        await applyTemplateToCategory(categoryId);
    }





    // HANDLER AJOUTER
    const handleAddTransaction = async (data) => {
        await addTransactionFixe(categoryId, data);
        await fetchFixeByPeriod(month, year);
        closeModal();
    };

    // HANDLER UPDATE TRANSACTION
    const handleUpdateTransaction = async (data) => {

        const name = data.name
        const amount = data.amount
        await updateTransaction(transactionId, name, amount);
    };

    // HANDLER SUPPRIMER UNE TRANSACTION
    const handleDelete = async (e) => {

        await deleteTransaction(transactionId);
    };

    // HANDLER SUPPRIMER TOUTES LES TRANSACTION D UNE CATEGORIE
    const handleDeleteAllTransacByCategory = async (categoryId) => {
        await deleteAllTransactionsByCategory(categoryId);
    };





    if (loading) return <div>
        <div role="status">
            <svg aria-hidden="true"
                 className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"/>
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div>;
    if (error) return <p>{error}</p>;

    return (
        <>

            {openDropdownId && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setOpenDropdownId(null)}
                ></div>
            )}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center m-5">
                {categories.map((card) => (
                    <div
                        key={card.id}
                        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        {/* Header */}
                        <div className="flex justify-between px-4 pt-2 pb-2 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {iconMap[card.id] && (
                                    <FontAwesomeIcon icon={iconMap[card.id]} className="mr-3" style={{color: "#74C0FC"}}/>
                                )}
                                {card.name}
                            </h5>
                            <div className="px-0 py-0 flex gap-4">
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Utiliser un template"
                                    onClick={() => modalUseTemplate(card.id)}
                                >
                                    <FontAwesomeIcon icon={faClone} />
                                </button>


                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Ajouter une transaction"
                                    id={card.id}
                                    onClick={modalAddTransaction}
                                >
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                </button>
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-red-400"
                                    title="Supprimer toutes les transactions"
                                    id={card.id}
                                    onClick={modalDeleteAllTransactionByCategory}
                                >
                                    <FontAwesomeIcon icon={faEraser}/>
                                </button>
                                <div className="relative inline-block dropdown">
                                    <button
                                        onClick={() => toggleDropdown(`header-${card.id}`)}
                                        className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                        title="Autres options"
                                        id={`header-${card.id}`}
                                    >
                                        <FontAwesomeIcon icon={faEllipsis}/>
                                    </button>
                                    {openDropdownId === `header-${card.id}` && (
                                        <div
                                            className="absolute flex flex-col right-0 p-2 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                                            <button
                                                className="text-gray-500 pb-3 hover:text-blue-500 dark:hover:text-blue-400"
                                                title="Graphique"
                                                id={card.id}
                                                onClick={modalChart}
                                            >
                                                <FontAwesomeIcon icon={faChartPie}/>
                                            </button>
                                            <button
                                                className="text-gray-500 pb-3 hover:text-blue-500 dark:hover:text-blue-400"
                                                title="Graphique"
                                                id={card.id}
                                                onClick={modalChartBar}
                                            >
                                                <FontAwesomeIcon icon={faChartColumn}/>
                                            </button>
                                            <button
                                                disabled={true}
                                                className="text-gray-600"
                                                title="Filtre"
                                                id={card.id}
                                            >
                                                <FontAwesomeIcon icon={faFilter}/>
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        {/* Transactions */}
                        <div className="relative w-full h-64 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                {card.transactions?.length > 0 ? (
                                    card.transactions.map((transaction, i) => (
                                        <tr
                                            key={transaction.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 relative"
                                        >
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {transaction.name}
                                            </td>
                                            <td className="px-4 py-2">{transaction.amount} €</td>
                                            <td className="px-4 py-2 relative">
                                                <button
                                                    onClick={() => toggleDropdown(`${card.id}-${i}`)}
                                                    className="dropdown text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                                >
                                                    <FontAwesomeIcon icon={faEllipsis}/>
                                                </button>
                                                {openDropdownId === `${card.id}-${i}` && (
                                                    <div
                                                        className="absolute right-3 mt-2 w-32 border border-gray-600 dark:bg-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                                                        <button
                                                            id={transaction.id}
                                                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-500"
                                                            onClick={modalUpadte}
                                                        >
                                                            <FontAwesomeIcon icon={faPenToSquare}/> Modifier
                                                        </button>
                                                        <button
                                                            id={transaction.id}
                                                            onClick={modalSupprimer}
                                                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-500"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash}/> Supprimer
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4">
                                            Aucun élément
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                            <div className="flex-1 text-center border-r border-gray-300 dark:border-gray-600">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {calculateTotal(card.transactions).toFixed(2)} €
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Mois</div>
                            </div>
                            <div className="flex-1 text-center border-r border-gray-300 dark:border-gray-600">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {(calculateTotal(card.transactions) * 3).toFixed(2)} €
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Trimestre</div>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {(calculateTotal(card.transactions) * 12).toFixed(2)} €
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Année</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL Add Transaction */}
            {currentModal === "modalAddTransaction" && (
                <ModalAddTransaction closeModal={closeModal} addTransactionFixe={handleAddTransaction}/>
            )}
            {/* MODAL Upadte */}
            {currentModal === "modalUpadte" && (
                <ModalUpdateTransaction transaction={selectedTransaction} closeModal={closeModal} handleUpdateTransaction={handleUpdateTransaction}/>
            )}
            {/* MODAL Supprimer */}
            {currentModal === "modalDeleteTransaction" && (
                <ModalDeleteTransaction closeModal={closeModal}
                                        handleDelete={handleDelete}

                />
            )}
            {/* MODAL Supprimer toutes les transactiond d'une catégorie */}
            {currentModal === "modalDeleteAllTransactionByCategory" && (
                <ModalDeleteAllTransactionByCategory closeModal={closeModal}
                                                     handleDeleteAllTransacByCategory={() => {
                                                         handleDeleteAllTransacByCategory(categoryId)

                                                     }}

                />
            )}
            {/* MODAL Chart Pie */}
            {currentModal === "modalChart" && dataChart && (
                <ModalChartPie closeModal={closeModal} dataChart={dataChart}/>
            )}
            {/* MODAL Chart Bar */}
            {currentModal === "modalChartBar" && dataChart && (
                <ModalChartBar closeModal={closeModal} dataChart={dataChart}/>
            )}
            {/* MODAL utiliser un template */}
            {currentModal === "modalUseTemplate" && (
                <ModalUseTemplate closeModal={closeModal} handleUseTemplate={handleUseTemplate}

                />
            )}
        </>
    );
};

export default CardFixe;
