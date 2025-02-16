import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardList,
    faPlusCircle,
    faEraser,
    faPenToSquare,
    faTrash,
    faFilter,
    faEllipsisVertical,
    faChartColumn,
    faChartBar,
    faTicket,
    faUmbrella,
    faCreditCard,
    faHouse,
    faChartPie,
    faSave,
    faAppleWhole,
    faPlane,
    faGift,
    faThumbtack, faSackDollar, faMoneyBill, faMoneyBillWave
} from "@fortawesome/free-solid-svg-icons";
import useTemplateStore from "../../store/useTemplateStore.js";
import ModalAddTemplate from "../Modals/ModalsTemplate/ModalAddTemplate.jsx";
import ModalDeleteTransactionTemplate from "../Modals/ModalsTemplate/ModalDeleteTransactionTemplate.jsx";

// Catégories par défaut
const defaultCategories = [
    "Charges", "Crédits", "Assurances", "Abonnements",
    "Dépenses Courantes", "Loisirs", "Dépenses Occasionnelles", "Dépenses Diverses",
    "Revenu Actif", "Revenu Passif", "Revenu Exceptionnel", "Revenu Divers",
].map((name, index) => ({
    id: index + 1,
    name
}));

// ICONES ASSOCIÉES AUX CATÉGORIES DE TEMPLATES
const iconTemplateMap = {
    "Charges": faHouse,
    "Crédits": faCreditCard,
    "Assurances": faUmbrella,
    "Abonnements": faTicket,
    "Dépenses Courantes": faAppleWhole,
    "Loisirs": faPlane,
    "Dépenses Occasionnelles": faGift,
    "Dépenses Diverses": faThumbtack,
    "Revenu Actif": faSackDollar,
    "Revenu Passif": faMoneyBill,
    "Revenu Exceptionnel": faMoneyBillWave,
    "Revenu Divers": faThumbtack,
};


