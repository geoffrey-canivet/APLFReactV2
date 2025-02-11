import { create } from "zustand";
import axios from "axios";
import useLogHistoryStore from "./useLogHistoryStore.js";
import useTransacFixeStore from "./useTransacFixeStore.js";
import usePeriodStore from "./usePeriodStore.js";


const useTemplateStore = create((set, get) => ({
    templates: [],
    loading: false,
    error: null,

    // 📌 Récupérer tous les templates de l'utilisateur
    fetchUserTemplates: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");
            console.log("🔍 Envoi de la requête GET pour récupérer les templates...");
            const response = await axios.get("http://localhost:3000/template/getUserTemplates", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("✅ Réponse reçue :", response.data);
            set({ templates: response.data });
            console.log("📦 Templates chargés:", response.data);
        } catch (error) {
            console.error("❌ Erreur fetchUserTemplates :", error);
            set({ error: error.message || "Impossible de récupérer les templates." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Ajouter un template
    addTemplate: async (templateData) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.post(
                "http://localhost:3000/template/createTemplate",
                templateData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            set((state) => ({
                templates: [...state.templates, response.data], // Ajoute le nouveau template à la liste
            }));

            // ✅ Ajouter au log
            await useLogHistoryStore.getState().addLogHistory({
                name: "Template",
                date: new Date().toISOString(),
                type: "CREATE",
                time: new Date().toLocaleTimeString(),
            });

        } catch (error) {
            console.error("❌ Erreur addTemplate :", error);
            set({ error: error.message || "Impossible d'ajouter le template." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Ajouter une transaction à un template
    addTransactionToTemplate: async (categoryId, transactionData) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.post(
                "http://localhost:3000/template/addTransactionToTemplate",
                { categoryId, ...transactionData },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // 🔥 Vérifier si un template existe déjà dans le store
            const existingTemplate = get().templates.find(t => t.categoryId === categoryId);

            set((state) => ({
                templates: existingTemplate
                    ? // Si un template existe, on ajoute juste la transaction dedans
                    state.templates.map(template =>
                        template.categoryId === categoryId
                            ? { ...template, transactions: [...template.transactions, response.data.transaction] }
                            : template
                    )
                    : // Sinon, on crée un nouveau template avec la transaction
                    [...state.templates, { categoryId, transactions: [response.data.transaction] }]
            }));

        } catch (error) {
            console.error("❌ Erreur addTransactionToTemplate :", error);
            set({ error: error.message || "Impossible d'ajouter la transaction au template." });
        } finally {
            set({ loading: false });
        }
    },


    // 📌 Supprimer un template
    deleteTemplate: async (templateId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            await axios.delete("http://localhost:3000/template/deleteTemplate", {
                data: { templateId }, // Envoyer l'ID dans le body
                headers: { Authorization: `Bearer ${token}` },
            });

            set((state) => ({
                templates: state.templates.filter((t) => t.id !== templateId),
            }));

            // ✅ Ajouter au log
            await useLogHistoryStore.getState().addLogHistory({
                name: "Template",
                date: new Date().toISOString(),
                type: "DELETE",
                time: new Date().toLocaleTimeString(),
            });

        } catch (error) {
            console.error("❌ Erreur deleteTemplate :", error);
            set({ error: error.message || "Impossible de supprimer le template." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Supprimer une transaction d'un template
    deleteTransactionFromTemplate: async (transactionId, templateId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            await axios.delete("http://localhost:3000/template/deleteTransactionFromTemplate", {
                data: { transactionId },
                headers: { Authorization: `Bearer ${token}` },
            });

            set((state) => ({
                templates: state.templates.map(template =>
                    template.id === templateId
                        ? {
                            ...template,
                            transactions: template.transactions.filter(t => t.id !== transactionId)
                        }
                        : template
                )
            }));

            // ✅ Ajouter au log
            await useLogHistoryStore.getState().addLogHistory({
                name: "Template Transaction",
                date: new Date().toISOString(),
                type: "DELETE_TRANSACTION",
                time: new Date().toLocaleTimeString(),
            });

        } catch (error) {
            console.error("❌ Erreur deleteTransactionFromTemplate :", error);
            set({ error: error.message || "Impossible de supprimer la transaction du template." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Modifier un template
    updateTemplate: async (templateId, updateData) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.put(
                "http://localhost:3000/template/updateTemplate",
                { templateId, ...updateData },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            set((state) => ({
                templates: state.templates.map((t) =>
                    t.id === templateId ? { ...t, ...updateData } : t
                ),
            }));

            // ✅ Ajouter au log
            await useLogHistoryStore.getState().addLogHistory({
                name: "Template",
                date: new Date().toISOString(),
                type: "UPDATE",
                time: new Date().toLocaleTimeString(),
            });

        } catch (error) {
            console.error("❌ Erreur updateTemplate :", error);
            set({ error: error.message || "Impossible de modifier le template." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 Récupérer un template par son ID
    fetchTemplateById: async (templateId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.get(
                `http://localhost:3000/template/getTemplateById/${templateId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data; // Retourne les données pour utilisation

        } catch (error) {
            console.error("❌ Erreur fetchTemplateById :", error);
            set({ error: error.message || "Impossible de récupérer le template." });
            return null;
        } finally {
            set({ loading: false });
        }
    },


    applyTemplateToCategory: async (categoryId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const { month, year } = usePeriodStore.getState(); // 🔥 Récupération du mois et de l'année

            console.log("📡 Envoi de la requête avec categoryId :", categoryId, " Mois :", month, " Année :", year);

            const response = await axios.post(
                "http://localhost:3000/template/useTemplate",
                { categoryId, month, year }, // 🔥 Ajout du mois et de l'année
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("✅ Template appliqué avec succès :", response.data);

            // ✅ Mettre à jour l'affichage après l'application du template
            await useTransacFixeStore.getState().fetchFixeByPeriod(month, year);

        } catch (error) {
            console.error("❌ Erreur applyTemplateToCategory :", error);
            set({ error: error.message || "Impossible d'appliquer le template." });
        } finally {
            set({ loading: false });
        }
    }









}));

export default useTemplateStore;
