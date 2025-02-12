import { create } from "zustand";
import axios from "axios";
import usePeriodStore from "./usePeriodStore.js";
import useLogHistoryStore from "./useLogHistoryStore.js";
const useTransacFixeStore = create((set, get) => ({
    categories: [],
    loading: false,
    error: null,

    // Récupérer les catégories de type "fixe"
    fetchFixe: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get("http://localhost:3000/trans/getFixe", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            set({ categories: response.data });
            console.log("fetchFixe -> cat : ", response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    fetchFixeByPeriod: async (month, year) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

           /* console.log(`🔍 Fetching transactions for Month: ${month}, Year: ${year}`);*/

            const response = await axios.post(
                "http://localhost:3000/trans/getFixeByPeriod",
                { month, year },  // 📌 Envoi du mois et de l'année dans le body
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Ajoute le token dans les headers
                        "Content-Type": "application/json",
                    },
                }
            );

            set({ categories: response.data });
            /*console.log(`✅ Transactions récupérées pour ${month}/${year}:`, response.data);*/
        } catch (error) {
            console.error("❌ Erreur fetchFixeByPeriod :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    // Ajouter une transaction fixe
    addTransactionFixe: async (categoryId, data) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            // ✅ Récupérer le mois et l'année depuis le store `usePeriodStore`
            const { month, year } = usePeriodStore.getState();

            console.log(`🟢 Ajout d'une transaction pour ${month}/${year}`);

            // 🔹 Trouver le periodId correspondant dans ta base de données
            const periodResponse = await axios.post("http://localhost:3000/period/findPeriod", {
                month,
                year
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const periodId = periodResponse.data.id; // Récupération du periodId

            console.log(`📅 Période trouvée: ${periodId}`);

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
                "http://localhost:3000/trans/getFixeByPeriod",
                { month, year },  // 📌 Envoi du mois et de l'année dans le body
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Ajoute le token dans les headers
                        "Content-Type": "application/json",
                    },
                }
            );

            set({ categories: refreshResponse.data });

            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction fixe",
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
    deleteTransaction: async (transactionId) => {
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
            // Récupère la période actuelle depuis usePeriodStore
            const { month, year } = usePeriodStore.getState();

            const refreshResponse = await axios.post(
                "http://localhost:3000/trans/getFixeByPeriod",
                { month, year },  // 📌 Utilisation de la période enregistrée dans le store
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Ajoute le token dans les headers
                        "Content-Type": "application/json",
                    },
                }
            );

            set({ categories: refreshResponse.data });
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction fixe",
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

            const response = await axios.post(
                "http://localhost:3000/add/delAllByCat",
                { categoryId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Transactions supprimée :", response.data);

            // Re-fetch
            const refreshResponse = await axios.get("http://localhost:3000/trans/getFixe", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ categories: refreshResponse.data });
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction fixe",
                date: new Date().toISOString(),
                type: "DELETE_BY_CATEGORY",
                time: new Date().toLocaleTimeString(),
            });
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
            console.log(transactionId, name, amount);
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
            const refreshResponse = await axios.get("http://localhost:3000/trans/getFixe", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ categories: refreshResponse.data });
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction fixe",
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

export default useTransacFixeStore;
