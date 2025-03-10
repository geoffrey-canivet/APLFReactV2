import { create } from "zustand";
import axios from "axios";

const useLogHistoryStore = create((set, get) => ({
    log: [],
    loading: false,
    error: null,

    // Ajouter Log
    addLogHistory: async (log) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            console.log("Token récupéré depuis localStorage :", token);

            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const logData = {
                name: log.name,
                date: log.date,
                type: log.type,
                time: log.time,
            };

            const response = await axios.post("http://localhost:3000/logHistory/addLogHistory", logData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set((state) => ({ log: [...state.log, response.data] }));

        } catch (error) {
            console.error("Erreur lors de l'ajout du log :", error);
            set({ error: error.response?.data || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Retrouver tout l'historique
    getAllLogHistory: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get("http://localhost:3000/logHistory/getLogHistory", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Réponse de l'API :", response.data); // Vérifie la réponse de l'API

            set({ log: response.data });
        } catch (error) {
            console.error("Erreur lors de la récupération des logs :", error);
            if (error.response) {
                set({ error: error.response.data || "Une erreur est survenue." });
            } else {
                set({ error: "Impossible de se connecter au serveur." });
            }
        } finally {
            set({ loading: false });
        }
    },

    // Retrouver un log par type
    findLogHistoryByType: async (type) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get(`http://localhost:3000/logHistory/type/${type}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ log: response.data });
        } catch (error) {
            console.error("Erreur lors de la recherche des logs par type :", error);
            set({ error: error.response?.data || error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useLogHistoryStore;
