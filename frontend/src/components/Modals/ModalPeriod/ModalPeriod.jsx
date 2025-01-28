import {useEffect} from "react";
import MySwal from "sweetalert2";
import Swal from "sweetalert2";

const ModalPeriod = ({closeModal}) => {

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
            title: "Période",
            padding: 0,
            customClass: {
                popup: "custom-popup",
                title: "custom-header",
                htmlContainer: "custom-body",
                actions: "custom-footer",
            },
            html: `
                <div class="">
                CHOIX
</div>
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
            showConfirmButton: false,
            confirmButtonText: "Ajouter",
            cancelButtonText: "Fermer",
            didOpen: () => {
                const backdrop = document.querySelector(".swal2-backdrop-show");
                if (backdrop) {
                    backdrop.style.backdropFilter = "blur(5px)";
                    backdrop.style.backgroundColor = "rgba(4,19,35,0.7)"
                }
            },

        }).then(() => {

            closeModal();

        });
    }, [closeModal]);


    return (
        <>

        </>
    );
};

export default ModalPeriod;