import React, {useEffect, useState} from 'react';
import useTransacOccasStore  from "../../store/useTransacOccasStore.js";

import {
    faAppleWhole, faCaretDown, faCaretUp,
    faChartBar, faChartColumn, faChartPie,
    faCreditCard, faEllipsis, faEraser,
    faFilter, faGift,
    faHouse, faPenToSquare, faPlane,
    faPlusCircle, faSave, faSquareCaretDown, faSquareCaretUp, faTable, faThumbtack,
    faTicket, faTrash,
    faUmbrella
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalDeleteTransaction from "../Modals/ModalsTransaction/ModalDeleteTransaction.jsx";
import ModalDeleteAllTransactionByCategory from "../Modals/ModalsTransaction/ModalDeleteAllTransactionByCategory.jsx";
import ModalUpdateTransaction from "../Modals/ModalsTransaction/ModalUpdateTransaction.jsx";
import ModalAddTransactionOccas from "../Modals/ModalsTransaction/ModalAddTransactionOccas.jsx";
import ModalAddSubTransaction from "../Modals/ModalsTransaction/ModalAddSubTransaction.jsx";
import ModalDatatable from "../Modals/ModalDatatable.jsx";
import ModalChartOccasionnellePie from "../Modals/ModalChartOccasionnellePie.jsx";
import usePeriodStore from "../../store/usePeriodStore.js";
import ModalChartOccasionnelleBar from "../Modals/ModalChartOccasionnelleBar.jsx";
import useTemplateStore from "../../store/useTemplateStore.js";


// ICON CATEGORIES
const iconMap = {
    5: faAppleWhole,
    6: faPlane,
    7: faGift,
    8: faThumbtack,
};

// CALCULE TOTAL CATEGORIES
const calculateTotal = (transactions) => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
};

const calculateTransactionsTotal = (transactions) => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
        return "0.00";
    }

    const total = transactions.reduce((globalTotal, transaction) => {
        const transactionTotal =
            transaction.subTransactions?.reduce((sum, sub) => sum + sub.amount, 0) || 0;
        return globalTotal + transactionTotal;
    }, 0);

    return total.toFixed(2);
};




