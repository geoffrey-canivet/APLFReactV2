import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import MySwal from "sweetalert2";

const ModalUpdateTransaction = ({ closeModal, handleUpdateTransaction, transaction }) => {
    const [name, setName] = useState(transaction?.name || "");
    const [amount, setAmount] = useState(transaction?.amount || "0");

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
        setName(transaction?.name || "");
        setAmount(transaction?.amount || "");
    }, [transaction]);

    useEffect(() => {
        MySwal.fire({
            title: "Modifier une transaction",
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
                </div>
            </form>
            <style>
				    .custom-backdrop {
				        background-color: rgba(0, 0, 0, 100)!important;
				    }
                    .custom-popup {
                        max-width: 450px;
                        border: 2px solid #4a5568;
                        background-color: #1F2937;
                        border-radius: 12px;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    }
                    .custom-header {
                          padding-left: 0 ;
                          padding-right: 0 ;
                          padding-top: 15px;
                          padding-bottom: 0;
                          margin: 0 !important;
                          background-color: #1F2937;
                          color: #63b3ed;
                          font-size: 1.25rem;
                          border-top-left-radius: 12px;
                          border-top-right-radius: 12px;
                    }
                    .custom-body {
                            padding: 0 !important;
                          margin: 0 !important;
                          background-color: #1F2937;
                    }
                    .custom-footer {
                          padding-left: 0 ;
                          padding-right: 0 ;
                          padding-top: 0;
                          padding-bottom: 20px;
                          margin: 0 !important;
                          background-color: #1F2937;
                          border-bottom-left-radius: 12px;
                          border-bottom-right-radius: 12px;
                    }
                    .small-confirm-button {
                          font-size: 12px !important;
                          padding: 10px 24px !important;
                          border-radius: 4px !important;
                          background-color: #374151;
                    }
                    .small-cancel-button {
                          font-size: 12px !important;
                          padding: 10px 24px !important;
                          border-radius: 4px !important;
                          background-color: #374151;
                    }
				
				</style>
            `,
            showCancelButton: true,
            confirmButtonText: "Modifier",
            cancelButtonText: "Annuler",
            didOpen: () => {
                document.getElementById("inputNom").value = name;

                const backdrop = document.querySelector(".swal2-backdrop-show");
                if (backdrop) {
                    backdrop.style.backdropFilter = "blur(5px)";
                    backdrop.style.backgroundColor = "rgba(4,19,35,0.7)";
                }
            },
            preConfirm: () => {
                const updatedName = document.getElementById("inputNom").value;
                if (!updatedName) {
                    Swal.showValidationMessage("Veuillez remplir tous les champs.");
                    return null;
                }
                return { name: updatedName};
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdateTransaction(result.value);
                ToastNotification.fire({
                    icon: "success",
                    title: `Transaction modifiée avec succès.`,
                });
            }
            closeModal();
        });
    }, [transaction, closeModal, handleUpdateTransaction]);

    return null;
};

export default ModalUpdateTransaction;
