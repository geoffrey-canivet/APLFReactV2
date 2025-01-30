import useUserStore from "../store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import NavigationContainer from "../components/Navigation/NavigationContainer.jsx";
import TitrePeriod from "../components/BarTitle/TitrePeriod.jsx";
import TitreOutils from "../components/BarTitle/TitreOutils.jsx";
import {Card} from "@mui/material";

import CardFixe from "../components/Cards/CardFixe.jsx";
import AccordionsCards from "../components/Accordions/AccordionsCards.jsx";
import AccordionsTools from "../components/Accordions/AccordionsTools.jsx";
import SliderSwiper from "../components/Slider/SliderSwiper.jsx";

const Dashboard = () => {

    const navigate = useNavigate();

    const setUser = useUserStore((state) => state.setUser); // Met à jour l'utilisateur
    const user = useUserStore((state) => state.user); // Données utilisateur

    // VERIFIE SI TOKEN + RECUP DATA USER
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("http://localhost:3000/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data); // Maj user
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur :", error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate, setUser]);

    // DECONNEXION
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) {
        // loader pour attendre le chargement des données.
        return <div>Chargement des données utilisateur...</div>;
    }

    return (
        <>
            <div className="dark:bg-gray-900 min-h-screen">
                <NavigationContainer/>
                <div className="pt-16">
                    <SliderSwiper/>
                    <TitrePeriod/>
                    <AccordionsCards/>
                    <TitreOutils/>
                    <AccordionsTools/>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
