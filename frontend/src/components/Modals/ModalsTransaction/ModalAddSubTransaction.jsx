import { useEffect } from "react";
import Swal from "sweetalert2";
import MySwal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import commerceOptions from "../../../utils/commerceOptions.js";

const ModalAddSubTransaction = ({ closeModal, handleAddSubTransaction }) => {


// Générer dynamiquement les options du select
    const selectOptionsHtml = commerceOptions
        .map(option => `<option value="${option.value}">${option.label}</option>`)
        .join("");


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
            title: "Ajouter",
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
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto mt-3">
            <!-- Date Input -->
            <div class="relative">
              <div class="absolute pr-3 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-5 h-5 text-gray-800 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                </svg>

              </div>
              <input type="text" id="inputDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:bg-gray-800 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date">
            </div>
            <!-- Commerce Select avec icône -->
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M5.535 7.677c.313-.98.687-2.023.926-2.677H17.46c.253.63.646 1.64.977 2.61.166.487.312.953.416 1.347.11.42.148.675.148.779 0 .18-.032.355-.09.515-.06.161-.144.3-.243.412-.1.111-.21.192-.324.245a.809.809 0 0 1-.686 0 1.004 1.004 0 0 1-.324-.245c-.1-.112-.183-.25-.242-.412a1.473 1.473 0 0 1-.091-.515 1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.401 1.401 0 0 1 13 9.736a1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.4 1.4 0 0 1 9 9.74v-.008a1 1 0 0 0-2 .003v.008a1.504 1.504 0 0 1-.18.712 1.22 1.22 0 0 1-.146.209l-.007.007a1.01 1.01 0 0 1-.325.248.82.82 0 0 1-.316.08.973.973 0 0 1-.563-.256 1.224 1.224 0 0 1-.102-.103A1.518 1.518 0 0 1 5 9.724v-.006a2.543 2.543 0 0 1 .029-.207c.024-.132.06-.296.11-.49.098-.385.237-.85.395-1.344ZM4 12.112a3.521 3.521 0 0 1-1-2.376c0-.349.098-.8.202-1.208.112-.441.264-.95.428-1.46.327-1.024.715-2.104.958-2.767A1.985 1.985 0 0 1 6.456 3h11.01c.803 0 1.539.481 1.844 1.243.258.641.67 1.697 1.019 2.72a22.3 22.3 0 0 1 .457 1.487c.114.433.214.903.214 1.286 0 .412-.072.821-.214 1.207A3.288 3.288 0 0 1 20 12.16V19a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-4H8v4a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-6.888ZM13 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" clip-rule="evenodd"/>
</svg>

              </div>
              <select id="inputCommerce" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                ${selectOptionsHtml}
              </select>
            </div>
            
          </div>
          <div class="grid grid-cols-1 max-w-md mx-auto mt-3">
          <!-- Prix Input -->
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 10h9.231M6 14h9.231M18 5.086A5.95 5.95 0 0 0 14.615 4c-3.738 0-6.769 3.582-6.769 8s3.031 8 6.769 8A5.94 5.94 0 0 0 18 18.916"/>
</svg>

              </div>
              <input type="text" id="inputPrix" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prix">
            </div>  
            <!--Commentaire-->
                        <div class="relative my-2">
                            <!-- Icône positionnée en haut à gauche -->
                            <div class="absolute top-2 left-3 flex items-center pointer-events-none">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#9CA3AF" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <!-- Champ textarea avec un padding supérieur et gauche ajusté -->
                            <textarea disabled id="inputCommentaire" rows="3" class="block pt-2 pl-12 p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Commentaire ..."></textarea>
                        </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto mt-3">
            <!--  piece jointe -->
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
</svg>

              </div>
              <input disabled type="text" id="inputPrix" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pièce jointe">
            </div> 
            <!--  photo -->
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clip-rule="evenodd"/>
</svg>


              </div>
              <input disabled type="text" id="inputPrix" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo">
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
            padding-left: 0;
            padding-right: 0;
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
            padding-left: 0;
            padding-right: 0;
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
            confirmButtonText: "Ajouter",
            cancelButtonText: "Annuler",
            didOpen: () => {
                // Initialisation de l'input date
                const inputDate = document.getElementById("inputDate");
                if (inputDate) {
                    // Récupérer la date du jour
                    const today = new Date();
                    // Formater la date au format "YYYY-MM-DD"
                    const yyyy = today.getFullYear();
                    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
                    const dd = String(today.getDate()).padStart(2, "0");
                    const formattedDate = `${dd}-${mm}-${yyyy}`;

                    // Affecter la date du jour à l'input
                    inputDate.value = formattedDate;

                    // Initialisation de flatpickr sur l'input avec le format souhaité
                    flatpickr(inputDate, {
                        dateFormat: "d/m/Y",
                    });
                }
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
            preConfirm: () => {
                const date = document.getElementById("inputDate").value;
                const amount = document.getElementById("inputPrix").value;
                const commerce = document.getElementById("inputCommerce").value;
                if (!date || !amount) {
                    Swal.showValidationMessage("Veuillez remplir tous les champs.");
                    return null;
                }
                return { date, amount, commerce };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleAddSubTransaction(result.value);
                ToastNotification.fire({
                    icon: "success",
                    title: `Transaction ajoutée avec succès.`,
                });
            }
            closeModal();
        });
    }, [closeModal, handleAddSubTransaction, ToastNotification]);

    return null;
};

export default ModalAddSubTransaction;
