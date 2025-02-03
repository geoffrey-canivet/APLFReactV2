import { create } from "zustand";
import axios from "axios";

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

            console.log("📡 Réponse du backend :", response.data);

            const categoriesWithSubTransactions = response.data.map((cat) => ({
                ...cat,
                transactions: cat.transactions.map((t) => ({
                    ...t,
                    subTransactions: Array.isArray(t.subTransactions) ? t.subTransactions : [], // ✅ Évite les erreurs
                })),
            }));

            set({ categories: categoriesWithSubTransactions });
            console.log("✅ fetchOccas -> Catégories après formatage :", categoriesWithSubTransactions);
        } catch (error) {
            console.error("❌ Erreur fetchOccas :", error);
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

            // 📌 Rafraîchir les transactions après ajout
            await get().fetchOccas();
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

            console.log("✅ Transaction supprimée :", transactionId);

            // Mise à jour du state sans refetch
            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.filter((t) => t.id !== transactionId),
                })),
            }));

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
            console.log(data.message);

            // Optionnel : Mettre à jour l'état pour retirer la sous-transaction supprimée
            set((state) => ({
                subTransactions: state.subTransactions.filter(st => st.id !== subTransactionId)
            }));

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
            console.log("Transactions supprimée :", response.data);

            // Re-fetch
            const refreshResponse = await axios.get("http://localhost:3000/trans/getOccasionnelle", {
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

    // 📌 Récupérer les sous-transactions d'une transaction spécifique
    fetchSubTransactions: async (transactionId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.get(`http://localhost:3000/subTransaction/getSubTransactions/${transactionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(`✅ Sous-transactions pour Transaction ${transactionId} :`, response.data);

            return response.data || [];  // ✅ Toujours retourner un tableau

        } catch (error) {
            console.error("❌ Erreur fetchSubTransactions :", error);
            set({ error: error.message });
            return []; // ✅ Éviter les erreurs en front
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

            console.log("✅ Transaction mise à jour :", response.data);

            // Mise à jour du state sans refetch
            set((state) => ({
                categories: state.categories.map((cat) => ({
                    ...cat,
                    transactions: cat.transactions.map((t) =>
                        t.id === transactionId ? { ...t, name, amount } : t
                    ),
                })),
            }));

        } catch (error) {
            console.error("❌ Erreur updateTransaction :", error);
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

}));

export default useTransacOccasStore;
