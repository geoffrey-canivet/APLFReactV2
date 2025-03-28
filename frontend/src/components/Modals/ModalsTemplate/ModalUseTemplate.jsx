import React, {useEffect} from 'react';

import Swal from "sweetalert2";
import MySwal from "sweetalert2";

const ModalUseTemplate = ({closeModal, handleUseTemplate}) => {
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
            /*title: "Supprimer",*/
            icon: "warning",
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
            <p class="alert text-sm pb-2">Les transactions existantes seront remplacées par celle du template</p>
				<style>
				    .alert {
				        color: red;
				    }
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
                          padding-bottom: 8px;
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
                    .small-confirm-button:hover {
                          background-color: #3b90cd;
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
            confirmButtonText: "Utiliser",
            cancelButtonText: "Annuler",
            didOpen: () => {
                const backdrop = document.querySelector(".swal2-backdrop-show");
                if (backdrop) {
                    backdrop.style.backdropFilter = "blur(5px)";
                    backdrop.style.backgroundColor = "rgba(4,19,35,0.7)";
                }
                const validationMessage = document.querySelector(".swal2-validation-message");
                if (validationMessage) {
                    validationMessage.style.color = "#D6544A";
                    validationMessage.style.backgroundColor = "#111827";
                    validationMessage.style.margin = "0px";
                    validationMessage.style.marginBottom = "5px";
                }
            },

        }).then((result) => {
            if (result.isConfirmed) {
                handleUseTemplate()
                ToastNotification.fire({
                    icon: "success",
                    title: `Catégorie synchroniée.`,
                });
            }
            closeModal();
        });
    }, [closeModal, handleUseTemplate]);

    return (
        <>

        </>
    );
};

export default ModalUseTemplate;