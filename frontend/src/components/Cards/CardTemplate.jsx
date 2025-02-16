import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardList, faSave, faEllipsis, faTrash, faPlusCircle, faEraser, faPenToSquare
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

const CardTemplate = () => {
    // STORE
    const { templates, loading, error, addTransactionToTemplate, deleteTransactionFromTemplate, fetchUserTemplates, deleteTemplate } = useTemplateStore();

    // STATES
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [currentModal, setCurrentModal] = useState(null);
    const [templateId, setTemplateId] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTemplateType, setSelectedTemplateType] = useState("perso");

    // RECUPERER LES TEMPLATES
    useEffect(() => {
        fetchUserTemplates();
    }, []);

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
    // HANDLER AJOUTER UNE TRANSACTION AU TEMPLATE
    const handleAddTransactionToTemplate = async (transactionData) => {
        await addTransactionToTemplate(selectedCategory.id, transactionData);
        fetchUserTemplates();
        closeModal();
    };
    const modalDeleteTransactionTemplate = (transaction, templateId) => {
        setCurrentModal("modalDeleteTransactionTemplate");
        setSelectedTransaction({ transactionId: transaction.id, templateId });
    };
    const modalUseTemplate = (e) => {
        setCurrentModal("modalUseTemplate");
        setTemplateId(Number(e.currentTarget.id));
    };
    const closeModal = () => setCurrentModal(null);

    // HANDLER SUPPRIMER UN TEMPLATE
    const handleDeleteTransactionTemplate = async () => {
        if (selectedTransaction) {
            await deleteTransactionFromTemplate(selectedTransaction.transactionId, selectedTransaction.templateId);
            fetchUserTemplates();
        }
        closeModal();
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // Fusion des catégories avec leurs templates existants
    const mergedCategories = defaultCategories.map(category => {
        const template = templates.find(t => t.category?.id === category.id);
        return { ...category, template };
    });


    return (
        <>
            {openDropdownId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20"
                     onClick={() => setOpenDropdownId(null)}></div>
            )}


            <form className="max-w-sm ml-6">
                <div className="flex">
                    <select
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        id="template"
                        className="w-32 h-9 px-2 py-0 mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option defaultValue="">template perso</option>
                        <option value="">template par défaut</option>
                    </select>
                </div>

            </form>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center m-5">
                {mergedCategories.map(category => (
                    <div key={category.id}
                         className="w-full max-w-sm bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {/* Header */}
                        <div className="flex justify-between px-4 pt-2 pb-2 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                                <FontAwesomeIcon icon={faClipboardList} className="mr-3" style={{color: "#74C0FC"}}/>
                                {category.name}
                            </h5>
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
                                    /*onClick={modalUseTemplate}*/
                                >
                                    <FontAwesomeIcon icon={faEraser}/>
                                </button>

                            </div>
                        </div>

                        {/* Transactions du Template ou Message Vide */}
                        <div className="relative w-full h-64 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                {category.template?.transactions?.length > 0 ? (
                                    category.template.transactions.map(transaction => (

                                        <tr key={transaction.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {transaction.name}
                                            </td>
                                            <td className="px-4 py-2">{transaction.amount} €</td>
                                            <td>
                                                <button
                                                    className="text-gray-500 mr-4 hover:text-blue-500 dark:hover:text-blue-400"
                                                    title="Utiliser ce template"
                                                    id={transaction.id}

                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                                </button>
                                                <button
                                                    className="text-gray-500  hover:text-blue-500 dark:hover:text-blue-400"
                                                    title="Utiliser ce template"
                                                    id={transaction.id}
                                                    onClick={() => modalDeleteTransactionTemplate(transaction, category.template.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>

                                            </td>
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
                                <div className="text-xs text-gray-500 dark:text-gray-400">Nom du template: <span
                                    className="cursor-pointer underline">Nom</span></div>
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
            {/*{currentModal === "modalUseTemplate" && <ModalUseTemplate closeModal={closeModal} templateId={templateId} />}*/}
        </>
    );
};

export default CardTemplate;
