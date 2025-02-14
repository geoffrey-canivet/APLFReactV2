import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MySwal from "sweetalert2";

import usePeriodStore from "../../../store/usePeriodStore.js";
import flatpickr from "flatpickr";
import useTransacOccasStore from "../../../store/useTransacOccasStore.js";

const ModalUpdateSubTransaction = ({ closeModal, handleUpdateSubTransaction, subCatId }) => {
    // Store
    const { month, year } = usePeriodStore();
    const { fetchSubTransactionById } = useTransacOccasStore();


    const [subTransaction, setSubTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSubTransactionById(subCatId);
            setSubTransaction(data);
        };
        fetchData();
    }, [subCatId, fetchSubTransactionById]);

    useEffect(() => {

        if (!subTransaction || isModalOpen) return;
        setIsModalOpen(true);

        MySwal.fire({
            title: "Modifier sous-transaction",
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
                    <div class="relative">
                        <input type="text" id="inputDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:bg-gray-800 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date">
                    </div>
                    <div class="grid grid-cols-1 gap-2 max-w-md mx-auto mt-3">
                        <div class="relative">
                            <input type="text" id="inputAmount" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Montant">
                        </div>
                        <div class="relative">
                            <select id="inputCommerce" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                
                            </select>
                        </div>
                    </div>
                    <div class="relative my-2">
                        <textarea id="inputCommentaire" rows="3" class="block pt-2 pl-12 p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Commentaire ..."></textarea>
                    </div>
                </form>
            `,
            showCancelButton: true,
            confirmButtonText: "Modifier",
            cancelButtonText: "Annuler",
            didOpen: () => {
                setTimeout(() => {

                    document.getElementById("inputDate").value = subTransaction?.date || "";
                    document.getElementById("inputAmount").value = subTransaction?.amount || "";
                    document.getElementById("inputCommerce").value = subTransaction?.commerce || "Autre";
                    document.getElementById("inputCommentaire").value = subTransaction?.comments || "";


                    flatpickr(document.getElementById("inputDate"), {
                        dateFormat: "d/m/Y",
                        defaultDate: subTransaction?.date || new Date(year, month - 1, 1),
                    });
                }, 100);
            },
            preConfirm: () => {
                const date = document.getElementById("inputDate").value;
                const amount = document.getElementById("inputAmount").value;
                const commerce = document.getElementById("inputCommerce").value;
                const comment = document.getElementById("inputCommentaire").value;
                return { amount, commerce, comment, date };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdateSubTransaction(result.value);
                Swal.fire({
                    icon: "success",
                    title: "Sous-transaction mise à jour !",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    background: "#1F2937",
                    color: "#FFFFFF",
                });
            }
            closeModal();
        });
    }, [subTransaction, isModalOpen, handleUpdateSubTransaction, closeModal]);

    return null;
};

export default ModalUpdateSubTransaction;
