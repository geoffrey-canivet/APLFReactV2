import { create } from "zustand";
import axios from "axios";
import useLogHistoryStore from "./useLogHistoryStore.js";
import useTransacFixeStore from "./useTransacFixeStore.js";
import usePeriodStore from "./usePeriodStore.js";
import useTransacRevenuStore from "./useTransacRevenuStore.js";
import useTransacOccasStore from "./useTransacOccasStore.js";


const useTemplateStore = create((set, get) => ({
    templates: [],
    defaultTemplates: [],
    loading: false,
    error: null,
    selectedTemplateType: "perso",

    fetchUserTemplates: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");
            const response = await axios.get("http://localhost:3000/template/getUserTemplates", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ templates: response.data });
        } catch (error) {
            set({ error: error.message || "Impossible de récupérer les templates." });
        }
    },
    // Ajouter un template
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
                templates: [...state.templates, response.data],
            }));

            await useLogHistoryStore.getState().addLogHistory({
                name: "Template",
                date: new Date().toISOString(),
                type: "CREATE",
                time: new Date().toLocaleTimeString(),
            });

        } catch (error) {
            console.error("Erreur addTemplate :", error);
            set({ error: error.message || "Impossible d'ajouter le template." });
        } finally {
            set({ loading: false });
        }
    },

    // Ajouter une transaction à un template
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

            const newTransaction = response.data.transaction;

            set((state) => ({
                templates: state.templates.map(template =>
                    template.categoryId === categoryId
                        ? {
                            ...template,
                            transactions: [...(template.transactions || []), newTransaction] // Vérification ici
                        }
                        : template
                )
            }));

        } catch (error) {
            console.error("Erreur addTransactionToTemplate :", error);
            set({ error: error.message || "Impossible d'ajouter la transaction au template." });
        } finally {
            set({ loading: false });
        }
    },

    // Supprimer un template
    deleteTemplate: async (templateId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            await axios.delete("http://localhost:3000/template/deleteTemplate", {
                data: { templateId },
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
            console.error("Erreur deleteTemplate :", error);
            set({ error: error.message || "Impossible de supprimer le template." });
        } finally {
            set({ loading: false });
        }
    },

    // Supprimer une transaction d'un template
    deleteTransactionFromTemplate: async (transactionId, templateId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            await axios.delete("http://localhost:3000/template/deleteTransactionFromTemplate", {
                data: { transactionId },
                headers: { Authorization: `Bearer ${token}` },
            });

            // 🔥 Met à jour immédiatement le store en supprimant la transaction
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

            // 🔥 Recharge complètement les templates pour garantir la cohérence des données
            await get().fetchUserTemplates();

        } catch (error) {
            console.error("Erreur deleteTransactionFromTemplate :", error);
            set({ error: error.message || "Impossible de supprimer la transaction du template." });
        } finally {
            set({ loading: false });
        }
    },

    // Modifier un template
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

            await useLogHistoryStore.getState().addLogHistory({
                name: "Template",
                date: new Date().toISOString(),
                type: "UPDATE",
                time: new Date().toLocaleTimeString(),
            });

        } catch (error) {
            console.error("Erreur updateTemplate :", error);
            set({ error: error.message || "Impossible de modifier le template." });
        } finally {
            set({ loading: false });
        }
    },

    // Récupérer un template par son ID
    fetchTemplateById: async (templateId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const response = await axios.get(
                `http://localhost:3000/template/getTemplateById/${templateId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;

        } catch (error) {
            console.error("Erreur fetchTemplateById :", error);
            set({ error: error.message || "Impossible de récupérer le template." });
            return null;
        } finally {
            set({ loading: false });
        }
    },

    // Utilier un template
    applyTemplateToCategory: async (categoryId) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant.");

            const { month, year } = usePeriodStore.getState();
            const { selectedTemplateType } = get();

            // Vérifier que le template n'est pas vide (pour les templates perso)
            if (selectedTemplateType === "perso") {
                const template = useTemplateStore.getState().templates.find(
                    (t) => t.categoryId === categoryId
                );
                if (!template || !template.transactions || template.transactions.length === 0) {
                    /*alert("Le template est vide");*/
                    return; // On arrête l'exécution si le template est vide
                }
            }

            const endpoint =
                selectedTemplateType === "perso"
                    ? "http://localhost:3000/template/useTemplate"
                    : "http://localhost:3000/template/useDefaultTemplate"; // 🔥 Endpoint spécifique pour les templates par défaut

            console.log(`📡 Envoi de la requête vers ${endpoint} avec categoryId :`, categoryId, " Mois :", month, " Année :", year);

            const response = await axios.post(
                endpoint,
                { categoryId, month, year },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("✅ Template appliqué avec succès :", response.data);

            await useTransacFixeStore.getState().fetchFixeByPeriod(month, year);
            await useTransacRevenuStore.getState().fetchRevenuByPeriod(month, year);
            await useTransacOccasStore.getState().fetchOccasByPeriod(month, year);

        } catch (error) {
            console.error("Erreur applyTemplateToCategory :", error);
            set({ error: error.message || "Impossible d'appliquer le template." });
        } finally {
            set({ loading: false });
        }
    },
    // 🔥 Récupérer les templates par défaut
    fetchDefaultTemplates: async () => {
        try {
            const response = await axios.get("http://localhost:3000/template/default");
            set({ defaultTemplates: response.data });
        } catch (error) {
            set({ error: error.message || "Impossible de récupérer les templates par défaut." });
        }
    },
    // 🔥 Changer le type de template sélectionné et recharger
    setSelectedTemplateType: async (type) => {
        set({ selectedTemplateType: type });
        await get().loadTemplates();
    },
    // 🔥 Charger les templates en fonction du type sélectionné
    loadTemplates: async () => {
        set({ loading: true, error: null });
        try {
            if (get().selectedTemplateType === "perso") {
                await get().fetchUserTemplates();
            } else {
                await get().fetchDefaultTemplates();
            }
        } catch (error) {
            set({ error: error.message || "Impossible de charger les templates." });
        } finally {
            set({ loading: false });
        }
    },

}));

export default useTemplateStore;
