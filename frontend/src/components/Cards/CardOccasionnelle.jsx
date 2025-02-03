import React, {useEffect, useState} from 'react';
import useTransacOccasStore  from "../../store/useTransacOccasStore.js";
import ModalAddTransaction from "../Modals/ModalsTransaction/ModalAddTransaction.jsx";
import ModalChart from "../Modals/ModalChart.jsx";
import {
    faAppleWhole,
    faChartBar,
    faCreditCard, faEllipsis, faEraser,
    faFilter, faGift,
    faHouse, faPenToSquare, faPlane,
    faPlusCircle, faTable, faThumbtack,
    faTicket, faTrash,
    faUmbrella
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalDeleteTransaction from "../Modals/ModalsTransaction/ModalDeleteTransaction.jsx";
import ModalDeleteAllTransactionByCategory from "../Modals/ModalsTransaction/ModalDeleteAllTransactionByCategory.jsx";
import ModalUpdateTransaction from "../Modals/ModalsTransaction/ModalUpdateTransaction.jsx";
import ModalAddTransactionOccas from "../Modals/ModalsTransaction/ModalAddTransactionOccas.jsx";
import ModalAddSubTransaction from "../Modals/ModalsTransaction/ModalAddSubTransaction.jsx";

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

const CardOccasionnelle = () => {

    console.log("Token :", localStorage.getItem("token"));


    // STORE
    const {
        categories,
        loading,
        error,
        fetchOccas,
        addTransactionOccas,
        deleteTransactionOccas,
        deleteAllTransactionsByCategory,
        updateTransaction,
        addSubTransaction
    } = useTransacOccasStore();

    // STATE
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [currentModal, setCurrentModal] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [transactionId, setTransactionId] = useState(0);
    const [dataChart, setDataChart] = useState(null);

    // RECUP CATEGORIES - OCCASIONNELLE
    useEffect(() => {
        fetchOccas();

    }, []);

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






    // MODAL AJOUTER SUB-TRANSACTION
    const modalAddSubTransaction = async (e) => {
        console.log("📡 Tentative d'ajout d'une sous-transaction...");
        setCurrentModal("modalAddSubTransaction");
        setTransactionId(Number(e.currentTarget.id))

    }
    // HANDLER AJOUTER SUB TRANSACTION
    const handleAddSubTransaction = async (data) => {
// 🔹 Données de test en dur
/*        const data = {
            transactionId: transactionId,  // 🆔 Remplace par un ID valide de transaction
            amount: 25,     // 💰 Montant de la sous-transaction
            date: "2024-02-01" // 📅 Date de la sous-transaction
        };*/
        console.log(transactionId, data)
        await addSubTransaction(transactionId, data);
    }






    // MODAL GRAPHIQUE
    const modalChart = (e) => {
        setCurrentModal("modalChart");
        const cat = categories.find((c) => c.id === Number(e.currentTarget.id));
        setDataChart(cat);
    };
    // MODAL FERMETURE
    const closeModal = () => {
        setCurrentModal(null);
    };

    // HANDLER AJOUTER
    const handleAddTransaction = async (data) => {
        await addTransactionOccas(categoryId, data);
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


    if (loading) return <p>Chargement...</p>;
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
                                    <FontAwesomeIcon icon={iconMap[card.id]} className="mr-3" style={{ color: "#74C0FC" }} />
                                )}
                                {card.name}
                            </h5>
                            <div className="px-0 py-0 flex gap-4">
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Filtre"
                                    id={card.id}

                                >
                                    <FontAwesomeIcon icon={faFilter}/>
                                </button>

                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Graphique"
                                    id={card.id}
                                    /*onClick={modalChart}*/
                                >
                                    <FontAwesomeIcon icon={faTable}/>
                                </button>
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Graphique"
                                    id={card.id}
                                    onClick={modalChart}
                                >
                                    <FontAwesomeIcon icon={faChartBar}/>
                                </button>
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                    title="Ajouter un élément"
                                    id={card.id}
                                    onClick={modalAddTransaction}
                                >
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                </button>
                                <button
                                    className="text-gray-500 hover:text-blue-500 dark:hover:text-red-400"
                                    title="Filtre"
                                    id={card.id}
                                    onClick={modalDeleteAllTransactionByCategory}
                                >
                                    <FontAwesomeIcon icon={faEraser}/>
                                </button>
                            </div>
                        </div>
                        {/* Transactions */}
                        <div className="relative w-full h-64 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                {card.transactions?.length > 0 ? (
                                    card.transactions.map((transaction, i) => {
                                        // 📌 Calculer le total des sous-transactions
                                        const totalSubTransactions = transaction.subTransactions?.reduce((sum, sub) => sum + sub.amount, 0) || 0;
                                        const totalTransaction = transaction.amount + totalSubTransactions;

                                        return (
                                            <React.Fragment key={transaction.id}>
                                                {/* 📌 Transaction principale avec total */}
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 relative">
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {transaction.name}
                                                    </td>
                                                    <td className="px-4 py-2">{totalTransaction} €</td>
                                                    <td className="px-4 py-2 relative">
                                                        <button
                                                            onClick={() => toggleDropdown(`${card.id}-${i}`)}
                                                            className="dropdown text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                                        >
                                                            <FontAwesomeIcon icon={faEllipsis} />
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
                                                {/*<tr className="bg-gray-100 dark:bg-gray-900">
                                                    <td colSpan="3">
                                                        <div className="ml-6">
                                                            <p className="text-gray-700 dark:text-gray-300 font-semibold">Sous-transactions :</p>
                                                            {Array.isArray(transaction.subTransactions) && transaction.subTransactions.length > 0 ? (
                                                                <ul className="list-disc ml-4">
                                                                    {transaction.subTransactions.map((sub) => (
                                                                        <li key={sub.id} className="text-sm text-gray-700 dark:text-gray-300">
                                                                            {sub.date} - {sub.amount} €
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-sm text-gray-500 italic">Pas de sous-transactions</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>*/}
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
                                    {calculateTotal(card.transactions)} €
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Mois</div>
                            </div>
                            <div className="flex-1 text-center border-r border-gray-300 dark:border-gray-600">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {calculateTotal(card.transactions) * 3} €
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Trimestre</div>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {calculateTotal(card.transactions) * 12} €
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
                <ModalChart closeModal={closeModal} dataChart={dataChart} />
            )}
        </>
    );
};



export default CardOccasionnelle;