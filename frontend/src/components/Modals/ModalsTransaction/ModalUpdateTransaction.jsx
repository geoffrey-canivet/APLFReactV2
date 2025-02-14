import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import MySwal from "sweetalert2";

const ModalUpdateTransaction = ({ closeModal, handleUpdateTransaction, transaction }) => {
    const [name, setName] = useState(transaction?.name || "");
    const [amount, setAmount] = useState(transaction?.amount || "");

    useEffect(() => {
        setName(transaction?.name || "");
        setAmount(transaction?.amount || "");
    }, [transaction]);

    useEffect(() => {
        MySwal.fire({
            title: "Modifier",
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
            <form id="updateForm" class="max-w-sm mx-auto">
                <div class="grid grid-cols-1 gap-2 max-w-md mx-auto mt-3">
                    <!-- Nom -->
                    <div class="relative">
                        <div class="absolute pr-3 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="text-gray-800 dark:text-white" aria-hidden="true" width="20" height="20" fill="#9CA3AF" viewBox="0 0 24 24">
                                <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                            </svg>
                        </div>
                        <input type="text" id="inputNom" value="${name}" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:bg-gray-800 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom">
                    </div>
                    <!-- Prix -->
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
                            <svg className="w-[24px] h-[24px] text-white dark:text-white" aria-hidden="true" width="20" height="20" fill="#9CA3AF" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clip-rule="evenodd"/>
                                <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
                            </svg>
                        </div>
                        <input type="number" id="inputPrix" value="${amount}" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prix">
                    </div>
                </div>
            </form>
            `,
            showCancelButton: true,
            confirmButtonText: "Modifier",
            cancelButtonText: "Annuler",
            didOpen: () => {
                document.getElementById("inputNom").value = name;
                document.getElementById("inputPrix").value = amount;

                const backdrop = document.querySelector(".swal2-backdrop-show");
                if (backdrop) {
                    backdrop.style.backdropFilter = "blur(5px)";
                    backdrop.style.backgroundColor = "rgba(4,19,35,0.7)";
                }
            },
            preConfirm: () => {
                const updatedName = document.getElementById("inputNom").value;
                const updatedAmount = document.getElementById("inputPrix").value;
                if (!updatedName || !updatedAmount) {
                    Swal.showValidationMessage("Veuillez remplir tous les champs.");
                    return null;
                }
                return { name: updatedName, amount: updatedAmount };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdateTransaction(result.value);
                Swal.fire({
                    icon: "success",
                    title: "Mise à jour réussie",
                    text: `${result.value.name} mis à jour avec succès.`,
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
            closeModal();
        });
    }, [transaction, closeModal, handleUpdateTransaction]);

    return null;
};

export default ModalUpdateTransaction;
