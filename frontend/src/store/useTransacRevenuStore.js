// src/store/useTransacFixeStore.js
import { create } from "zustand";
import axios from "axios";

const useTransacRevenuStore = create((set) => ({
    categories: [],
    loading: false,
    error: null,

    // Récupérer les catégories de type "fixe"
    fetchRevenu: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get("http://localhost:3000/trans/getRevenu", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            set({ categories: response.data });
            console.log("fetchRevenu -> cat : ", response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    // Ajouter une transaction fixe
    addTransactionRevenu: async (categoryId, data) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const transactionData = {
                categoryId,
                periodId: 1,
                name: data.name,
                amount: data.amount,
            };

            const response = await axios.post("http://localhost:3000/add/transaction", transactionData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Transaction ajoutée :", response.data);

            const refreshResponse = await axios.get("http://localhost:3000/trans/getRevenu", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ categories: refreshResponse.data });

        } catch (error) {
            console.error("Erreur lors de l'ajout de la transaction :", error);
            set({ error: error.response?.data || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Supprimer une transaction
    deleteTransactionRevenu: async (transactionId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.post(
                "http://localhost:3000/add/delete",
                { transactionId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Transaction supprimée :", response.data);

            // Re-fetch
            const refreshResponse = await axios.get("http://localhost:3000/trans/getRevenu", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ categories: refreshResponse.data });

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la suppression de la transaction :", error);
            set({ error: error.message });
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    // Supprimer toutes les transactions d'une catégorie
    deleteAllTransactionsByCategory: async (categoryId) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.post(
                "http://localhost:3000/add/delAllByCat",
                { categoryId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Transactions supprimée :", response.data);

            // Re-fetch
            const refreshResponse = await axios.get("http://localhost:3000/trans/getRevenu", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ categories: refreshResponse.data });

            return response.data;

        }catch (error) {
            console.error("Erreur lors de la suppression des transactions :", error);
            set({ error: error.message });
            throw error;
        }finally {
            set({ loading: false });
        }
    },

    // UPDATE TRANSACTION (NOM + AMOUNT)
    updateTransaction: async (transactionId, name, amount) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.put(
                "http://localhost:3000/add/update",
                {
                    transactionId: transactionId,
                    name: name,
                    amount: amount
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Transactions maj :", response.data);

            // Re-fetch
            const refreshResponse = await axios.get("http://localhost:3000/trans/getRevenu", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ categories: refreshResponse.data });

            return response.data;

        }catch (error) {
            console.error("Erreur lors de la maj de la transaction :", error);
            set({ error: error.message });
            throw error;
        }finally {
            set({ loading: false });
        }

    }
}));

export default useTransacRevenuStore;
