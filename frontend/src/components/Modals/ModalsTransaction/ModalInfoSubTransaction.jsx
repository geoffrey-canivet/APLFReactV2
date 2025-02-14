import React from 'react';

const ModalInfoSubTransaction = ({ closeModal, subCatId }) => {
    if (!subCatId) {
        return (
            <div className="p-4 bg-gray-800 text-white">
                <p>Chargement de la sous-transaction...</p>
            </div>
        );
    }
    return (
        <div className="p-4 bg-gray-800 text-white">
            <h2 className="text-lg font-bold mb-2">Détails de la sous-transaction</h2>
            <p>Informations complémentaires ici...</p>
            <div className="mt-4 flex gap-2">
                <button
                    onClick={closeModal}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default ModalInfoSubTransaction;
