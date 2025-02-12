import DataTable from "react-data-table-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faImage, faPaperclip, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import useTransacOccasStore from "../../store/useTransacOccasStore.js";
import ModalDatatable from "../Modals/ModalDatatable.jsx";
import React, {useState} from "react";
import ModalUpdateSubTransaction from "../Modals/ModalsTransaction/ModalUpdateSubTransaction.jsx";

const Datatable = ({dataDatatable}) => {
    console.log("datatable -> ", dataDatatable.transactions);

    // STORE
    const { updateSubTransaction, deleteSubTransaction } = useTransacOccasStore();
    const data = dataDatatable.transactions;

    const [modalUpdateSubTransactionIsOpen, setModalUpdateSubTransactionIsOpen] =
        useState(false);
    const [subCatId, setSubCatId] = useState(0);

    // 🔹 Fonction pour obtenir le total des sous-transactions d'une transaction
    const getTotalSubTransactions = (row) =>
        row.subTransactions.reduce((sum, sub) => sum + sub.amount, 0);

    // 🔹 Calculer le total général des transactions
    const totalGeneral = data.reduce((sum, row) => sum + getTotalSubTransactions(row), 0);

    // 🔹 Calculer le pourcentage d'une transaction par rapport au total général
    const getTransactionPercentage = (row) => {
        const transactionTotal = getTotalSubTransactions(row);
        return totalGeneral > 0 ? ((transactionTotal / totalGeneral) * 100).toFixed(2) : 0;
    };

    // 🔹 Fermer la modal
    const closeModal = () => setModalUpdateSubTransactionIsOpen(false);

    // 🔹 Ouvrir la modal
    const modalUpdateSubTransaction = (id) => {
        setSubCatId(id);
        setModalUpdateSubTransactionIsOpen(true);
    };

    const handleUpdateSubTransaction = (updateData) => {
        console.log("id: ",subCatId, "amount: ", updateData.amount, "commerce: ", updateData.commerce, "comment: ", updateData.myComment, "date: ", updateData.date);
        updateSubTransaction(subCatId, updateData.amount, updateData.date, updateData.commerce)
    }

    // 🔹 Générer une couleur aléatoire
    const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };



    const columns = [
        { name: "", cell: (row) => (
                <span
                    className="px-1.5 py-1.5 rounded-full"
                    style={{
                        backgroundColor: generateRandomColor(), // Couleur dynamique
                    }}
                ></span>
            ),
            sortable: true,
            $grow: 0
        },
        { name: "Nb", selector: (row) => row.subTransactions.length, sortable: true, $grow: 0 },
        { name: "Nom", selector: (row) => row.name, sortable: true, $grow: 1 },
        { name: "Total", selector: (row) => `${getTotalSubTransactions(row).toFixed(2)} €`, sortable: true, $grow: 0 },
        { name: "Commerce", cell: (row) => (
                <span
                    className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Carrefour</span>
            ),
            sortable: true,
            $grow: 1
        },
        {
            name: "Progression", cell: (row) => {
                const pourcentage = getTransactionPercentage(row);
                return (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                            className="h-2.5 rounded-full"
                            style={{
                                width: `${pourcentage}%`,
                                backgroundColor: generateRandomColor(), // Couleur dynamique
                                transition: "width 0.5s ease-in-out" // Animation fluide
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
        {name: "Date", selector: (row) => row.date, sortable: true, $grow: 0},
        {name: "Prix", selector: (row) => row.amount, sortable: true, $grow: 0 },
        { name: "Commerce", cell: (row) => (
                <span
                    className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{row.commerce}</span>
            ),
            sortable: true,
            $grow: 1
        },
        { name: "Actions", cell: (row) => (
                <div className="px-0 py-0 flex gap-4">
                    <button
                        className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400" title="Graphique"
                        onClick={() => modalUpdateSubTransaction(row.id)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </button>
                    <button
                        className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
                        title="Supprimer la sous-transaction"
                        onClick={() => deleteSubTransaction(row.id)}
                    >
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400" title="Graphique"
                    >
                        <FontAwesomeIcon icon={faPaperclip}/>
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
                            title="Ajouter un élément"
                    >
                        <FontAwesomeIcon icon={faImage}/>
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
                            title="Ajouter un élément"
                    >
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
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
                        borderSpacing: "0", // Supprime les espacements entre les cellules
                        margin: "0", // Supprime les marges du tableau
                        backgroundColor: "transparent",
                        borderBottomLeftRadius: "0px", // Pas d'arrondi sur la dernière ligne
                        borderBottomRightRadius: "0px", // Pas d'arrondi sur la dernière ligne
                        "&:last-child": {
                            borderBottomLeftRadius: "0px", // Forcé pour la dernière ligne
                            borderBottomRightRadius: "0px",
                        },
                    },
                },
                headRow: {
                    style: {
                        borderBottom: "none", // Supprime la bordure sous la ligne d'en-tête
                        borderTopLeftRadius: "0px", // Arrondi coin haut gauche
                        borderTopRightRadius: "0px", // Arrondi coin haut droit
                        overflow: "hidden", // Assure que l'arrondi est visible
                        backgroundColor: "transparent",
                    },
                },
                rows: {
                    style: {

                        borderBottomLeftRadius: "0px", // Pas d'arrondi sur la dernière ligne
                        borderBottomRightRadius: "0px", // Pas d'arrondi sur la dernière ligne
                        "&:last-child": {
                            borderBottomLeftRadius: "0px", // Forcé pour la dernière ligne
                            borderBottomRightRadius: "0px",
                        },
                        minHeight: "72px",
                        transition: "background-color 0.3s ease",
                        backgroundColor: "#55657c", // Fond vert par défaut
                        '&:hover': {
                            backgroundColor: "#7c92b3", // Fond rouge vif au survol
                        },
                        svg: {
                            fill: "#fff", // Couleur des chevrons
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
                expandOnRowClicked
                fixedHeader
                fixedHeaderScrollHeight="700px"
                expandableRowsHideExpander

                paginationComponentOptions={{
                    rowsPerPageText: "Lignes par page :", // Texte pour la sélection du nombre de lignes
                    rangeSeparatorText: "de", // Texte entre les numéros de page
                    noRowsPerPage: false, // Affiche ou cache le sélecteur du nombre de lignes
                    selectAllRowsItem: true, // Ajoute une option "Toutes les lignes"
                    selectAllRowsItemText: "Toutes", // Texte pour l'option "Toutes les lignes"
                }}
                responsive
                dense
                expandableRowsComponent={ExpandedComponent}
                customStyles={{
                    table: {
                        style: {
                            borderSpacing: "0", // Supprime les espacements entre les cellules
                            margin: "0", // Supprime les marges du tableau
                            backgroundColor: "transparent",
                            borderBottomLeftRadius: "0px", // Pas d'arrondi sur la dernière ligne
                            borderBottomRightRadius: "0px", // Pas d'arrondi sur la dernière ligne
                            "&:last-child": {
                                borderBottomLeftRadius: "0px", // Forcé pour la dernière ligne
                                borderBottomRightRadius: "0px",
                            },
                        },
                    },
                    headRow: {
                        style: {
                            borderBottom: "none", // Supprime la bordure sous la ligne d'en-tête
                            borderTopLeftRadius: "0px", // Arrondi coin haut gauche
                            borderTopRightRadius: "0px", // Arrondi coin haut droit
                            overflow: "hidden", // Assure que l'arrondi est visible
                            backgroundColor: "transparent",
                        },
                    },
                    rows: {
                        style: {

                            borderBottomLeftRadius: "0px", // Pas d'arrondi sur la dernière ligne
                            borderBottomRightRadius: "0px", // Pas d'arrondi sur la dernière ligne
                            "&:last-child": {
                                borderBottomLeftRadius: "0px", // Forcé pour la dernière ligne
                                borderBottomRightRadius: "0px",
                            },
                            minHeight: "72px",
                            transition: "background-color 0.3s ease",
                            backgroundColor: "#1F2937", // Fond vert par défaut
                            '&:hover': {
                                backgroundColor: "#374151", // Fond rouge vif au survol
                            },
                            svg: {
                                fill: "#fff", // Couleur des chevrons
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
                            backgroundColor: "#d2195a", // Fond bleu pour la colonne des chevrons
                        },
                    },
                    expanderButton: {
                        style: {
                            backgroundColor: "inherit", // Pas de fond spécifique pour le bouton
                            svg: {
                                fill: "#fff", // Icônes SVG en blanc pour cohérence
                            },
                        },
                    },
                    pagination: {
                        style: {
                            backgroundColor: "#374151",
                            color: "#fff", // Couleur du texte
                            borderTop: "0px solid #374151", // Bordure supérieure
                            borderBottomLeftRadius: "8px", // Forcé pour la dernière ligne
                            borderBottomRightRadius: "8px",
                        },
                        pageButtonsStyle: {
                            backgroundColor: "#374151", // Fond des boutons
                            color: "#fff", // Couleur du texte des boutons
                            fontSize: "5px",
                            paddingLeft: "7px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                            margin: "4px",
                            '&:hover': {
                                backgroundColor: "#4B5563", // Fond des boutons au survol
                            },
                            '&:focus': {
                                outline: "none",
                                backgroundColor: "#6B7280", // Fond des boutons actifs
                            },
                            svg: {
                                fill: "#fff", // Définit la couleur des icônes SVG (blanc)
                                width: "16px", // Largeur des SVGs
                                height: "16px", // Hauteur des SVGs
                            },
                        },
                    },
                }}
            />

            {/* MODAL Datatable */}
            {modalUpdateSubTransactionIsOpen === true && (
                <ModalUpdateSubTransaction closeModal={closeModal} subCatId={subCatId} handleUpdateSubTransaction={handleUpdateSubTransaction} />
            )}
        </>
    );
};

export default Datatable;