const CardOccasionnelle = () => {



    // STORE
    const {
        categories,
        loading,
        error,
        fetchOccasByPeriod,
        addTransactionOccas,
        deleteTransactionOccas,
        deleteAllTransactionsByCategory,
        updateTransaction,
        addSubTransaction
    } = useTransacOccasStore();
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
    const [dataDatatable, setDataDatatable] = useState(null);
    const [viewSubTransactions, setViewSubTransactions] = useState(false);

    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year);

    // RECUP CATEGORIES - OCCASIONNELLE
    useEffect(() => {
        fetchOccasByPeriod(month, year);

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

    // AFFICHER SOUS-TRANSACTION
    const handleViewSubTransactions = () => {
        setViewSubTransactions(prevState => !prevState);
    }

    // MODALS
    // AJOUTER TRANSACTION
    const modalAddTransaction = (e) => {
        setCurrentModal("modalAddTransaction");
        setCategoryId(Number(e.currentTarget.id));
    };
    // MODAL MODIFIER TRANSACTION (NOM - AMOUNT)
    const modalUpadte = (e) => {
        setCurrentModal("modalUpadte");
        setTransactionId(Number(e.currentTarget.id));
    }
    // MODAL SUPPRIMER TRANSACTION
    const modalSupprimer = (e) => {
        setCurrentModal("modalDeleteTransaction");
        setTransactionId(Number(e.currentTarget.id));
    }
    // MODAL SUPPRIMER TOUT LES TRANSACTIONS D UNE CATEGORIE
    const modalDeleteAllTransactionByCategory = (e) => {
        setCurrentModal("modalDeleteAllTransactionByCategory");
        setCategoryId(Number(e.currentTarget.id));
    }
    // MODAL DATATABLE
    const modalDatatable = (e) => {
        setCurrentModal("modalDatatable");
        const cat = categories.find((c) => c.id === Number(e.currentTarget.id));
        setDataDatatable(cat);
    }

    // MODAL GRAPHIQUE PIE
    const modalChart = (e) => {
        setCurrentModal("modalChart");
        const cat = categories.find((c) => c.id === Number(e.currentTarget.id));
        setDataChart(cat);
    };
    // MODAL GRAPHIQUE BAR
    const modalChartBar = (e) => {
        console.log('bar chart')
        setCurrentModal("modalChartBar");
        const cat = categories.find((c) => c.id === Number(e.currentTarget.id));
        setDataChart(cat);
    };

    // MODAL AJOUTER SUB-TRANSACTION
    const modalAddSubTransaction = async (e) => {
        console.log("📡 Tentative d'ajout d'une sous-transaction...");
        setCurrentModal("modalAddSubTransaction");
        setTransactionId(Number(e.currentTarget.id))

    }
    // HANDLER AJOUTER SUB TRANSACTION
    const handleAddSubTransaction = async (data) => {
        console.log(transactionId, data)
        await addSubTransaction(transactionId, data);
    }

    // MODAL FERMETURE
    const closeModal = () => {
        setCurrentModal(null);
    };
    // MODAL USETEMPLATE
    const modalUseTemplate = async (categoryId) => {
        const confirm = window.confirm("⚠️ Cette action remplacera toutes les transactions actuelles par celles du template. Continuer ?");
        if (confirm) {
            await applyTemplateToCategory(categoryId);
            await fetchOccasByPeriod(month, year);
        }
    };

    // HANDLER AJOUTER
    const handleAddTransaction = async (data) => {
        await addTransactionOccas(categoryId, data);
        await fetchOccasByPeriod(month, year);
        closeModal();
    };
    // HANDLER UPDATE TRANSACTION
    const handleUpdateTransaction = async (data) => {
        console.log(data)
        const name = data.name
        const amount = data.amount
        await updateTransaction(transactionId, name, amount);
    };
    // HANDLE SUPPRIMER UN TRANSACTION
    const handleDelete = async (transactionId) => {
        await deleteTransactionOccas(transactionId);
    };

    // HANDLER SUPPRIMER TOUTES LES TRANSACTION D UNE CATEGORIE
    const handleDeleteAllTransacByCategory = async (transactionId) => {
        await deleteAllTransactionsByCategory(transactionId);
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
                                    <FontAwesomeIcon icon={iconMap[card.id]} className="mr-3"
                                                     style={{color: "#74C0FC"}}/>
                                )}
                                {card.name}
                            </h5>
                            <div className="px-0 py-0 flex gap-4">
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Utiliser un template"
                                    onClick={() => modalUseTemplate(card.id)}
                                >
                                    <FontAwesomeIcon icon={faSave}/>
                                </button>
                                {/* Btn Afficher sous-transaction */}
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Filtre"
                                    id={card.id}
                                    onClick={handleViewSubTransactions}
                                >
                                    {viewSubTransactions ? <FontAwesomeIcon icon={faSquareCaretUp}/> :
                                        <FontAwesomeIcon icon={faSquareCaretDown}/>}


                                </button>
                                {/* Btn Filtre */}
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Filtre"
                                    id={card.id}
                                >
                                    <FontAwesomeIcon icon={faFilter}/>
                                </button>

                                {/* Btn Ajouter transaction */}
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Ajouter un élément"
                                    id={card.id}
                                    onClick={modalAddTransaction}
                                >
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                </button>

                                <div className="relative inline-block dropdown">
                                    <button
                                        onClick={() => toggleDropdown(`header-${card.id}`)}
                                        className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                        title="Options"
                                        id={`header-${card.id}`}
                                    >
                                        <FontAwesomeIcon icon={faEllipsis}/>
                                    </button>
                                    {openDropdownId === `header-${card.id}` && (
                                        <div
                                            className="absolute flex flex-col right-0 p-2 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                                            {/* Btn Datatable */}
                                            <button
                                                className="text-gray-500 pb-3 hover:text-blue-500 dark:hover:text-blue-400"
                                                title="Graphique"
                                                id={card.id}
                                                onClick={modalDatatable}
                                            >
                                                <FontAwesomeIcon icon={faTable}/>
                                            </button>
                                            {/* Btn Graphique */}
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
                                            {/* Btn Supprimer toutes les transactions et sous-transactionW */}
                                            <button
                                                className="text-gray-500 hover:text-blue-500 dark:hover:text-red-400"
                                                title="Filtre"
                                                id={card.id}
                                                onClick={modalDeleteAllTransactionByCategory}
                                            >
                                                <FontAwesomeIcon icon={faEraser}/>
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
                                    card.transactions.map((transaction, i) => {
                                        // 📌 Calculer le total des sous-transactions uniquement
                                        const totalSubTransactions =
                                            transaction.subTransactions?.reduce((sum, sub) => sum + sub.amount, 0) || 0;
                                        const totalTransaction = totalSubTransactions; // Total uniquement basé sur les sous-transactions

                                        return (
                                            <React.Fragment key={transaction.id}>
                                                {/* 📌 Transaction principale avec total */}
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 relative">
                                                    <td className="px-4 py-2">{transaction.subTransactions.length}</td>
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {transaction.name}
                                                    </td>
                                                    <td className="px-4 py-2">{totalTransaction.toFixed(2)} €</td>
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
                                                                    onClick={modalAddSubTransaction}
                                                                >
                                                                    <FontAwesomeIcon icon={faPlusCircle}/> Ajouter
                                                                </button>
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

                                                {/* 📌 Affichage des sous-transactions */}
                                                {viewSubTransactions ?
                                                    <tr className="bg-gray-100 dark:bg-gray-900">
                                                        <td colSpan="3">
                                                            <div className="ml-6">
                                                                <p className="text-gray-700 dark:text-gray-300 font-semibold">Sous-transactions
                                                                    :</p>
                                                                {Array.isArray(transaction.subTransactions) && transaction.subTransactions.length > 0 ? (
                                                                    <ul className="list-disc ml-4">
                                                                        {transaction.subTransactions.map((sub) => (
                                                                            <li key={sub.id}
                                                                                className="text-sm text-gray-700 dark:text-gray-300">
                                                                                {sub.date} - {sub.amount} € - {sub.commerce}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p className="text-sm text-gray-500 italic">Pas de
                                                                        sous-transactions</p>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    :
                                                    null
                                                }

                                            </React.Fragment>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4">Aucune transaction</td>
                                    </tr>
                                )}


                                </tbody>
                            </table>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                            <div className="flex-1 text-center border-r border-gray-300 dark:border-gray-600">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {calculateTransactionsTotal(card.transactions)} €
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Mois</div>
                            </div>
                            <div className="flex-1 text-center border-r border-gray-300 dark:border-gray-600">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {(calculateTransactionsTotal(card.transactions) * 3).toFixed(2)} €
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Trimestre</div>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {(calculateTransactionsTotal(card.transactions) * 12).toFixed(2)} €
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Année</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL Add Transaction */}
            {currentModal === "modalAddTransaction" && (
                <ModalAddTransactionOccas closeModal={closeModal} addTransactionOccas={handleAddTransaction} />
            )}
            {/* MODAL Add SubTransaction */}
            {currentModal === "modalAddSubTransaction" && (
                <ModalAddSubTransaction closeModal={closeModal} handleAddSubTransaction={handleAddSubTransaction} />
            )}
            {/* MODAL Upadte */}
            {currentModal === "modalUpadte" && (
                <ModalUpdateTransaction closeModal={closeModal} handleUpdateTransaction={handleUpdateTransaction}/>
            )}
            {/* MODAL Supprimer */}
            {currentModal === "modalDeleteTransaction" && (
                <ModalDeleteTransaction closeModal={closeModal}
                                        handleDelete={() => {
                                            handleDelete(transactionId)
                                        }}
                />
            )}
            {/* MODAL Supprimer toutes les transactiond d'une catégorie */}
            {currentModal === "modalDeleteAllTransactionByCategory" && (
                <ModalDeleteAllTransactionByCategory
                    closeModal={closeModal}
                    handleDeleteAllTransacByCategory={() => {
                        handleDeleteAllTransacByCategory(categoryId)
                    }}
                />
            )}
            {/* MODAL Chart */}
            {currentModal === "modalChart" && dataChart && (
                <ModalChartOccasionnellePie closeModal={closeModal} dataChart={dataChart} />
            )}{/* MODAL Chart */}
            {currentModal === "modalChartBar" && dataChart && (
                <ModalChartOccasionnelleBar closeModal={closeModal} dataChart={dataChart} />
            )}

            {/* MODAL Datatable */}
            {currentModal === "modalDatatable" && (
                <ModalDatatable closeModal={closeModal} dataDatatable={dataDatatable} />
            )}
        </>
    );
};



export default CardOccasionnelle;