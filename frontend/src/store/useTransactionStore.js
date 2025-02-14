import { create } from "zustand";
import axios from "axios";
import useLogHistoryStore from "./useLogHistoryStore.js";

const useTransactionStore = create((set) => ({
    loading: false,
    error: null,

    // Supprimer toutes les transactions et sous-transactions
    deleteAllTransactions: async () => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            console.log("Suppression de toutes les transactions...");

            await axios.delete("http://localhost:3000/add/deleteAllTransactions", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Toutes les transactions supprimées avec succès.");
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "General",
                date: new Date().toISOString(),
                type: "DELETE_ALL",
                time: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error("Erreur lors de la suppression des transactions :", error);
            set({ error: error.response?.data || error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useTransactionStore;