const CardTemplate = () => {
    // STORE
    const {
        templates,
        defaultTemplates,
        loading,
        error,
        fetchUserTemplates,
        fetchDefaultTemplates,
        setSelectedTemplateType,
        selectedTemplateType,
        addTransactionToTemplate,
        deleteTransactionFromTemplate
    } = useTemplateStore();

    // STATES
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [currentModal, setCurrentModal] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // RECUPERER LES TEMPLATES AU CHARGEMENT
    useEffect(() => {
        if (selectedTemplateType === "perso") {
            fetchUserTemplates();
        } else {
            fetchDefaultTemplates();
        }
    }, [selectedTemplateType]);

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
    const modalAddTransactionTemplate = (category) => {
        setCurrentModal("modalAddTransactionTemplate");
        setSelectedCategory(category);
    };

    const modalDeleteTransactionTemplate = (transaction, templateId) => {
        setCurrentModal("modalDeleteTransactionTemplate");
        setSelectedTransaction({ transactionId: transaction.id, templateId });
    };
    // HANDLER AJOUTER UNE TRANSACTION AU TEMPLATE
    const handleAddTransactionToTemplate = async (transactionData) => {
        if (selectedTemplateType !== "perso") return; // 🔥 Sécurisation : Ne fonctionne que pour les templates perso

        try {
            const response = await addTransactionToTemplate(selectedCategory.id, transactionData);

            // 🔥 Vérifie que la transaction a bien été ajoutée
            if (!response || !response.transaction) {
                throw new Error("La transaction n'a pas été correctement ajoutée.");
            }

            // 🔥 Met à jour uniquement le template concerné dans le store Zustand
            useTemplateStore.setState((state) => ({
                templates: state.templates.map(template =>
                    template.categoryId === selectedCategory.id
                        ? { ...template, transactions: [...template.transactions, response.transaction] }
                        : template
                )
            }));

            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout d'une transaction au template :", error);
        }
    };

    // HANDLER SUPPRIMER UNE TRANSACTION D'UN TEMPLATE PERSO
    const handleDeleteTransactionTemplate = async (transactionId, templateId) => {
        if (selectedTemplateType !== "perso") return; // 🔥 Sécurisation : Ne supprime que les transactions perso

        try {
            await deleteTransactionFromTemplate(transactionId, templateId);

            // 🔥 Met à jour immédiatement l'état local pour retirer la transaction supprimée
            useTemplateStore.setState((state) => ({
                templates: state.templates.map(template =>
                    template.id === templateId
                        ? {
                            ...template,
                            transactions: template.transactions.filter(t => t.id !== transactionId)
                        }
                        : template
                )
            }));

            // 🔥 Recharge les templates depuis l'API pour être sûr que l'état est bien à jour
            await fetchUserTemplates();

        } catch (error) {
            console.error("Erreur suppression transaction template :", error);
        }
    };



    const closeModal = () => setCurrentModal(null);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // 🔥 Sélectionner les bonnes données en fonction du type de template
    const activeTemplates = selectedTemplateType === "perso" ? templates : defaultTemplates;

    // 🔥 Fusionner les catégories avec leurs templates existants
    const mergedCategories = defaultCategories.map(category => {
        const template = activeTemplates.find(t => t.category?.id === category.id);
        return { ...category, template };
    });

    return (
        <>
            {openDropdownId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20"
                     onClick={() => setOpenDropdownId(null)}></div>
            )}

            {/* 🔥 Sélecteur pour choisir les templates perso ou par défaut */}
            <form className="max-w-sm ml-6">
                <div className="flex">
                    <select
                        value={selectedTemplateType} // ✅ Maintient la valeur sélectionnée
                        onChange={(e) => setSelectedTemplateType(e.target.value)} // ✅ Recharge les bons templates
                        id="template"
                        className=" h-9 px-2 py-0 mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="perso"> 🔵 Templates Perso</option>
                        <option value="default"> 🟠 Templates Par Défaut</option>
                    </select>
                </div>
            </form>

            {/* 🔥 Affichage des templates en fonction de la sélection */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center m-5">
                {mergedCategories.map(category => (
                    <div key={category.id}
                         className="w-full max-w-sm bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {/* Header */}
                        <div className="flex justify-between px-4 pt-2 pb-2 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                            <div className="flex">
                                <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    <FontAwesomeIcon
                                        icon={iconTemplateMap[category.name] || faClipboardList} // 🔥 Utilise l'icône associée, sinon une icône par défaut
                                        className="mr-3"
                                        style={{color: "#74C0FC"}}
                                    />
                                    {category.name}
                                </h5>
                                {selectedTemplateType === "perso" ? (
                                    <span
                                        className="flex font-bold items-center justify-center ml-3 w-4 h-4 text-xs text-gray-800 bg-gray-100 rounded-full dark:bg-blue-500 dark:text-gray-700">
        t
    </span>
                                ) : (
                                    <span
                                        className="flex font-bold items-center justify-center ml-3 w-4 h-4 text-xs text-gray-800 bg-gray-100 rounded-full dark:bg-orange-500 dark:text-gray-700">
        t
    </span>
                                )}


                            </div>

                            {selectedTemplateType === "perso" && (
                                <div className="px-0 py-0 flex gap-4">
                                    <button
                                        className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                        title="Ajouter une transaction"
                                        id={category.id}
                                        onClick={() => modalAddTransactionTemplate(category)}
                                    >
                                        <FontAwesomeIcon icon={faPlusCircle}/>
                                    </button>
                                    <button
                                        className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                                        title="Supprimer toutes les transactions"
                                        id={category.id}
                                    >
                                        <FontAwesomeIcon icon={faEraser}/>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Transactions */}
                        <div className="relative w-full h-64 overflow-y-hidden hover:overflow-y-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                {category.template?.transactions?.length > 0 ? (
                                    category.template.transactions.map(transaction => (
                                        <tr key={transaction.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {transaction.name}
                                            </td>
                                            <td className="px-4 py-2">{transaction.amount} €</td>
                                            {selectedTemplateType === "perso" && (
                                                <td>
                                                    <button
                                                        className="text-gray-500 mr-4 hover:text-blue-500 dark:hover:text-blue-400"
                                                        title="Modifier ce template"
                                                        id={transaction.id}
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare}/>
                                                    </button>
                                                    <button
                                                        className="text-gray-500  hover:text-blue-500 dark:hover:text-blue-400"
                                                        title="Supprimer ce template"
                                                        id={transaction.id}
                                                        onClick={() => handleDeleteTransactionTemplate(transaction.id, template.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center py-4 text-gray-500">
                                            Aucun template enregistré
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                            <div className="flex-1 text-center ">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Template: <span className="cursor-pointer underline">
                                        {selectedTemplateType === "perso" ? "Perso" : "Par défaut"}
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>
                ))}
            </div>

            {/* Modals */}
            {currentModal === "modalAddTransactionTemplate" && (
                <ModalAddTemplate handleAddTransactionToTemplate={handleAddTransactionToTemplate}
                                  closeModal={closeModal}/>
            )}

            {currentModal === "modalDeleteTransactionTemplate" &&
                <ModalDeleteTransactionTemplate closeModal={closeModal}
                                                handleDeleteTransactionTemplate={handleDeleteTransactionTemplate}/>}

        </>
    );
};

export default CardTemplate;
