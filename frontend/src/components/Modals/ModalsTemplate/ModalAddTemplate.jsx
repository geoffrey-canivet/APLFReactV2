import Swal from "sweetalert2";
import MySwal from "sweetalert2";
import { useEffect } from "react";

const ModalAddTemplate = ({ closeModal, handleAddTransactionToTemplate }) => {
    // Configure Toast
    const ToastNotification = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#1F2937",
        color: "#FFFFFF",
        customClass: {
            popup: "rounded-lg shadow-lg",
        },
    });

    useEffect(() => {
        MySwal.fire({
            title: "Ajouter une transaction",
            padding: 0,
            customClass: {
                popup: "custom-popup",
                title: "custom-header",
                htmlContainer: "custom-body",
                actions: "custom-footer",
                confirmButton: "small-confirm-button",
                cancelButton: "small-cancel-button",
            },
            html: `
            <form class="max-w-sm mx-auto">
                <div class="grid grid-cols-1 gap-2 max-w-md mx-auto mt-3">
                    <!-- Nom de la transaction -->
                    <div class="relative">
                        <input type="text" id="inputTransactionName" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom de la transaction">
                    </div>
                    <!-- Montant -->
                    <div class="relative">
                        <input type="number" id="inputTransactionAmount" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Montant">
                    </div>
                </div>
            </form>
            `,
            showCancelButton: true,
            confirmButtonText: "Ajouter",
            cancelButtonText: "Annuler",
            preConfirm: () => {
                const name = document.getElementById("inputTransactionName").value;
                const amount = document.getElementById("inputTransactionAmount").value;
                if (!name || !amount) {
                    Swal.showValidationMessage("Veuillez remplir tous les champs.");
                    return null;
                }
                return { name, amount: parseFloat(amount) };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleAddTransactionToTemplate(result.value);
                ToastNotification.fire({
                    icon: "success",
                    title: `${result.value.name} ajouté avec succès.`,
                });
            }
            closeModal();
        });
    }, [ToastNotification, closeModal, handleAddTransactionToTemplate]);

    return null;
};

export default ModalAddTemplate;
