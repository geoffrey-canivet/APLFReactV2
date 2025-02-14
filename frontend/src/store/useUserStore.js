import { create } from 'zustand';
import axios from "axios";
import useLogHistoryStore from "./useLogHistoryStore.js";

const useUserStore = create((set) => ({
    user: null,
    avatar_url: "",
    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),
    loading: false,
    error: null,

    fetchUser: async () => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.get("http://localhost:3000/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ user: response.data });

        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            set({ error: error.response?.data?.error || "Impossible de récupérer l'utilisateur." });
        } finally {
            set({ loading: false });
        }
    },

    updateUser: async ({ name, firstName, email }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.put("http://localhost:3000/auth/updateUser",
                { name, firstName, email },
                { headers: { Authorization: `Bearer ${token}` } });

            set({ user: response.data.user });

            // AJOUTER LOG
            await useLogHistoryStore.getState().addLogHistory({
                name: "Utilisateur",
                date: new Date().toISOString(),
                type: "UPDATE",
                time: new Date().toLocaleTimeString(),
            });
            console.log("Utilisateur mis à jour : ", response.data);
        } catch (error) {
            console.error("Erreur lors de la mise à jour : ", error.response?.data || error.message);
        }
    },

    uploadAvatar: async (file) => {
        set({ loading: true, error: null });
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token manquant. Connectez-vous pour continuer.");

            const response = await axios.post("http://localhost:3000/auth/upload-avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            set({ avatar_url: response.data.avatar_url });
        } catch (error) {
            console.error("Erreur lors de l'upload de l'avatar :", error);
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useUserStore;
