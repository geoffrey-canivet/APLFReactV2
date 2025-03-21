import { create } from "zustand";
import axios from "axios";
import usePeriodStore from "./usePeriodStore.js";
import useLogHistoryStore from "./useLogHistoryStore.js";

const useTransacOccasStore = create((set, get) => ({
    categories: [],
    subTransactions: [],
    loading: false,
    error: null,


    fetchOccas: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get("http://localhost:3000/trans/getOccasionnelle", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const categoriesWithSubTransactions = response.data.map((cat) => ({
                ...cat,
                transactions: cat.transactions.map((t) => ({
                    ...t,
                    subTransactions: Array.isArray(t.subTransactions) ? t.subTransactions : [],
                })),
            }));

            set({ categories: categoriesWithSubTransactions });
        } catch (error) {
            console.error("Erreur fetchOccas :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    fetchOccasByPeriod: async (month, year) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.post(
                "http://localhost:3000/trans/getOccasionnelleByPeriod",
                { month, year },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const categoriesWithSubTransactions = response.data.map((cat) => ({
                ...cat,
                transactions: cat.transactions.map((t) => ({
                    ...t,
                    subTransactions: Array.isArray(t.subTransactions) ? t.subTransactions : [],
                })),
            }));

            set({ categories: categoriesWithSubTransactions });

        } catch (error) {
            console.error("Erreur fetchOccasByPeriod :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    addTransactionOccas: async (categoryId, data) => {
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
                "http://localhost:3000/trans/getOccasionnelleByPeriod",
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
                name: "Transaction occasionnelle",
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

    addSubTransaction: async (transactionId, subTransactionData) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const formData = new FormData();
            formData.append("transactionId", transactionId);
            formData.append("amount", subTransactionData.amount);
            formData.append("date", subTransactionData.date);
            formData.append("commerce", subTransactionData.commerce);
            formData.append("comment", subTransactionData.myComment);
            if (subTransactionData.ticketFile) {
                formData.append("ticket", subTransactionData.ticketFile);
            }

            const response = await axios.post(
                "http://localhost:3000/subTransaction/addSubTransaction",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.map((t) =>
                        t.id === transactionId
                            ? { ...t, subTransactions: [...(t.subTransactions || []), response.data] }
                            : t
                    ),
                })),
            }));
            // LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Sub-transaction",
                date: new Date().toISOString(),
                type: "CREATE",
                time: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error("Erreur addSubTransaction :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteTransactionOccas: async (transactionId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            await axios.post("http://localhost:3000/add/delete", { transactionId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.filter((t) => t.id !== transactionId),
                })),
            }));
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction occasionnelle",
                date: new Date().toISOString(),
                type: "DELETE",
                time: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error("Erreur deleteTransactionOccas :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteSubTransaction: async (subTransactionId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch("http://localhost:3000/subtransaction/deleteSubTransaction", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ subTransactionId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erreur lors de la suppression.");
            }

            const data = await response.json();

            set((state) => {
                const newCategories = state.categories.map(category => ({
                    ...category,
                    transactions: category.transactions.map(transaction => ({
                        ...transaction,
                        subTransactions: transaction.subTransactions
                            ? transaction.subTransactions.filter(st => st.id !== subTransactionId)
                            : []
                    }))
                }));

                return { categories: newCategories };
            });

            await get().fetchOccasByPeriod(usePeriodStore.getState().month, usePeriodStore.getState().year);
            // LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Sub-transaction",
                date: new Date().toISOString(),
                type: "DELETE",
                time: new Date().toLocaleTimeString(),
            });

            return data;
        } catch (error) {
            console.error("Erreur dans deleteSubTransaction:", error);
            throw error;
        }
    },

    deleteAllTransactionsByCategory: async (categoryId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            // Récupérer le mois et l'année sélectionnés depuis le store
            const { month, year } = usePeriodStore.getState();

            // Obtenir l'ID de la période en fonction du mois et de l'année
            const periodResponse = await axios.post(
                "http://localhost:3000/period/findPeriod",
                { month, year },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const periodId = periodResponse.data.id;

            // Envoyer categoryId et periodId à l'endpoint de suppression
            const response = await axios.post(
                "http://localhost:3000/add/delAllByCatOccas",
                { categoryId, periodId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Rafraîchir les données après suppression
            const refreshResponse = await axios.post(
                "http://localhost:3000/trans/getOccasionnelleByPeriod",
                { month, year },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            set({ categories: refreshResponse.data });

            // Ajouter une entrée dans l'historique des logs
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction fixe",
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


    fetchSubTransactionById: async (subTransactionId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.post(
                "http://localhost:3000/subTransaction/getSubTransactionById",
                { subTransactionId },  // ✅ Envoi de l'ID via le body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data || null;

        } catch (error) {
            console.error("Erreur fetchSubTransactionById :", error);
            set({ error: error.message });
            return null;
        } finally {
            set({ loading: false });
        }
    },

    updateTransaction: async (transactionId, name) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.put(
                "http://localhost:3000/add/updateName",
                { transactionId, name},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.map((t) =>
                        t.id === transactionId ? { ...t, name} : t
                    ),
                })),
            }));
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction occasionnelle",
                date: new Date().toISOString(),
                type: "UPDATE",
                time: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error("Erreur updateTransaction :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    updateTransactionAmount : async (transactionId, amount) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.put(
                "http://localhost:3000/add/updateAmount",
                { transactionId, amount},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.map((t) =>
                        t.id === transactionId ? { ...t, amount} : t
                    ),
                })),
            }));
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction occasionnelle",
                date: new Date().toISOString(),
                type: "UPDATE",
                time: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error("Erreur updateTransaction :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    updateSubTransaction: async (subTransactionId, amount, date, commerce) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.put(
                "http://localhost:3000/subTransaction/updateSubTransaction",
                { subTransactionId, amount, date, commerce},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.map((t) => ({
                        ...t,
                        subTransactions: t.subTransactions.map((subT) =>
                            subT.id === subTransactionId
                                ? { ...subT, amount, date, commerce}
                                : subT
                        ),
                    })),
                })),
            }));
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Sub-transaction",
                date: new Date().toISOString(),
                type: "UPDATE",
                time: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error("Erreur updateSubTransaction :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },


}));

export default useTransacOccasStore;
