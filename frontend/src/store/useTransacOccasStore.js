import { create } from "zustand";
import axios from "axios";
import usePeriodStore from "./usePeriodStore.js";
import useLogHistoryStore from "./useLogHistoryStore.js";

const useTransacOccasStore = create((set, get) => ({
    categories: [],
    loading: false,
    error: null,

    // 📌 Récupérer les catégories de type "Occasionnelle"
    fetchOccas: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get("http://localhost:3000/trans/getOccasionnelle", {
                headers: { Authorization: `Bearer ${token}` },
            });

            /*console.log("📡 Réponse du backend :", response.data);*/

            const categoriesWithSubTransactions = response.data.map((cat) => ({
                ...cat,
                transactions: cat.transactions.map((t) => ({
                    ...t,
                    subTransactions: Array.isArray(t.subTransactions) ? t.subTransactions : [], // ✅ Évite les erreurs
                })),
            }));

            set({ categories: categoriesWithSubTransactions });
            /*console.log("✅ fetchOccas -> Catégories après formatage :", categoriesWithSubTransactions);*/
        } catch (error) {
            console.error("❌ Erreur fetchOccas :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Récupérer les catégories de type "Occasionnelle"
    fetchOccasByPeriod: async (month, year) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            /*console.log(`🔍 Fetching occasionnelle transactions for Month: ${month}, Year: ${year}`);*/

            const response = await axios.post(
                "http://localhost:3000/trans/getOccasionnelleByPeriod",  // 📌 Envoi vers le bon endpoint
                { month, year }, // 📌 Envoi du mois et de l'année dans le body
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Ajoute le token dans les headers
                        "Content-Type": "application/json",
                    },
                }
            );

            /*console.log(`📡 Réponse du backend pour ${month}/${year}:`, response.data);*/

            // 🔹 Assurer que chaque transaction a un tableau `subTransactions`
            const categoriesWithSubTransactions = response.data.map((cat) => ({
                ...cat,
                transactions: cat.transactions.map((t) => ({
                    ...t,
                    subTransactions: Array.isArray(t.subTransactions) ? t.subTransactions : [], // ✅ Évite les erreurs
                })),
            }));

            set({ categories: categoriesWithSubTransactions });

            /*console.log(`✅ Transactions occasionnelles récupérées pour ${month}/${year}:`, categoriesWithSubTransactions);*/
        } catch (error) {
            console.error("❌ Erreur fetchOccasByPeriod :", error);
            set({ error: error.message || "Impossible de récupérer les catégories." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Ajouter une transaction Occasionnelle
    addTransactionOccas: async (categoryId, data) => {
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
                "http://localhost:3000/trans/getOccasionnelleByPeriod",
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

    // 📌 Ajouter une sous-transaction
    addSubTransaction: async (transactionId, subTransactionData) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");



            const response = await axios.post(
                "http://localhost:3000/subTransaction/addSubTransaction",
                {
                    transactionId,
                    amount: subTransactionData.amount,
                    date: subTransactionData.date,
                    commerce: subTransactionData.commerce,
                    comment: subTransactionData.myComment,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("✅ Sous-transaction ajoutée :", response.data);

            // 🔄 Mise à jour locale du state
            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.map((t) =>
                        t.id === transactionId
                            ? {
                                ...t,
                                subTransactions: [...(t.subTransactions || []), response.data] // ✅ Ajoute [] si undefined
                            }
                            : t
                    ),
                })),
            }));
            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Sub-transaction",
                date: new Date().toISOString(),
                type: "CREATE",
                time: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error("❌ Erreur addSubTransaction :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Supprimer une transaction
    deleteTransactionOccas: async (transactionId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            await axios.post("http://localhost:3000/add/delete", { transactionId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            /*console.log("✅ Transaction supprimée :", transactionId);*/

            // Mise à jour du state sans refetch
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
            console.error("❌ Erreur deleteTransactionOccas :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Fonction pour supprimer une sous-transaction par son ID
    deleteSubTransaction: async (subTransactionId) => {
        try {
            // Récupérez le token (par exemple stocké dans le localStorage)
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
            /*console.log(data.message);*/

            // Optionnel : Mettre à jour l'état pour retirer la sous-transaction supprimée
            set((state) => ({
                subTransactions: state.subTransactions.filter(st => st.id !== subTransactionId)
            }));
            // AJOUTER LOG
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
            /*console.log("Transactions supprimée :", response.data);*/

            // Re-fetch
            const refreshResponse = await axios.get("http://localhost:3000/trans/getOccasionnelle", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ categories: refreshResponse.data });

            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Transaction occasionnelle",
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

    // 📌 Récupérer les sous-transactions d'une transaction spécifique
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

            /*console.log(`✅ Sous-transaction trouvée ${subTransactionId} :`, response.data);*/

            return response.data || null;  // ✅ Retourne `null` si pas trouvé

        } catch (error) {
            console.error("❌ Erreur fetchSubTransactionById :", error);
            set({ error: error.message });
            return null; // ✅ Retourner null pour éviter les erreurs en front
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Mettre à jour une transaction
    updateTransaction: async (transactionId, name, amount) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.put(
                "http://localhost:3000/add/update",
                { transactionId, name, amount },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            /*console.log("✅ Transaction mise à jour :", response.data);*/

            // Mise à jour du state sans refetch
            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.map((t) =>
                        t.id === transactionId ? { ...t, name, amount } : t
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
            console.error("❌ Erreur updateTransaction :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Mettre à jour une sous-transaction
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

            /*console.log("✅ Sous-transaction mise à jour :", response.data);*/

            // Mise à jour du state sans refetch
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
            console.error("❌ Erreur updateSubTransaction :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },


}));

export default useTransacOccasStore;
