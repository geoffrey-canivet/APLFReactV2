import { create } from "zustand";
import axios from "axios";
import useLogHistoryStore from "./useLogHistoryStore.js";

const useTicketStore = create((set, get) => ({
    tickets: [],
    loading: false,
    error: null,

    // 📌 1️⃣ Récupérer les tickets d'un utilisateur
    fetchTicketsByUser: async (userId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get(`http://localhost:5000/api/tickets/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            set({ tickets: response.data });
            console.log("✅ Tickets récupérés :", response.data);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des tickets :", error);
            set({ error: error.message || "Impossible de récupérer les tickets." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 2️⃣ Uploader un ticket
    uploadTicket: async (file, userId, subTransactionId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const formData = new FormData();
            formData.append("ticket", file);
            formData.append("userId", userId);
            formData.append("subTransactionId", subTransactionId);

            const response = await axios.post("http://localhost:5000/api/tickets/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // Mettre à jour la liste des tickets
            set((state) => ({ tickets: [...state.tickets, response.data] }));

            console.log("✅ Ticket ajouté :", response.data);

            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Ajout de ticket",
                date: new Date().toISOString(),
                type: "CREATE",
                time: new Date().toLocaleTimeString(),
            });

        } catch (error) {
            console.error("❌ Erreur lors de l'ajout du ticket :", error);
            set({ error: error.message || "Impossible d'ajouter le ticket." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 3️⃣ Récupérer un ticket par ID
    fetchTicketById: async (ticketId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get(`http://localhost:5000/api/tickets/${ticketId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("✅ Ticket récupéré :", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ Erreur lors de la récupération du ticket :", error);
            set({ error: error.message || "Impossible de récupérer le ticket." });
        } finally {
            set({ loading: false });
        }
    },

    // 📌 4️⃣ Supprimer un ticket
    deleteTicket: async (ticketId) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Mettre à jour l'état en supprimant le ticket localement
            set((state) => ({
                tickets: state.tickets.filter((ticket) => ticket.id !== ticketId),
            }));

            console.log("✅ Ticket supprimé :", response.data);

            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Suppression de ticket",
                date: new Date().toISOString(),
                type: "DELETE",
                time: new Date().toLocaleTimeString(),
            });

        } catch (error) {
            console.error("❌ Erreur lors de la suppression du ticket :", error);
            set({ error: error.message || "Impossible de supprimer le ticket." });
        } finally {
            set({ loading: false });
        }
    }
}));

export default useTicketStore;
