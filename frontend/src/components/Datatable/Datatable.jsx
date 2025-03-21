import DataTable from "react-data-table-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faImage, faPaperclip, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import useTransacOccasStore from "../../store/useTransacOccasStore.js";
import React, {useEffect, useState} from "react";
import ModalUpdateSubTransaction from "../Modals/ModalsTransaction/ModalUpdateSubTransaction.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Datatable = ({dataDatatable}) => {
    console.log("datatable -> ", dataDatatable.transactions);

    // STORE
    const {updateSubTransaction, updateTransactionAmount, deleteSubTransaction, fetchSubTransactionById} = useTransacOccasStore();

    const data = useTransacOccasStore(state => state.categories).find(cat => cat.id === dataDatatable.id)?.transactions || [];

    const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false);
    const [tiroirUpdateSubTransactionIsOpen, setTiroirUpdateSubTransactionIsOpen] = useState(false);
    const [subCatId, setSubCatId] = useState(0);
    const [fetchedSubTransaction, setFetchedSubTransaction] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (modalInfoIsOpen && subCatId) {
            fetchSubTransactionById(subCatId)
                .then((data) => setFetchedSubTransaction(data))
                .catch((error) => console.error("Erreur lors de la récupération :", error));
        } else {
            setFetchedSubTransaction(null);
        }
    }, [modalInfoIsOpen, subCatId, fetchSubTransactionById]);


    // total des sous-transactions d'une transaction
    const getTotalSubTransactions = (row) =>
        row.subTransactions.reduce((sum, sub) => sum + sub.amount, 0);

    // total général des transactions
    const totalGeneral = data.reduce((sum, row) => sum + getTotalSubTransactions(row), 0);

    // pourcentage d'une transaction par rapport au total général
    const getTransactionPercentage = (row) => {
        const transactionTotal = getTotalSubTransactions(row);
        return totalGeneral > 0 ? ((transactionTotal / totalGeneral) * 100).toFixed(2) : 0;
    };

    // modal
    const tiroirUpdateSubTransaction = (id) => {
        setSubCatId(id);
        setTiroirUpdateSubTransactionIsOpen(true);
    };

    const modalInfoSubTransaction = (id) => {
        setSubCatId(id);
        setModalInfoIsOpen(true);
    };

    const handleUpdateSubTransaction = async (e) => {
        e.preventDefault(); // Empêche le rechargement du formulaire
        const inputElement = document.getElementById("inputAmount");
        if (!inputElement) {
            console.error("Champ 'inputAmount' introuvable.");
            return;
        }
        const amountStr = inputElement.value;
        const newAmount = parseFloat(amountStr);

        console.log("Nouveau montant :", newAmount);

        if (isNaN(newAmount)) {
            alert("Veuillez saisir un montant valide.");
            return;
        }
        try {
            // Appeler la fonction du store pour mettre à jour la sous-transaction
            await updateSubTransaction(subCatId, newAmount);
            alert("Montant mis à jour avec succès.");
            setTiroirUpdateSubTransactionIsOpen(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du montant :", error);
            alert("Une erreur est survenue lors de la mise à jour du montant.");
        }
    };




    // couleur aléatoire
    const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Recherche du sous-transaction dans toutes les transactions
    const foundSubTransaction = data.reduce((acc, transaction) => {
        const sub = transaction.subTransactions.find((sub) => sub.id === subCatId);
        console.log(sub)
        return sub ? sub : acc;
    }, null);

    console.log(foundSubTransaction);

    const columns = [
        {
            name: "", cell: (row) => (
                <span
                    className="px-1.5 py-1.5 rounded-full"
                    style={{
                        backgroundColor: generateRandomColor(),
                    }}
                ></span>
            ),
            sortable: true,
            $grow: 0
        },
        {name: "Nb", selector: (row) => row.subTransactions.length, sortable: true, $grow: 0},
        {name: "Nom", selector: (row) => row.name, sortable: true, $grow: 1},
        {name: "Total", selector: (row) => `${getTotalSubTransactions(row).toFixed(2)} €`, sortable: true, $grow: 0},
/*        {
            name: "Commerce", cell: (row) => (
                <span
                    className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Carrefour</span>
            ),
            sortable: true,
            $grow: 1
        },*/
        {
            name: "Progression", cell: (row) => {
                const pourcentage = getTransactionPercentage(row);
                return (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                            className="h-2.5 rounded-full"
                            style={{
                                width: `${pourcentage}%`,
                                backgroundColor: generateRandomColor(),
                                transition: "width 0.5s ease-in-out"
                            }}

                        ></div>
                    </div>
                )

            },
            sortable: true,
            $grow: 1
        },
        {
            name: "Pourcentage",
            selector: (row) => `${getTransactionPercentage(row)} %`,
            sortable: true,
            grow: 1,
        },
        {name: "Dernier achat", selector: (row) => "14/01/2024", $grow: 0},
    ];

    const columnDetail = [

        {name: "Date", selector: (row) => row.date, sortable: true, $grow: 0},
        {
            name: "Prix",
            cell: (row) => `${row.amount} €`,
            sortable: true,
            $grow: 0
        },
        {
            name: "Commerce", cell: (row) => (
                <span
                    className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{row.commerce}</span>
            ),
            sortable: true,
            $grow: 1
        },
        {
            name: "Actions", cell: (row) => (
                <div className="px-0 py-0 flex gap-4">
                    <button
                        className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400" title="Modifier"
                        onClick={() => tiroirUpdateSubTransaction(row.id)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </button>
                    <button
                        onClick={() => modalInfoSubTransaction(row.id)}
                        className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
                        title="Détails"
                    >
                        <FontAwesomeIcon icon={faCircleInfo}/>
                    </button>
                    <button
                        className="text-gray-700 hover:text-blue-500 dark:hover:text-red-400"
                        title="Supprimer"
                        onClick={() => deleteSubTransaction(row.id)}
                    >
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </button>
                    {/*<button className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400" title="Graphique"
                    >
                        <FontAwesomeIcon icon={faPaperclip}/>
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
                            title="Ajouter un élément"
                    >
                        <FontAwesomeIcon icon={faImage}/>
                    </button>*/}

                </div>
            ),
            sortable: true,
            $grow: 1
        },
    ]

    const ExpandedComponent = ({data}) => (


        <DataTable
            columns={columnDetail}
            data={data.subTransactions}
            dense
            customStyles={{
                table: {
                    style: {
                        borderSpacing: "0",
                        margin: "0",
                        backgroundColor: "transparent",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        "&:last-child": {
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                        },
                    },
                },
                headRow: {
                    style: {
                        borderBottom: "none",
                        borderTopLeftRadius: "0px",
                        borderTopRightRadius: "0px",
                        overflow: "hidden",
                        backgroundColor: "transparent",
                    },
                },
                rows: {
                    style: {

                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        "&:last-child": {
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                        },
                        minHeight: "72px",
                        transition: "background-color 0.3s ease",
                        backgroundColor: "#55657c",
                        '&:hover': {
                            backgroundColor: "#7c92b3",
                        },
                        svg: {
                            fill: "#fff",
                        },
                    },
                },
                headCells: {
                    style: {
                        backgroundColor: "#374151",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                        borderBottom: "none",

                    },
                },
                cells: {
                    style: {
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "17px",
                        color: "#2b3845",
                        fontSize: "14px",
                        fontWeight: "bolder",
                    },
                },
            }}
        />


    );

    return (
        <>

            <DataTable
                columns={columns}
                data={data}
                expandableRows
                noDataComponent={
                    <div className="text-gray-400 text-center p-4 bg-gray-900 rounded-md">
                        <p>Aucune transaction trouvée.</p>
                    </div>
                }
                expandOnRowClicked
                fixedHeader
                fixedHeaderScrollHeight="700px"
                expandableRowsHideExpander

                paginationComponentOptions={{
                    rowsPerPageText: "Lignes par page :",
                    rangeSeparatorText: "de",
                    noRowsPerPage: false,
                    selectAllRowsItem: true,
                    selectAllRowsItemText: "Toutes",
                }}
                responsive
                dense
                expandableRowsComponent={ExpandedComponent}
                customStyles={{
                    table: {
                        style: {
                            borderSpacing: "0",
                            margin: "0",
                            backgroundColor: "transparent",
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                            "&:last-child": {
                                borderBottomLeftRadius: "0px",
                                borderBottomRightRadius: "0px",
                            },
                        },
                    },
                    headRow: {
                        style: {
                            borderBottom: "none",
                            borderTopLeftRadius: "0px",
                            borderTopRightRadius: "0px",
                            overflow: "hidden",
                            backgroundColor: "transparent",
                        },
                    },
                    rows: {
                        style: {

                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                            "&:last-child": {
                                borderBottomLeftRadius: "0px",
                                borderBottomRightRadius: "0px",
                            },
                            minHeight: "72px",
                            transition: "background-color 0.3s ease",
                            backgroundColor: "#1F2937",
                            '&:hover': {
                                backgroundColor: "#374151",
                            },
                            svg: {
                                fill: "#fff",
                            },
                        },
                    },
                    headCells: {
                        style: {
                            backgroundColor: "#374151",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "16px",
                            borderBottom: "none",


                        },
                    },
                    cells: {
                        style: {
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            paddingLeft: "17px",
                            color: "#fff",
                            fontSize: "14px",
                        },
                    },
                    expanderCell: {
                        style: {
                            backgroundColor: "#d2195a",
                        },
                    },
                    expanderButton: {
                        style: {
                            backgroundColor: "inherit",
                            svg: {
                                fill: "#fff",
                            },
                        },
                    },
                    pagination: {
                        style: {
                            backgroundColor: "#374151",
                            color: "#fff",
                            borderTop: "0px solid #374151",
                            borderBottomLeftRadius: "8px",
                            borderBottomRightRadius: "8px",
                        },
                        pageButtonsStyle: {
                            backgroundColor: "#374151",
                            color: "#fff",
                            fontSize: "5px",
                            paddingLeft: "7px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                            margin: "4px",
                            '&:hover': {
                                backgroundColor: "#4B5563",
                            },
                            '&:focus': {
                                outline: "none",
                                backgroundColor: "#6B7280",
                            },
                            svg: {
                                fill: "#fff",
                                width: "16px",
                                height: "16px",
                            },
                        },
                    },
                }}
            />



            {/* MODAL pour afficher les détails et l'image */}
            <AnimatePresence>
                {modalInfoIsOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                        onClick={() => setModalInfoIsOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                        >
                            <h2 className="text-lg font-bold mb-2">Détails de la sous-transaction</h2>
                            {fetchedSubTransaction ? (
                                <>
                                    <p>{fetchedSubTransaction.date}</p>
                                    <p>{fetchedSubTransaction.amount} €</p>
                                    <p>{fetchedSubTransaction.commerce}</p>

                                    {/* IMAGE CLIQUABLE */}
                                    {fetchedSubTransaction.photo && (
                                        <img
                                            src={fetchedSubTransaction.photo}
                                            alt="Détails de la sous-transaction"
                                            className="max-w-32 cursor-pointer m-auto mt-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                                            onClick={() => setSelectedImage(fetchedSubTransaction.photo)}
                                        />
                                    )}
                                </>
                            ) : (
                                <p>Chargement...</p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* MODAL POUR AFFICHER L'IMAGE EN GRAND */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                        onClick={() => setSelectedImage(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.img
                            src={selectedImage}
                            alt="Image agrandie"
                            className="max-w-3/4 max-h-3/4 rounded-lg shadow-lg"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODAL pour modifier sous transaction */}
            {tiroirUpdateSubTransactionIsOpen && (
                <div
                    className="p-4 bg-gray-800 text-white fixed inset-0 flex flex-col items-center justify-center z-50">
                    <h2 className="text-lg font-bold mb-2">Modifier la sous-transaction</h2>

                    <form className="max-w-sm mx-auto" onSubmit={(e) => handleUpdateSubTransaction(e)}>
                        <div className="grid grid-cols-1 gap-2 max-w-md mx-auto mt-3">
                            <div className="relative">
                                <input
                                    type="number"
                                    id="inputAmount"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Montant"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button type="submit" className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">
                                Modifier
                            </button>
                            <button
                                type="button"
                                onClick={() => setTiroirUpdateSubTransactionIsOpen(false)}
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>


                </div>
            )}
        </>
    );
};

export default Datatable;







