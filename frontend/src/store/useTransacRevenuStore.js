
import { create } from "zustand";
import axios from "axios";
import usePeriodStore from "./usePeriodStore.js";
import useLogHistoryStore from "./useLogHistoryStore.js";

const useTransacRevenuStore = create((set) => ({
    categories: [],
    loading: false,
    error: null,

    // Récupérer les catégories
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
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    // Récupérer les catégories par periode
    fetchRevenuByPeriod: async (month, year) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.post(
                "http://localhost:3000/trans/getRevenuByPeriod",
                { month, year },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            set({ categories: response.data });
        } catch (error) {
            console.error("Erreur fetchFixeByPeriod :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    // Ajouter une transaction revenu
    addTransactionRevenu: async (categoryId, data) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const { month, year } = usePeriodStore.getState();

            const periodResponse = await axios.post("http://localhost:3000/period/findPeriod", {
                month,
                year
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const periodId = periodResponse.data.id;

            const transactionData = {
                categoryId,
                periodId,
                name: data.name,
                amount: data.amount,
            };

            const response = await axios.post("http://localhost:3000/add/transaction", transactionData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const refreshResponse = await axios.post(
                "http://localhost:3000/trans/getRevenuByPeriod",
                { month, year },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            set({ categories: refreshResponse.data });
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction Revenu",
                date: new Date().toISOString(),
                type: "CREATE",
                time: new Date().toLocaleTimeString(),
            });
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

            const { month, year } = usePeriodStore.getState();

            const refreshResponse = await axios.post(
                "http://localhost:3000/trans/getRevenuByPeriod",
                { month, year },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            set({ categories: refreshResponse.data });
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction revenu",
                date: new Date().toISOString(),
                type: "DELETE",
                time: new Date().toLocaleTimeString(),
            });
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

            // Récupérer le mois et l'année sélectionnés
            const { month, year } = usePeriodStore.getState();

            // Récupérer l'ID de la période
            const periodResponse = await axios.post(
                "http://localhost:3000/period/findPeriod",
                { month, year },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const periodId = periodResponse.data.id;

            // Envoyer categoryId et periodId au backend
            const response = await axios.post(
                "http://localhost:3000/add/delAllByCat",
                { categoryId, periodId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Recharger les transactions pour la période sélectionnée
            const refreshResponse = await axios.post(
                "http://localhost:3000/trans/getRevenuByPeriod",
                { month, year },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            set({ categories: refreshResponse.data });

            // AJOUTER LOG (optionnel)
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction revenu",
                date: new Date().toISOString(),
                type: "DELETE_BY_CATEGORY",
                time: new Date().toLocaleTimeString(),
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la suppression des transactions :", error);
            set({ error: error.message });
            throw error;
        } finally {
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

            // Récupérer le mois et l'année sélectionnés
            const { month, year } = usePeriodStore.getState();

            // Recharger les transactions en fonction du mois et de l'année sélectionnés
            const refreshResponse = await axios.post(
                "http://localhost:3000/trans/getRevenuByPeriod",
                { month, year },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            set({ categories: refreshResponse.data });
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction revenu",
                date: new Date().toISOString(),
                type: "UPDATE",
                time: new Date().toLocaleTimeString(),
            });
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
