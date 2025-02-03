import { create } from 'zustand';
import axios from "axios";

const useUserStore = create((set) => ({
    user: null,
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

            set({ user: response.data }); // Assurez-vous que votre backend renvoie `{ user: { ... } }`
            console.log("Utilisateur récupéré :", response.data);

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

            set({ user: response.data.user }); // ✅ Met à jour l'utilisateur dans Zustand
            console.log("Utilisateur mis à jour :", response.data);
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error.response?.data || error.message);
        }
    }
}));

export default useUserStore;
