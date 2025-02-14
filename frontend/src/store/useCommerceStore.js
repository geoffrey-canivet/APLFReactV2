
import { create } from 'zustand';
import axios from 'axios';

const useCommerceStore = create((set) => ({
    commerces: [],
    loading: false,
    error: null,

    // Récupérer tous les commerces
    fetchCommerces: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/commerce/commerces", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ commerces: response.data });
        } catch (error) {
            console.error("Erreur lors de la récupération des commerces :", error);
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Créer un commerce
    createCommerce: async (data) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:3000/commerce/commerce", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            set((state) => ({ commerces: [...state.commerces, response.data.commerce] }));
        } catch (error) {
            console.error("Erreur lors de la création du commerce :", error);
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Supprimer un commerce
    deleteCommerce: async (id) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            await axios.delete("http://localhost:3000/commerce/deleteCommerce", {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                data: { id },
            });
            set((state) => ({ commerces: state.commerces.filter((commerce) => commerce.id !== id) }));
        } catch (error) {
            console.error("Erreur lors de la suppression du commerce :", error);
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useCommerceStore;
